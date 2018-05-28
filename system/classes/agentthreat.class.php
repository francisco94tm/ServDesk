<?php
class AgentThreat{ 

     /*****************************************************************************
     * Insert a Agent Threat into the Database
     * @return  JSON object to inject into the view.
     */ 

    public function save($obj){
        // Create connection
        include_once('connection/connection.php' );
        $db = new Connection();         
        $name = $obj['name']; 
        $description = $obj['description']; 
        $threatType = $obj['threatType']; 
        $values['query'] = "INSERT INTO  agentThreat
            (name, description, id_threatType) 
        VALUES 
            ('$name', '$description', $threatType)";
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
        $description = $obj['description']; 
        $threatType = $obj['id_threatType']; 
        
        $values['query'] = "UPDATE agentThreat
            SET 
                name = '$name',
                description = '$description',
                id_threatType = $threatType
            WHERE 
                id = $id";

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
        $query = "DELETE FROM agentThreat WHERE id = $id";
        $values['info'] = $db->query($query);	         
        $values['error'] = $db->error(); 
        $values['commit'] = $db->commit();
        return json_encode($values);
    }

}
?>