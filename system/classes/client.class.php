<?php if(!isset($_SESSION)) session_start();
class Client {
    
    protected $values = []; 

    /*****************************************************************************
     * Insert a client into the Database
     * @return  JSON object to inject into the view.
     */ 

    public function save($obj){
        // Create connection
        include_once('connection/connection.php' );
        include_once('email.class.php' );
        $db = new Connection(); 
        
        $curp = $obj['curp'];
        $name = $obj['name'];
        $firstLastname = $obj['firstLastname'];
        $secondLastname = $obj['secondLastname'];
        $mobilephone = $obj['mobilephone'];
        $phone = $obj['phone'];
        $email = $obj['email'];
        $job = $obj['job'];
        $area = $obj['area'];
        $department = $obj['department'];
        $businessUnit = $obj['businessUnit'];

        $values['query'] = "INSERT INTO client (
            curp, name, firstLastname, secondLastname,
            id_job, id_area, id_department,
            id_businessUnit, admissionDate, mobilephone,
            phone, email, id_status
        )
            VALUES (
            '$curp', '$name', '$firstLastname', '$secondLastname', 
            $job, $area, $department,
            $businessUnit, NOW(),  '$mobilephone',
            '$phone', '$email', 1
            )";
        $values['info'] = $db->query($values['query']);   
        $values['id']   = $db->getLastID();      
        $values['error'] = $db->error(); 
        // If no errors, send email to client
        if($values['error'] === ""){
            $mail = new Mail();
            $data = [
                "token"=> "NEWCLIENT",
                "name" => $name,
                "lastname" => $firstLastname,
                "user" => $curp,
                "pass"   => $values['id']
            ];
            $values["emailmsg"] = $mail->send($email, $data);
        } 
        $values['commit'] = $db->commit();        
          
        return json_encode($values);
    }


    public function edit($obj){
        // Create connection
        include_once('connection/connection.php' );
        $db = new Connection(); 
        
        $id = $obj['id'];
        $curp = $obj['curp'];
        $name = $obj['name'];
        $firstLastname = $obj['firstLastname'];
        $secondLastname = $obj['secondLastname'];
        $mobilephone = $obj['mobilephone'];
        $phone = $obj['phone'];
        $email = $obj['email'];
        $job = $obj['id_job'];
        $area = $obj['id_area'];
        $department = $obj['id_department'];
        $businessUnit = $obj['id_businessUnit'];

        $values['query'] = "UPDATE client SET
            curp = '$curp', 
            name = '$name', 
            firstLastname = '$firstLastname', 
            secondLastname = '$secondLastname',
            id_job = $job, 
            id_area = $area, 
            id_department = $department,
            id_businessUnit = $businessUnit, 
            mobilephone = '$mobilephone',
            phone = '$phone', 
            email = '$email'
            WHERE id = $id";

        $values['info'] = $db->query($values['query']);		
        $db->commit();	
        $values['id']   = $db->getLastID(); 
        $values['error'] = $db->error(); 
        return json_encode($values);     
    }

    public function delete($obj){
        include_once('connection/connection.php');
        $db = new Connection();
        $id = $obj['id'];
        $query = "DELETE FROM client WHERE id = $id";
        $values['info'] = $db->query($query);	 
        $db->commit();
        $values['error'] = $db->error(); 
        return json_encode($values);
    }

    public function exists($obj){
        include_once('connection/connection.php' );
        $db = new Connection();         
        $query = $db->select("SELECT id from client where CURP = '".$obj['curp']."'");
        return sizeof($query);
    }
}
?>