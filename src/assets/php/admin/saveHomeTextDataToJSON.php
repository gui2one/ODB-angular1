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

    // $subFloder = "/test";
    // print_r("Save Gallery Data to JSON ___ PHP script\n");
    
    $jsonString = stripslashes($_POST["jsonString"]);
    // $jsonString = $_POST["jsonString"];
    // print_r($jsonString."\n");
    
    $dataFilePath = $docRoot.''.$SUB_FOLDER.'/assets/data/homeTextData.json';
    
    $fp = fopen( $dataFilePath, 'w');
    fwrite($fp, $jsonString);
    // fwrite($fp, json_encode($jsonString, JSON_UNESCAPED_SLASHES));
    fclose($fp);    

    if(!file_exists($dataFilePath)){
        // die("no file was created");
        $msg = new Message("error","no file was created");
    }else{
         $msg = new Message("success","ouah magnifique");
    }

    

   

    print_r(json_encode($msg));


?>