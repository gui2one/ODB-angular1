<?php
    require_once("../variables.php");
    require_once("../Message.php");
    $docRoot = $_SERVER["DOCUMENT_ROOT"];

    

    $dataFilePath = $docRoot.''.$SUB_FOLDER.'/assets/data/backup.json';
    $data = $_GET["jsonString"];



    header("Content-Description: File Transfer");    
    header('Content-type: text/json');
    header('Content-disposition: attachment;filename='.basename($dataFilePath));
    echo $data;


?>