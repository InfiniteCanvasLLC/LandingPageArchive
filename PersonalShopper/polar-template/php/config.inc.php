<?php

// Contact Form Setting
// ---------------------------------

$sendTo     = array( 'someone@domain.com' );
$emailTitle = 'Contact Message';

// Select the transport types
// Try 'smtp' if you have issue with 'sendmail'
$transportType = 'transport';    // 'smtp' or 'sendmail' or 'transport'

// Required information if you choose 'smtp' transport type.
// If you want to use Gmail SMTP server, please consider : 
// http://support.google.com/mail/bin/answer.py?hl=en&answer=13287
$smtpHost       = 'smtp.gmail.com';
$smtpPort       = 465;
$smtpEncryption = 'ssl';
$smtpUsername   = '';
$smtpPassword   = '';

// Subscribe - MailChimp Setting
// ---------------------------------

//API Key - see http://admin.mailchimp.com/account/api
$apikey = '4725df709f6b90b86c33f0c0eea83044-us8';

// A List Id to run examples against. use lists() to view all
// Also, login to MC account, go to List, then List Tools, and look for the List ID entry
$listId = '118c561d1a';

// Twitter Feed
// ---------------------------------

// You need to have a twitter App for your usage in order to obtain OAuth credentials, see https://dev.twitter.com/apps for help.

$consumer_key = 'IYogCkpKOkL79nFgNn3UhA';
$consumer_secret = '4NHVajIFueUiPJUlM8S0G6g4N8joa1fTCa7enYSws';
$user_token = '20432962-S2uPD6WsszYOGrS7OykRUrVGWBedN9DL4dlwxR7UZ';
$user_secret = 'EJ5FNDIAafKfDZ5IFJzU6hkYMsUtU93iezhJEkszU';
 
?>