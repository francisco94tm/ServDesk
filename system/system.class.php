<?php
class System { 
    protected $values = []; 
    /**
        * Load data from database
        * @return  JSON object to inject into the view.
        */

    public function getTableData($obj){

        $table = $obj['table'];

        // Create connection
        include_once('connection/connection.php');
        $db = new Connection();
        
        // Select from table
        $values['query'] = "SELECT * from $table";
        $values['info'] = $db->select($values['query']);
        $values['error'][] = $db->error();

        // Obtain name for just-id values
        $this->fixIndexes($table, $values['info']);
        return json_encode($values);
    } 

    private function fixIndexes($table, &$data){ 
        switch($table){
        case 'request':
            foreach($data as &$row){
                $this->swap($row['id_agentThreat'], 'agentThreat', 'name');
                $this->swap($row['id_caseType'], 'caseType', '*');
                $this->swap($row['id_client'], 'client', '*');
                $this->swap($row['id_realAgentThreat'], 'agentThreat', 'name');
                $this->swap($row['id_registerMedium'], 'registerMedium', 'name');
                $this->swap($row['id_status'], 'status', 'name');
                $this->swap($row['author'], 'agent', '*');
                $this->swap($row['responsable'], 'agent', '*');
                $this->swap($row['infrastructure'], 'assetRepository', '*');
            }
            break;
        case 'agent':
            foreach($data as &$row){
                $this->swap($row['id_level'], 'Level', 'name');
            }
        }
    } 

    private function swap(&$id, $table, $col){			
        include_once('connection/connection.php');
        $db = new Connection();
        if(!is_numeric($id)){
            $row = $db->select("SELECT $col FROM $table where id = '$id'");
        }
        else{
            $row = $db->select("SELECT $col FROM $table where id = $id");
        }
        $i = $id; 
        $id = [];

        if($col == "*" && count($row) > 0){
            $id = $row[0];
        }
        else {								
            $id['id'] = $i;
            if(count($row) > 0)
                $id['value'] = $row[0][$col];
        }
    }
    
    public function saveCase($obj){
        // Create connection
        include_once('connection/connection.php' );
        $db = new Connection(); 
        
        $agentThreat = $obj['agentThreat'];
        $asset = $obj['asset'];
        $author = $obj['author'];
        $caseType = $obj['caseType'];
        $description = $obj['description'];
        $registerMedium = $obj['registerMedium'];			 
        $responsable = $obj['responsable']; 
        $client = $obj['client'];
        $subject = $obj['subject'];

        $values['query'] = "INSERT INTO request (
            id_caseType, infrastructure, description,
            subject, author, responsable,
            id_status, id_client, id_agentThreat, id_registerMedium
        )
            VALUES (
                $caseType, '$asset', '$description', 
                '$subject', $author, $responsable,
                1, $client, $agentThreat,  $registerMedium
            )";
        $values['info'] = $db->query($values['query']);			
        $values['id']   = $db->getLastID(); 
        $values['error'][] = $db->error(); 
        return json_encode($values);
    }

    public function saveClient($obj){
        // Create connection
        include_once('connection/connection.php' );
        $db = new Connection(); 
        
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
            name, firstLastname, secondLastname,
            id_job, id_area, id_department,
            id_businessUnit, admissionDate, mobilephone,
            phone, email, status
        )
            VALUES (
            '$name', '$firstLastname', '$secondLastname', 
            $job, $area, $department,
            $businessUnit, NOW(),  '$mobilephone',
            '$phone', '$email', 'A'
            )";
        $values['info'] = $db->query($values['query']);			
        $values['id']   = $db->getLastID(); 
        $values['error'][] = $db->error(); 
        return json_encode($values);
    }

    public function saveAgent($obj){
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
};
?>