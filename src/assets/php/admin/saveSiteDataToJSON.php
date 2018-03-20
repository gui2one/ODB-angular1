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
    $docRoot = $_SERVER["DOCUMENT_ROOT"];

    // $subFloder = "/test";
    // print_r("Save Gallery Data to JSON ___ PHP script\n");
    
    $jsonString = stripslashes($_POST["jsonString"]);
    print_r($jsonString."\n");
    $fp = fopen($docRoot.''.$SUB_FOLDER.'/assets/data/siteData.json', 'w');
    fwrite($fp, $jsonString);
    fclose($fp);    

?>