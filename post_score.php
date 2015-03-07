<?php
require './facebook/facebook.php';
require './facebook/vars.php';

$facebook = new Facebook(array(
  'appId'  => $APP_ID,
  'secret' => $APP_SECRET
));

// Get User ID
$user = $facebook->getUser();

if ($user && $_POST["score"]) {
  try {
    // Proceed knowing you have a logged in user who's authenticated.
    $access_token = $facebook->getAccessToken();
    $attachment =  array(
                'access_token' => $access_token,
                'score' => $_POST["score"]
            );

    try{
        $ret_val = $facebook->api($user . "/scores","POST",$attachment);

        if ($ret_val) {
          echo $ret_val;
        } else {
          echo "error! score was: " . $_POST["score"] . ", url was: " . "<?php echo $user; ?>/scores";
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