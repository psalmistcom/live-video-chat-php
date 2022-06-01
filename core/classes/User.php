<?php
    require 'DB.php';

    class User extends DB{
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
    }