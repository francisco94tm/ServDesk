<?php 
	header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
	session_start();

	if(isset($_REQUEST['request'])) {	
 
		$system = new System(); 
		$toDo = $_REQUEST['request'];
		unset($_REQUEST['request']);

		// Check the action to do according the request that was sent
		switch($toDo){
			case 'getTableData':
				echo $system->getTableData($_REQUEST['table']);	
				break;  
			case 'saveRequirement':
				echo $system->saveRequirement($_REQUEST);	
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

		public function getTableData($table){
			// Create connection
			include_once('connection.php');
			$db = new Connection(); 

			$values['query'] = "SELECT * from $table";
			$values['info'] = $db->select($values['query']);

			$q = "SELECT MAX(id) as maxId from $table";
			$values['maxId'] = $db->select($q)[0]['maxId'];

			$values['error'][] = $db->error();
			return json_encode($values);
		} 

		public function saveRequirement($obj){
			// Create connection
			include_once('connection.php');
			$db = new Connection(); 
			
			$caseType = $obj['caseType'];
			$description = $obj['description'];
			$impact = $obj['impact'];
			$priority = $obj['priority'];
			$reason = $obj['reason'];
			$registerMedium = $obj['registerMedium'];
			$responsible = $obj['responsible'];
			$status = $obj['status'];
			$urgency = $obj['urgency'];

			$values['query'] = "INSERT INTO requirement (registerDate, caseType, description, impact, priority, reason, registerMedium, responsible, status, urgency)
								VALUES (now(), $caseType, '$description', $impact, $priority, '$reason', $registerMedium, $responsible, $status, $urgency)";
			$values['info'] = $db->query($values['query']);			
			$values['id'][] = $db->getLastID(); 
			$values['error'][] = $db->error(); 
			return json_encode($values);
		} 
	};
?>