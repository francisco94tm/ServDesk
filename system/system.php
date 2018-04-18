<?php 
	header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
	if(!isset($_SESSION)) session_start();
 
	if(isset($_REQUEST['request'])) {	 
		
		$toDo = $_REQUEST['request'];
		unset($_REQUEST['request']);

		// Check the action to do according the request that was sent
		switch($toDo){
			case 'getTableData':
				$system = new System(); 
				echo $system->getTableData($_REQUEST);	
				break;   
			case 'saveRequirement':
				$system = new System(); 
				echo $system->saveRequirement($_REQUEST);	
				break; 
			case 'login':
				include_once('login.class.php');
				$login = new Login(); 	 
				echo $login->startSession($_REQUEST);
				break; 
			case 'logout':
				include_once('login.class.php');
				$login = new Login(); 	 
				echo $login->closeSession($_REQUEST);
				break; 
			case 'getLoginStatus':
				include_once('login.class.php');
				$login = new Login(); 	 
				echo $login->verifySession($_REQUEST);
				break; 
		}
	}

	////////////////////////////////////////////////////////////////////////
 
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
		
		public function saveRequirement($obj){
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
			$status = $obj['status'];
			$subject = $obj['subject'];
 
			$values['query'] = "INSERT INTO request (
				id_caseType, infrastructure, description,
				subject, author, responsable,
				id_status, id_agentThreat, id_registerMedium
			)
			 VALUES (
				 $caseType, '$asset', '$description', 
				 '$subject', $author, $responsable,
				 $status, $agentThreat,  $registerMedium
			 )";
			$values['info'] = $db->query($values['query']);			
			$values['id']   = $db->getLastID(); 
			$values['error'][] = $db->error(); 
			return json_encode($values);
		}
	};
?>