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
            include_once('email.class.php' );
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
            $values['id'] = $db->getLastID(); 

            $values['error'] = $db->error();   
             // If no errors, send email to client
             if($values['error'] === ""){
                $mail = new Mail();
                $data = [
                    "token"=> "NEWAGENT",
                    "name" => $name,
                    "lastname" => $firstLastname,
                    "user" => $usr,
                    "pass" => $pass,
                    "id"   => $values['id']
                ];
                $values["emailmsg"] = $mail->send($email, $data);
            }              
                     

            $values['commit'] = $db->commit();     
            return json_encode($values);
        }


          /*****************************************************************************
         * Edit a case into the Database
         * @return  JSON object to inject into the view.
         */ 
        
        public function edit($obj){
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
            $level = $obj['id_level'];
            $id = $obj['id'];  
            
            $values['query'] = "UPDATE agent SET
                usr = '$usr',
                name = '$name',
                firstLastname = '$firstLastname', 
                secondLastname =  '$secondLastname', 
                mobilephone = '$mobilephone', 
                address = '$address',
                phone = '$phone', 
                email = '$email',
                id_level = '$level'
                WHERE id = $id";            
            $values['info'] = $db->query($values['query']);	  
            $values['error'] = $db->error();  
            $values['commit'] = $db->commit();    
            return json_encode($values);
        }

        public function delete($obj){
            include_once('connection/connection.php');
            $db = new Connection();
            $id = $obj['id'];
            $query = "DELETE FROM agent WHERE id = $id";
            $values['info'] = $db->query($query); 
            $values['error'] = $db->error(); 
            $values['commit'] = $db->commit();  
            return json_encode($values);
        }

        public function exists($obj){
            include_once('connection/connection.php' );
            $db = new Connection();         
            $query = $db->select("SELECT id from agent where usr = '".$obj['user']."'");
            return sizeof($query);
        }
    }
?>