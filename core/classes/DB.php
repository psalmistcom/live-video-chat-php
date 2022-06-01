<?php
    class DB{
        private $dsn = "mysql:host=localhost; dbname=live-video-php";
        private $dbuser = "root";
        private $dbpass = "";

        function connect(){
            $db = $this->db = new PDO($this->dsn,$this->dbuser,$this->dbpass);
            return $db;
        }

        // initilize credentials 
       
    
        // public $db;
        // public function __construct(){
        //     try{
        //         $this->db = new PDO($this->dsn,$this->dbuser,$this->dbpass);
        //         // echo 'Connected';
        //     }catch (PDOException $e){
        //         echo 'Error : '.$e->getMessage();
        //     }
    
        //     return $this->db;
        // }
    }
