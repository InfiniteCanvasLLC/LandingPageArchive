<?php

require_once 'inc/swift/swift_required.php';
require_once 'config.inc.php';

// Using Swiftmailer to send email.
// Documentation : http://swiftmailer.org/docs/

// Honey Pot
if( $_REQUEST['email'] != '' ) {
	$result['status'] = "failed";
	$result['message'] = "<strong>Failed</strong> : Honey Pot!";
	die( json_encode($result) );
}

$contactName = $_REQUEST['name'];
$contactEmail = $_REQUEST['email-r'];
$contactMessage = $_REQUEST['contact-message'];


$additionalFields = isset( $_REQUEST['add'] ) ? $_REQUEST['add'] : false;

// Message
$message = Swift_Message::newInstance();
$message->setSubject( $emailTitle );

$message->setFrom( $contactEmail );
$message->setReplyTo( $contactEmail );
$message->setTo( $sendTo );

$body = '<strong>Name</strong> : ' . $contactName . '<br />';
$body .= '<strong>Email</strong> : ' . $contactEmail . '<br />';

if( $additionalFields ) {
	foreach( $additionalFields as $name => $value ) {
		$body .= '<strong>' . $name . '</strong> : ' . $value . '<br />';
	}
}

$body .= '<br />';
$body .= '<strong>Message</strong> : ' . $contactMessage . '<br />';


$message->setBody($body, 'text/html');

// Transport
switch( $transportType ) {
	case 'smtp' :
		$transport = Swift_SmtpTransport::newInstance()
		->setHost( $smtpHost )
		->setPort( $smtpPort )
		->setEncryption( $smtpEncryption )
		->setUsername( $smtpUsername )
		->setPassword( $smtpPassword )
		;

	break;
	case 'sendmail' :
		$transport = Swift_SendmailTransport::newInstance('/usr/sbin/exim -bs');
	break;
	case 'transport' :
		$transport = Swift_MailTransport::newInstance();
	break;
}

// Mailer
$mailer = Swift_Mailer::newInstance($transport);

try {
	if ($mailer->send($message, $failures))
	{
		$result['status'] = "success";
		$result['message'] = "<strong>Success</strong> : the message has been sent!";
	} else {
		$result['status'] = "failed";
		$result['message'] = "<strong>Failed</strong> : unknown issue occur.";
	}
} catch (Exception $e) {
	$result['status'] = "failed";
	$result['message'] = "<strong>Failed</strong> : " . $e->getMessage();
}

die( json_encode($result) );
?>