<?php
    
    class User{
        public $db, $userID;

        public function __construct(){
            $db = new DB;
            $this->db = $db->connect();
            $this->userID = $this->ID();
        }
        public function ID(){
            if ($this->isLoggedIn()) {
               return $_SESSION['userID'];
            }
        }
        //check if the email exists
        public function emailExists($email){
            $sql = "SELECT * FROM users WHERE email = :email";
            $stmt = $this->db->prepare($sql);
            $stmt->bindParam(":email", $email, PDO::PARAM_STR);
            $stmt->execute();
            $users = $stmt->fetch(PDO::FETCH_OBJ);

            if (!empty($users)) {
               return $users;
            }else {
                return false;
            }
        }

        //function to hash the users password
        public function hash($password){
            return password_hash($password, PASSWORD_DEFAULT);
        }

        //function to redirect the user 
        public function redirect($location){
            header('Location: '.BASE_URL. $location);
        }

        //Grab user Data
        public function userData($userID =''){
            $userID = ((!empty($userID)) ? $userID : $this->userID);
            $sql = "SELECT * FROM users WHERE userID = :userID";
            $stmt = $this->db->prepare($sql);
            $stmt->bindParam(":userID", $userID, PDO::PARAM_STR);
            $stmt->execute();
            return $users = $stmt->fetch(PDO::FETCH_OBJ);
        }

        //Check if the user is logged in
        public function isLoggedIn(){
            return ((isset($_SESSION['userID'])) ? true : false);
        }

        //logout user 
        public function loggout(){
            $_SESSION = array();
            session_destroy();
            session_regenerate_id();
            $this->redirect('index.php');
        }
    }