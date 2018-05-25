<?php if(!isset($_SESSION)) session_start();

class System { 
    protected $values = []; 

    public function getReport(){  

        if(!isset($_SESSION['servDesk']['id']))
            return [];

        $id = $_SESSION['servDesk']['id'];

        // Create connection
        include_once('connection/connection.php');
        $db = new Connection();

        $query = "SELECT 
        r.id, r.subject, r.description, ct.name caseType, 
                CONCAT(c.name, ' ', c.firstLastname, ' ', c.secondLastname) client, 
                CONCAT(a2.name, ' ', a2.firstLastname, ' ', a2.secondLastname) responsable, 
                rm.name registerMedium, at.name agentThreat, ar.name infrastructure, 
                s.name status, r.registerDate, r.atentionDate, r.solutionDate, 
                r.solution, at2.name realAgentThreat, CONCAT(a.name, ' ', a.firstLastname, ' ', a.secondLastname) author

            FROM request r, status s, registerMedium rm, client c, agentthreat at, agentthreat at2, assetrepository ar, casetype ct, agent a, agent a2
            WHERE r.responsable = $id
            AND r.id_status = s.id 
            AND r.author = a.id
            AND r.responsable = a2.id
            AND r.id_caseType = ct.id
            AND r.id_agentThreat = at.id  
            AND r.id_realAgentThreat = at2.id  
            AND r.id_registerMedium = rm.id
            AND r.infrastructure = ar.id
            AND r.id_client = c.id
            ORDER BY r.id";

        return $db->select($query);
    }


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
                $values['query'] = "SELECT * from $table WHERE responsable = $id ORDER by id";
            else{
                $values['query'] = "SELECT * from $table WHERE id_client = $id ORDER by id"; 
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

        /**---------------------------*/    
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
                    case 1: $new_data[0][] = $row; break;
                    case 2: $new_data[1][] = $row; break;
                    case 3: $new_data[2][] = $row; break;
                    case 4: $new_data[3][] = $row; break;
                }
            }           
            $data = $new_data;
            break;

        /**---------------------------*/    
        case 'agent':
            foreach($data as &$row){
                $this->swap($row['id_level'], 'Level', 'name');
            }   
            break; 
    
        /**---------------------------*/    
        case 'client':
            $new_data = [ [],[],[],[] ];
            foreach($data as &$row){
                $this->swap($row['id_area'], 'Area', 'name');
                $this->swap($row['id_department'], 'Department', 'name');
                $this->swap($row['id_businessUnit'], 'BusinessUnit', 'name');
                $this->swap($row['id_status'], 'ClientStatus', 'name');
                // Check status of request and categorize
                switch($row['id_status']['id']){
                    case 1: $new_data[0][] = $row; break;
                    case 2: $new_data[1][] = $row; break;
                    case 3: $new_data[2][] = $row; break;
                    case 4: $new_data[3][] = $row; break;
                }
            }
            $data = $new_data;
            break;
        
        /**---------------------------*/    
        case 'agentThreat':
            foreach($data as &$row){
                $this->swap($row['id_threatType'], 'threatType', 'name'); 
            } 
            break; 
        }

    } 

    /**
     * Swap
     */
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