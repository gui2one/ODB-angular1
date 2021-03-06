<?php

    ///////////////
    /// needed to get same behaviour locally and online
    ///////////////
    if (get_magic_quotes_gpc()) {
        $process = array(&$_GET, &$_POST, &$_COOKIE, &$_REQUEST);
        while (list($key, $val) = each($process)) {
            foreach ($val as $k => $v) {
                unset($process[$key][$k]);
                if (is_array($v)) {
                    $process[$key][stripslashes($k)] = $v;
                    $process[] = &$process[$key][stripslashes($k)];
                } else {
                    $process[$key][stripslashes($k)] = stripslashes($v);
                }
            }
        }
        unset($process);
    }
    ////////////////////
    /////
    ////////////////////
    require_once("../variables.php");
    require_once("../Message.php");
    $docRoot = $_SERVER["DOCUMENT_ROOT"];

    
    $jsonString = stripslashes($_POST["jsonString"]);
    $fileName = stripslashes($_POST["fileName"]);
    // print_r($jsonString."\n");
    $dataFilePath = $docRoot.''.$SUB_FOLDER.'/assets/data/'.$fileName.'';
    
    $fp = fopen( $dataFilePath, 'w');
    fwrite($fp, $jsonString);
    fclose($fp);    

    if(!file_exists($dataFilePath)){
        // die("no file was created");
        $msg = new Message("error","no file was created");
    }else{
         $msg = new Message("success",$fileName);
    }

    print_r(json_encode($msg));


?>