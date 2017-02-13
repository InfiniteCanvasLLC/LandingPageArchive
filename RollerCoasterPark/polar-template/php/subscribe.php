<?php
	
require_once 'inc/MCAPI.class.php';
require_once 'config.inc.php';

$subscribe_email = $_REQUEST['subscribe-email'];

$api = new MCAPI($apikey);
$retval = $api->listSubscribe( $listId, $subscribe_email );

if ($api->errorCode){
	$result['status'] = "failed";
	$result['message'] = "<strong>Failed (" . $api->errorCode . ")</strong> : " . $api->errorMessage;
} else {
    $result['status'] = "success";
    $result['message'] = "<strong>Success</strong> : please check your mail box for the confirmation email.";
}

die( json_encode($result) );

?>