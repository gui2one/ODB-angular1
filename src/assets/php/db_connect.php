<?php

	
	$db = mysql_connect("localhost","phpmyadmin","root") or
	die("Impossible de se connecter : " . mysql_error());
	mysql_select_db('angular_test');

	mysql_set_charset("utf8");



?>