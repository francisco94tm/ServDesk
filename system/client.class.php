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
            phone, email, status
        )
            VALUES (
            '$curp', '$name', '$firstLastname', '$secondLastname', 
            $job, $area, $department,
            $businessUnit, NOW(),  '$mobilephone',
            '$phone', '$email', 1
            )";
        $values['info'] = $db->query($values['query']);			
        $values['id']   = $db->getLastID(); 
        $values['error'][] = $db->error(); 
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
        $values['id']   = $db->getLastID(); 
        $values['error'][] = $db->error(); 
        return json_encode($values);    
            // VALUES (
            // '$curp', '$name', '$firstLastname', '$secondLastname', 
            // $job, $area, $department,
            // $businessUnit, NOW(),  '$mobilephone',
            // '$phone', '$email', 1
            // )";
    
    }
}
?>