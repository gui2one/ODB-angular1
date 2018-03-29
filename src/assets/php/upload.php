<?php
	define ('SCRIPT_ROOT', realpath(dirname(__FILE__)));
	require_once("variables.php");
    $rootDir = $_SERVER["DOCUMENT_ROOT"]."".$SUB_FOLDER;
   

	// if(isset($_SESSION['upload_progress_123'])){
  	// 	 print_r($_SESSION['upload_progress_123']);
	// }else{
	// 	print_r("not set \n");
	// }
	function validateName($str) {
		$str = preg_replace('/[^A-Za-z0-9.#\\-$]/', '_', $str);
		
		return $str;
	}

    $tmp = explode("\\",SCRIPT_ROOT);
    array_pop($tmp);
    $parentDirPath = implode("/",$tmp);
   
    $responseArray = array();


        foreach ($_FILES as $key => $value) {
            // print_r($key."\n");
			$file = $_FILES[$key];

			// print_r("is valid name --> \n");
			$fileName = validateName($file["name"]);


            $fileType = $file["type"];      
            $fileSize = $file["size"];      
            $fileError = $file["error"];      
            $fileTmpName = $file["tmp_name"];      
            
            $fullSrcPath = $rootDir."/assets/img/uploads/".$fileName;
            $info = pathinfo($fullSrcPath);
            

            
            $allowed = array("jpg","jpeg","gif","png");
            
            if( in_array(strtolower($info['extension']),$allowed)){


            
                $tmpArray = explode(".",$fileName);
                array_pop($tmpArray);
                $actualName = implode("",$tmpArray);

                $newName = $actualName."_".uniqid('',true).".".$info['extension'];


                $fileDestination = "../img/uploads/".$newName;
                $baseName = basename($fileDestination, ".".$info['extension']);
                $thumbDestination = $rootDir."/assets/img/uploads/".$baseName."_thumbnail.".$info['extension'];
                
                
                move_uploaded_file($fileTmpName, $fileDestination);
                $thumb = imagethumb($fileDestination, $thumbDestination,500);

                $fileinfo = getimagesize($fileDestination);
                $jsonResponse =  json_encode(array(
                    'success' => array(
                        'msg' => 'File uploaded',
                        'fileName'=> basename($fileDestination),
                        'fileSize'=> $fileSize,
                        'thumbName'=>baseName($thumbDestination),
                        'width' => $fileinfo[0],
                        'height' => $fileinfo[1]

                        
                    ),
                ));

				array_push($responseArray,$jsonResponse);
				


            }else{
                //trigger_error("this file type is not allowed",E_USER_ERROR);
                $jsonResponse = array(
                    'error' => array(
                        'msg' => 'this file type is not allowed ??!'
                        
                    ),
                );
                array_push(json_encode($responseArray,$jsonResponse));
                
            }            
        

        }
		// print_r($responseArray);
		print_r( json_encode( $responseArray ));
		
		// $key = ini_get("session.upload_progress.prefix") . $_POST[ini_get("session.upload_progress.name")];
		// print_r($_SESSION[$key]);

    //}

//////////
//// create thumbnail
////////
function imagethumb( $image_src , $image_dest = NULL , $max_size = 500, $expand = FALSE, $square = FALSE )
{
    
    if( !file_exists($image_src) ) return FALSE;
    
    
	// Récupère les infos de l'image
	$fileinfo = getimagesize($image_src);

	
	
	if( !$fileinfo ) return FALSE;

	$width     = $fileinfo[0];
	$height    = $fileinfo[1];


	$type_mime = $fileinfo['mime'];


	$type= str_replace('image/', '', $type_mime);

	//echo "\ntype_mime --> ".$type;

	if( !$expand && max($width, $height)<=$max_size && (!$square || ($square && $width==$height) ) )
	{
		// L'image est plus petite que max_size
		if($image_dest)
		{
			return copy($image_src, $image_dest);
		}
		else
		{
			header('Content-Type: '. $type_mime);
			return (boolean) readfile($image_src);
		}
	}

	// Calcule les nouvelles dimensions
	$ratio = $width / $height;

	if( $square )
	{
		$new_width = $new_height = $max_size;

		if( $ratio > 1 )
		{
			// Paysage
			$src_y = 0;
			$src_x = round( ($width - $height) / 2 );

			$src_w = $src_h = $height;
		}
		else
		{
			// Portrait
			$src_x = 0;
			$src_y = round( ($height - $width) / 2 );

			$src_w = $src_h = $width;
		}
	}
	else
	{
		$src_x = $src_y = 0;
		$src_w = $width;
		$src_h = $height;

		if ( $ratio > 1 )
		{
			// Paysage
			$new_width  = $max_size;
			$new_height = round( $max_size / $ratio );
		}
		else
		{
			// Portrait
			$new_height = $max_size;
			$new_width  = round( $max_size * $ratio );
		}
	}

	// Ouvre l'image originale
	$func = 'imagecreatefrom' . $type;
	if( !function_exists($func) ) return FALSE;

	$image_src = $func($image_src);
	$new_image = imagecreatetruecolor($new_width,$new_height);

	// Gestion de la transparence pour les png
	if( $type=='png' )
	{
		imagealphablending($new_image,false);
		if( function_exists('imagesavealpha') )
			imagesavealpha($new_image,true);
	}

	// Gestion de la transparence pour les gif
	elseif( $type=='gif' && imagecolortransparent($image_src)>=0 )
	{
		$transparent_index = imagecolortransparent($image_src);
		$transparent_color = imagecolorsforindex($image_src, $transparent_index);
		$transparent_index = imagecolorallocate($new_image, $transparent_color['red'], $transparent_color['green'], $transparent_color['blue']);
		imagefill($new_image, 0, 0, $transparent_index);
		imagecolortransparent($new_image, $transparent_index);
	}

	// Redimensionnement de l'image
	imagecopyresampled(
		$new_image, $image_src,
		0, 0, $src_x, $src_y,
		$new_width, $new_height, $src_w, $src_h
	);

	// Enregistrement de l'image
	$func = 'image'. $type;
	if($image_dest)
	{
		$func($new_image, $image_dest);
	}
	else
	{
		header('Content-Type: '. $type_mime);
        $func($new_image);
        
        
	}

	// Libération de la mémoire
	imagedestroy($new_image); 

	return TRUE;
}    

?>

