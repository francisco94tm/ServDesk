<?php if(!isset($_SESSION)) session_start();
class RegisterMedium {
        
    /*****************************************************************************
     * Insert a register Medium into the Database
     * @return  JSON object to inject into the view.
     */ 

    public function save($obj){
        // Create connection
        include_once('connection/connection.php' );
        $db = new Connection();         
        $name = $obj['name']; 
        $values['query'] = "INSERT INTO registerMedium (name) VALUES ('$name')";
        $values['info'] = $db->query($values['query']);		
        
        
        $values['id']   = $db->getLastID(); 
        $values['error'] = $db->error(); 
        $values['commit'] = $db->commit();
        return json_encode($values);
    }

    public function edit($obj){
        // Create connection
        include_once('connection/connection.php' );
        $db = new Connection();         
        
        $id = $obj['id']; 
        $name = $obj['name']; 

        $values['query'] = "UPDATE registerMedium SET name = '$name' WHERE id = $id";
        $values['info'] = $db->query($values['query']);	
        
        $values['id'] = $db->getLastID();         
        $values['error'] = $db->error(); 
        $values['commit'] = $db->commit();		
        return json_encode($values);
    }

    public function delete($obj){
        include_once('connection/connection.php');
        $db = new Connection();
        $id = $obj['id'];
        $query = "DELETE FROM registerMedium WHERE id = $id";
        $values['info'] = $db->query($query);	  
        $values['error'] = $db->error(); 
        $values['commit'] = $db->commit();  
        return json_encode($values);
    }

}
?>