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
			$values['error'][] = $db->error();
			return json_encode($values);
		} 
	};
?>