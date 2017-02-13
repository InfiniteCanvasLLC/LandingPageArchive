<?php
	
require_once 'tweet/index.php';
require_once 'config.inc.php';

if(empty($_POST)) { die(); }
$ezTweet = new ezTweet(array(
	'consumer_key' => $consumer_key,
	'consumer_secret' => $consumer_secret,
	'user_token' => $user_token,
	'user_secret' => $user_secret
));
$ezTweet->fetch();

?>