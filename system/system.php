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
			include_once('classes/system.class.php');
			$system = new System(); 
			echo $system->getTableData($_REQUEST);	
			break;   
 
		/**
		 * REQUEST
		 */
		case 'saveCase':
			include_once('classes/request.class.php');
			$request = new Request(); 
			echo $request->save($_REQUEST);	
			break;  
		case 'editCase':
			include_once('classes/request.class.php');
			$request = new Request(); 
			echo $request->edit($_REQUEST);	
			break; 


		/**
		 * CLIENT
		 */
		case 'saveClient':
			include_once('classes/client.class.php');
			$client = new Client(); 
			echo $client->save($_REQUEST);	
			break;
		case 'editClient':
			include_once('classes/client.class.php');
			$client = new Client(); 
			echo $client->edit($_REQUEST);	
			break;
		case 'deleteClient':
			include_once('classes/client.class.php');
			$client = new Client(); 
			echo $client->delete($_REQUEST);	
			break;
		case 'doesCURPExist':
			include_once('classes/client.class.php');
			$client = new Client(); 
			echo $client->exists($_REQUEST);	
			break;


		/**
		 * REGISTER MEDIUM
		 */
		case 'saveRegisterMedium':
			include_once('classes/registermedium.class.php');
			$registerMedium = new RegisterMedium(); 
			echo $registerMedium->save($_REQUEST);	
			break;
		case 'editRegisterMedium':
			include_once('classes/registermedium.class.php');
			$registerMedium = new RegisterMedium(); 
			echo $registerMedium->edit($_REQUEST);	
			break;
		case 'deleteRegisterMedium':
			include_once('classes/registermedium.class.php');
			$registerMedium = new RegisterMedium(); 
			echo $registerMedium->delete($_REQUEST);	
			break;

		
		/**
		 * AGENT THREAT
		 */
		case 'saveAgentThreat':
			include_once('classes/agentthreat.class.php');
			$agentThreat = new AgentThreat(); 
			echo $agentThreat->save($_REQUEST);	
			break;
		case 'editAgentThreat':
			include_once('classes/agentthreat.class.php');
			$agentThreat = new AgentThreat(); 
			echo $agentThreat->edit($_REQUEST);	
			break;
		case 'deleteAgentThreat':
			include_once('classes/agentthreat.class.php');
			$agentThreat = new AgentThreat(); 
			echo $agentThreat->delete($_REQUEST);	
			break;


		/**
		 * AGENT
		 */
		case 'saveAgent':
			include_once('classes/agent.class.php');
			$agent = new Agent(); 
			echo $agent->save($_REQUEST);	
			break; 
		case 'editAgent':
			include_once('classes/agent.class.php');
			$agent = new Agent(); 
			echo $agent->edit($_REQUEST);	
			break; 
		case 'deleteAgent':
			include_once('classes/agent.class.php');
			$agent = new Agent(); 
			echo $agent->delete($_REQUEST);	
			break; 			
		case 'doesAgentExist':
			include_once('classes/agent.class.php');
			$agent = new Agent(); 
			echo $agent->exists($_REQUEST);	
			break;


		/**
		 * LOGIN
		 */
		case 'login':
			include_once('classes/login.class.php');
			$login = new Login(); 	 
			echo $login->startSession($_REQUEST);
			break; 
		case 'logout':
			include_once('classes/login.class.php');
			$login = new Login(); 	 
			echo $login->closeSession($_REQUEST);
			break; 
		case 'getLoginStatus':
			include_once('classes/login.class.php');
			$login = new Login(); 	 
			echo $login->verifySession($_REQUEST);
			break; 

		
		/**
		 * REPORTS
		 */
		case 'getRiskCalculation':			
			include_once('classes/report.class.php'); 
			$report = new Report();
			echo $report->calculateRisk($_REQUEST);	
			break;  


		case 'getCURPMetadata':
			include_once('classes/curp.class.php');
			$curp = new Curp(); 
			echo $curp->getMetadata($_REQUEST['curp']);	
			break; 
		case 'getResponseTime':
			include_once('classes/system.class.php');
			$system = new System(); 
			echo $system->getResponseTime();
			break;
	}
} 
?>