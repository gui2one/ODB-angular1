<?php
	require_once("../variables.php");

	ini_set('display_errors', 1);

	// echo nl2br($_SERVER["HTTP_HOST"]);

	$rootDir = $_SERVER["DOCUMENT_ROOT"].''.$SUB_FOLDER;
	$httpHost = $_SERVER["HTTP_HOST"];
	// echo nl2br("$rootDir\n");
	$imgDirPath = $rootDir."/assets/img/uploads";
	
	$isDir = is_dir($imgDirPath);
	// print_r("is dir -> ".$isDir."\n");
	if($isDir){
		
	$handle = opendir($imgDirPath);
	$thumbFiles = array();
	$imgFiles = array();
    /* This is the correct way to loop over the directory. */
    while (false !== ($entry = readdir($handle))) {
		if($entry != "." && $entry != ".."){
			$found = strpos($entry, "_thumbnail");
			if($found){

				array_push($imgFiles, $entry);
			}
		}
        
        // if (strpos($entry, '_thumbnail') !== false) {

	    		
	    // 	$pathInfo = pathInfo($entry);
	    // 	if( strtoupper($pathInfo["extension"]) == "JPG" || strtoupper($pathInfo["extension"]) == "JPEG" || strtoupper($pathInfo["extension"]) == "PNG" || strtoupper($pathInfo["extension"]) == "GIF" )
	    // 	{

	    //     	// echo nl2br("$entry\n");
		// 		$thumbFullPath = "http://".$httpHost."/images/gallery/".$entry;
		// 		// echo nl2br($thumbFullPath."\n");
	    //     	array_push($thumbFiles, $thumbFullPath);
	    //     	// echo nl2br(str_replace("_thumbnail", "",$entry)."\n");
	    //     	array_push($imgFiles, str_replace("_thumbnail", "",$thumbFullPath));
	    		
	    // 	}

		// }	
    }

		print_r(json_encode($imgFiles));		
	}else{
		print_r("this is Not a dir");
		
	}




?>