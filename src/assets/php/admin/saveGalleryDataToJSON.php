<?php
    require_once("../variables.php");
    $docRoot = $_SERVER["DOCUMENT_ROOT"];

    // $subFloder = "/test";
    // print_r("Save Gallery Data to JSON ___ PHP script\n");
    
    $jsonString = stripslashes($_POST["jsonString"]);
    // print_r($jsonString."\n");
    $fp = fopen($docRoot.''.$SUB_FOLDER.'/assets/data/galleryData.json', 'w');
    fwrite($fp, $jsonString);
    fclose($fp);    

?>