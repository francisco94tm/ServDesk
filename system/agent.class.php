<?php if(!isset($_SESSION)) session_start();
    class Agent{
        protected $values = []; 

        /*****************************************************************************
         * Insert a agent into the Database
         * @return  JSON object to inject into the view.
         */ 

        public function save($obj){

            // Create connection
            include_once('connection/connection.php' );
            $db = new Connection(); 
            
            $name = $obj['name'];
            $firstLastname = $obj['firstLastname'];
            $secondLastname = $obj['secondLastname'];
            $mobilephone = $obj['mobilephone'];
            $phone = $obj['phone'];
            $email = $obj['email'];
            $address = $obj['address'];
            $usr = $obj['usr'];
            $pass = $obj['pass'];
            $level = $obj['level'];
                

            $values['query'] = "INSERT INTO agent (
                name, firstLastname, secondLastname,
                mobilephone, address,
                phone, email, usr, pass, id_level
            )
            VALUES (
            '$name', '$firstLastname', '$secondLastname', 
            '$mobilephone', '$address',
            '$phone', '$email', '$usr', '$pass', '$level' 
            )";
                
            $values['info'] = $db->query($values['query']);			
            $values['id']   = $db->getLastID(); 
            $values['error'][] = $db->error(); 
            return json_encode($values);
        }
    }
?>