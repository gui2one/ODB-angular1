<?php
    require_once("../variables.php");
    $rootDir = $_SERVER['DOCUMENT_ROOT'].''.$SUB_FOLDER;
    $filePath = $rootDir."/assets/img/uploads/".basename($_POST["fileName"]);


    unlink($filePath);
    $info = pathinfo($filePath);

    $baseName = str_replace("_thumbnail","",$filePath);
    unlink($baseName);
    // print_r("\n\tbase name : ".$baseName);
?>