<?php
    print_r($_POST);
    require_once("../variables.php");
// the message

    $firstName = $_POST["firstName"];
    $lastName = $_POST["lastName"];
    $email = $_POST["email"];
    $company = $_POST["company"];


    $msg ="Nom : ".$lastName ."\n";
    $msg .="Prenom : ".$firstName ."\n";
    $msg .="Email : ".$email ."\n";
    $msg .="Entreprise : ".$company ."\n";
    $msg .= "Message : ".$_POST["message"];

    $headers = "From: webmaster@oeuf.fr" . "\r\n" ;
// $msg = "First line of text\nSecond line of text";

// // use wordwrap() if lines are longer than 70 characters
// $msg = wordwrap($msg,70);

// // send email
    mail("guillaume.rouault.fx@gmail.com","Message de www.oeuf.fr",$msg, $headers);
?>