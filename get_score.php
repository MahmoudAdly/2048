<?php
require './facebook/facebook.php';
require './facebook/vars.php';

$facebook = new Facebook(array(
  'appId'  => $APP_ID,
  'secret' => $APP_SECRET
));

// Get User ID
$user = $facebook->getUser();

if ($user) {
  try {
    // Proceed knowing you have a logged in user who's authenticated.
    $access_token = $facebook->getAccessToken();
    $attachment =  array(
                'access_token' => $access_token
            );

    try{
        $arr = $facebook->api($user . "/scores","GET",$attachment);

        if ($arr) {
          echo $arr["data"][0]["score"];
        } else {
          echo "0";
        }
     }catch(Exception $e){
        //error_log($e->getMessage());
        echo $e->getMessage();
    }
  } catch (FacebookApiException $e) {
    $user = null;
  }
}

?>