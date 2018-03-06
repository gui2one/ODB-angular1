<?php
    print_r($_POST);
    require_once("../variables.php");
// the message

    $msg = $_POST["message"];

    $headers = "From: webmaster@oeuf.fr" . "\r\n" ;
// $msg = "First line of text\nSecond line of text";

// // use wordwrap() if lines are longer than 70 characters
// $msg = wordwrap($msg,70);

// // send email
    mail("guillaume.rouault.fx@gmail.com","test mail",$msg, $headers);
?>