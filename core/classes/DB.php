<?php
    class DB{
        // initilize credentials 
        private $dsn = "mysql:host=localhost; dbname=live-video-php";
        private $dbuser = "root";
        private $dbpass = "";

        function connect(){
            $db = $this->db = new PDO($this->dsn,$this->dbuser,$this->dbpass);
            return $db;
        }
    }
