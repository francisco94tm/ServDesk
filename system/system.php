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

			if(!isset($obj['condition'])){
				$values['query'] = "SELECT * from $table";
				$values['info'] = $db->select($values['query']);
				$q = "SELECT MAX(id) as maxId from $table";
				$values['maxId'] = $db->select($q)[0]['maxId'];
			}

			else {
				$condition = $obj['condition'];
				$values['query'] = "SELECT * from $table WHERE $condition";
				$values['info'] = $db->select($values['query']);
			} 			

			$values['error'][] = $db->error();
			return json_encode($values);
		} 
	 

	////////////////////////////////////////////////////////////////////////
 

		public function saveRequirement($obj){
			// Create connection
			include_once('connection/connection.php' );
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