<?php
session_start();
$_SESSION = array();

include("simple-php-captcha.php");
$_SESSION['captcha'] = simple_php_captcha();
print_r(json_encode($_SESSION['captcha']));
// print_r($_SESSION['captcha']['image_src']);
?>