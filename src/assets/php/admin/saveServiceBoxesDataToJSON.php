<?php
    require_once("../variables.php");
    require_once("../Message.php");
    $docRoot = $_SERVER["DOCUMENT_ROOT"];

    // $subFloder = "/test";
    // print_r("Save Gallery Data to JSON ___ PHP script\n");
    
    $jsonString = stripslashes($_POST["jsonString"]);
    // print_r($jsonString."\n");
    $dataFilePath = $docRoot.''.$SUB_FOLDER.'/assets/data/serviceBoxesData.json';
    
    $fp = fopen( $dataFilePath, 'w');
    fwrite($fp, $jsonString);
    fclose($fp);    

    if(!file_exists($dataFilePath)){
        // die("no file was created");
        $msg = new Message("error","no file was created");
    }else{
         $msg = new Message("success","ouah magnifique");
    }

    

   

    print_r(json_encode($msg));


?>