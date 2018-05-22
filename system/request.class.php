<?php if(!isset($_SESSION)) session_start();
    class Request{
        protected $values = []; 
        /*****************************************************************************
         * Insert a case into the Database
         * @return  JSON object to inject into the view.
         */ 
        
        public function save($obj){
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

        /*****************************************************************************
         * Edit a case into the Database
         * @return  JSON object to inject into the view.
         */ 
        
        public function edit($obj){
            // Create connection
            include_once('connection/connection.php' );
            $db = new Connection();  
            $agentThreat = $obj['id_agentThreat'];
            $asset = $obj['infrastructure']; 
            $description = $obj['description'];
            $registerMedium = $obj['id_registerMedium']; 
            $client = $obj['id_client'];
            $subject = $obj['subject'];
            $id = $obj['id'];
            $status = $obj['id_status'];

            $values['query'] = "UPDATE request SET
                infrastructure = '$asset',
                description = '$description',
                subject = '$subject',  
                id_status = $status, 
                id_client = $client, 
                id_agentThreat = $agentThreat,
                id_registerMedium = $registerMedium
                WHERE id = $id
            ";
            $values['info'] = $db->query($values['query']);	 
            $values['error'] = $db->error(); 
            return json_encode($values);
        }
    }
?>