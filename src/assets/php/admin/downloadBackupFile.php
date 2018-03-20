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

    require_once "../variables.php";
    require_once "../Message.php";
    $docRoot = $_SERVER["DOCUMENT_ROOT"];

    

    $dataFilePath = $docRoot.''.$SUB_FOLDER.'/assets/data/backup.json';
    $data = $_GET["jsonString"];



    header("Content-Description: File Transfer");    
    header('Content-type: text/json');
    header('Content-disposition: attachment;filename='.basename($dataFilePath));
    echo $data;


?>