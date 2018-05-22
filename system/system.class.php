<?php if(!isset($_SESSION)) session_start();

class System { 
    protected $values = []; 

    /*****************************************************************************
     * Load data from database
     * @return  JSON object to inject into the view.
     */ 
    public function getTableData($obj){

        $table = $obj['table'];

        // Create connection
        include_once('connection/connection.php');
        $db = new Connection();
        if(!isset($_SESSION['servDesk'])){
            $values['error'][] = "No existe el objecto de Session";
            return json_encode($values);
        }            
        $id = $_SESSION['servDesk']['id'];
        // Select from table
        if($table === "request"){
            if($_SESSION['servDesk']['id_level'] != 4)
                $values['query'] = "SELECT * from $table WHERE responsable = $id";
            else{
                $values['query'] = "SELECT * from $table WHERE id_client = $id"; 
            }
        }
        else 
            $values['query'] = "SELECT * from $table";
        $values['info'] = $db->select($values['query']);
        $values['error'][] = $db->error();

        // Obtain name for just-id values
        $this->fixIndexes($table, $values['info']);
        return json_encode($values);
    } 

    /*****************************************************************************
     * Change number keys to their text value
     * @return  JSON object to inject into the view.
     */ 
    private function fixIndexes($table, &$data){ 
        switch($table){
        case 'request': 
        $new_data = [ [],[],[],[] ];
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
                // Check status of request and categorize
                switch($row['id_status']['id']){
                    case 1:
                        $new_data[0][] = $row; break;
                    case 2:
                        $new_data[1][] = $row; break;
                    case 3:
                        $new_data[2][] = $row; break;
                    case 4:
                        $new_data[3][] = $row; break;
                }
            }
           
            $data = $new_data;
            break;
        case 'agent':
            foreach($data as &$row){
                $this->swap($row['id_level'], 'Level', 'name');
            }   
            break;     
        case 'client':
            $new_data = [ [],[],[],[] ];
            foreach($data as &$row){
                $this->swap($row['id_area'], 'Area', 'name');
                $this->swap($row['id_department'], 'Department', 'name');
                $this->swap($row['id_businessUnit'], 'BusinessUnit', 'name');
                $this->swap($row['id_status'], 'ClientStatus', 'name');
                // Check status of request and categorize
                switch($row['id_status']['id']){
                    case 1:
                        $new_data[0][] = $row; break;
                    case 2:
                        $new_data[1][] = $row; break;
                    case 3:
                        $new_data[2][] = $row; break;
                    case 4:
                        $new_data[3][] = $row; break;
                }
            }
            $data = $new_data;
            break;
        case 'agentThreat':
            foreach($data as &$row){
                $this->swap($row['id_threatType'], 'threatType', 'name'); 
            } 
            break; 
        }

    } 
    private function swap(&$id, $table, $col){			
        include_once('connection/connection.php');
        $db = new Connection();
        if(!is_numeric($id))
            $row = $db->select("SELECT $col FROM $table where id = '$id'");        
        else
            $row = $db->select("SELECT $col FROM $table where id = $id");        
        $i = $id; 
        $id = []; 
        if($col == "*" && count($row) > 0)
            $id = $row[0];
        else {								
            $id['id'] = $i;
            if(count($row) > 0)
                $id['name'] = $row[0][$col];
        }
    }


    /*****************************************************************************
     * Insert a client into the Database
     * @return  JSON object to inject into the view.
     */ 

    public function saveClient($obj){
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

    /*****************************************************************************
     * Insert a register Medium into the Database
     * @return  JSON object to inject into the view.
     */ 

    public function saveRegisterMedium($obj){
        // Create connection
        include_once('connection/connection.php' );
        $db = new Connection();         
        $name = $obj['name']; 
        $values['query'] = "INSERT INTO registerMedium (name) VALUES ('$name')";
        $values['info'] = $db->query($values['query']);			
        $values['id']   = $db->getLastID(); 
        $values['error'][] = $db->error(); 
        return json_encode($values);
    }

     /*****************************************************************************
     * Insert a Agent Threat into the Database
     * @return  JSON object to inject into the view.
     */ 

    public function saveAgentThreat($obj){
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
        $values['error'][] = $db->error(); 
        return json_encode($values);
    }

    public function getResponseTime(){
        include_once('connection/connection.php');
        $db = new Connection();

        $id = $_SESSION['servDesk']['id'];
            
        // Calculate 
        $q  = "SELECT (MONTH(solutionDate) - MONTH(NOW())) 'month', AVG(TIMESTAMPDIFF(SECOND, atentionDate, solutionDate)) DIV 1 'mediatime' FROM request WHERE responsable=$id && id_status = 3 GROUP BY month";
        $values['solutionTime'] = $db->select($q);
        $values['error'][] = $db->error(); 

        $q  = "SELECT (MONTH(atentionDate) - MONTH(NOW())) 'month', AVG(TIMESTAMPDIFF(SECOND, registerDate, atentionDate)) DIV 1 'mediatime' FROM request WHERE responsable=$id && (id_status = 3 || id_status = 2) GROUP BY month";
        $values['attentionTime'] = $db->select($q); 
        $values['error'][] = $db->error();  

        return json_encode($values);
    }

    
};
?>