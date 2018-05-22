<?php 
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
if(!isset($_SESSION)) session_start();

if(isset($_REQUEST['request'])) {	 
	
	$toDo = $_REQUEST['request'];
	unset($_REQUEST['request']);

	/** ----------------------------------------------------------
	 *
	 *  Handle request petitions 
	 * 
	 * ----------------------------------------------------------
	 */
	switch($toDo){

		case 'getTableData':
			include_once('system.class.php');
			$system = new System(); 
			echo $system->getTableData($_REQUEST);	
			break;   

		/**
		 * Save or edit a request
		 */
		case 'saveCase':
			include_once('request.class.php');
			$request = new Request(); 
			echo $request->save($_REQUEST);	
			break;  
		case 'editCase':
			include_once('request.class.php');
			$request = new Request(); 
			echo $request->edit($_REQUEST);	
			break; 


		case 'saveClient':
			include_once('system.class.php');
			$system = new System(); 
			echo $system->saveClient($_REQUEST);	
			break;
		case 'saveRegisterMedium':
			include_once('system.class.php');
			$system = new System(); 
			echo $system->saveRegisterMedium($_REQUEST);	
			break;
		case 'saveAgentThreat':
			include_once('system.class.php');
			$system = new System(); 
			echo $system->saveAgentThreat($_REQUEST);	
			break;
		case 'saveAgent':
			include_once('agent.class.php');
			$agent = new Agent(); 
			echo $agent->save($_REQUEST);	
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
		case 'getRiskCalculation':
			include_once('risk.class.php');
			$risk = new Risk();   
			$_REQUEST['from'] = ($_REQUEST['from'] == "today") ? date('Y-m-01 H:i:s', time()) : date('Y-m-01 H:i:s', strtotime($_REQUEST['from']));
			$_REQUEST['to']   = ($_REQUEST['to']   == "today") ? date('Y-m-01 H:i:s', time()) : date('Y-m-01 H:i:s', strtotime($_REQUEST['to']));
			echo $risk->calculate($_REQUEST['from'], $_REQUEST['to']);	
			break;  
		case 'getCURPMetadata':
			include_once('curp.class.php');
			$curp = new Curp(); 
			echo $curp->getMetadata($_REQUEST['curp']);	
			break; 
		case 'getResponseTime':
			include_once('system.class.php');
			$system = new System(); 
			echo $system->getResponseTime();
			break;
	}
} 
?>