<?php

include("db_connect.php");
// $db = mysql_connect("localhost","sprayLoc_beta","spray@1977") or
// die("Impossible de se connecter : " . mysql_error());
// mysql_select_db('sprayLoc_beta');

// mysql_set_charset("utf8");

if (mysql_errno()) {
    echo "Echec lors de la connexion à MySQL : (" .mysql_error();
}else{
	$arr = array();
	$query = mysql_query("SELECT * FROM table_1 " );

	if($query){

		// echo "\nOK load categories mysql ....";
		while($row = mysql_fetch_array($query)){

			array_push($arr, $row);
			//echo "\n".$row[1];
		}

		
	}else{

		echo "\n ERROR ---> \n".mysql_error();
	}

	print_r(json_encode($arr));
}

?>