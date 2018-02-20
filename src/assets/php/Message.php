<?php
    class Message{

        public $type = "error";
        public $message = "default message";

        public function __construct($_type = "error", $_message = "default message"){
            $this->type = $_type;
            $this->message = $_message;

        }

        public function getType(){
            return $this->type;
        }

        public function setType($_type){
            $this->type = $_type;
        }

        public function getMessage(){
            return $this->message;
        }
    }
?>