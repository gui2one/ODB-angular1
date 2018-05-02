<?php
    $user_typed = $_POST["typed_code"];
    session_start();

    if(strcmp($_SESSION["captcha"]["code"], $user_typed) == 0){

        print_r("good code");
    }else{
        print_r(($_SESSION["captcha"])." !!!!!!!!!!!!!!!!!!!");
    }

?>