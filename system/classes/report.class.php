<?php if(!isset($_SESSION)) session_start();
    class Report{  
        /************************************************************************
         * Calculate Risk from a period of time
         * @return  JSON with recomendations and analisys data
         */
        public function calculateRisk($data){


            // Set timezone
            date_default_timezone_set('America/Mexico_City');

            // calculate from all times
            if($data['from'] === "true" && $data['to'] === "true"){
                $time_difference = " ";
            }
            // Calculate date from and to
            else{
                $fechaIni = date('Y-m-01 H:i:s', strtotime($data['from']));
                $fechaFin = date('Y-m-01 H:i:s', strtotime($data['to']));
                $time_difference = " AND r.registerDate BETWEEN '$fechaIni' AND '$fechaFin' ";
            }
 
            $assets = []; 
            $id = $_SESSION['servDesk']['id'];
            
            include_once('connection/connection.php');
            $db = new Connection(); 

            if($_SESSION['servDesk']['id_level'] == 4)
                $condition = "r.id_client = $id";
            else 
                $condition = "r.responsable = $id";
            
            $query = "SELECT r.infrastructure,
                ar.name as assetName,
                tt.name as threatType,
                at.name as agentThreat, 
                COUNT(at.id) as count
                FROM Request r, AgentThreat at, ThreatType tt, AssetRepository ar
                WHERE r.id_status = 3 
                AND r.id_agentThreat = at.id
                AND at.id_threatType = tt.id
                AND r.infrastructure = ar.id 
                AND $condition 
                $time_difference 
                GROUP BY r.infrastructure, tt.name, at.name";
            $rows = $db->select($query);

            // Loop through rows
            foreach ($rows as $r) {
                $inf = $r["infrastructure"];
                if(!isset($assets[$inf])){
                    $assets[$inf]["threatTypes"]=[];
                    $assets[$inf]["ocurrences"] = 0;
                }  
                if(!isset($assets[$inf]["threatTypes"][$r["threatType"]])){
                    $assets[$inf]["threatTypes"][$r["threatType"]]["agentThreats"] = [];
                    $assets[$inf]["threatTypes"][$r["threatType"]]["ocurrences"] = 0;
                    $assets[$inf]["threatTypes"][$r["threatType"]]["probability"] = 0.0;
                    $assets[$inf]["threatTypes"][$r["threatType"]]["impact"] = 0;
                } 
                if(!isset($assets[$inf]["threatTypes"][$r["threatType"]]["agentThreats"][$r["agentThreat"]])){
                    $assets[$inf]["threatTypes"][$r["threatType"]]["agentThreats"][$r["agentThreat"]]["ocurrences"] = 0;
                    $assets[$inf]["threatTypes"][$r["threatType"]]["agentThreats"][$r["agentThreat"]]["probability"] = 0.0;
                    $assets[$inf]["threatTypes"][$r["threatType"]]["agentThreats"][$r["agentThreat"]]["e"] = 0;
                    if($assets[$inf]["threatTypes"][$r["threatType"]] == "Organizacional"){
                        $assets[$inf]["threatTypes"][$r["threatType"]]["agentThreats"][$r["agentThreat"]]["i"] = 0;
                    }
                    $assets[$inf]["threatTypes"][$r["threatType"]]["agentThreats"][$r["agentThreat"]]["c"] = 0;
                    $assets[$inf]["threatTypes"][$r["threatType"]]["agentThreats"][$r["agentThreat"]]["v"] = 0;
                    $assets[$inf]["threatTypes"][$r["threatType"]]["agentThreats"][$r["agentThreat"]]["R"] = 0;
                    $assets[$inf]["threatTypes"][$r["threatType"]]["agentThreats"][$r["agentThreat"]]["action"] = 0;
                } 
                $assets[$inf]["threatTypes"][$r["threatType"]]["agentThreats"][$r["agentThreat"]]["ocurrences"] += $r["count"];
                $assets[$inf]["threatTypes"][$r["threatType"]]["ocurrences"] += $r["count"];
                $assets[$inf]["ocurrences"] += $r["count"];
                $assets[$inf]["name"] = $r["assetName"];
            }

            $lowestRisk = 10; 

            foreach ($assets as $asset => $assetData) {
                foreach ($assetData["threatTypes"] as $threatType => $threatTypeData) {

                    $probability = $threatTypeData["ocurrences"] / $assetData["ocurrences"] * 10;
                    $assets[$asset]["threatTypes"][$threatType]["probability"] = $probability;                    
                    $query = "SELECT weighing FROM ThreatImpact WHERE $probability BETWEEN lowerValue AND upperValue;"; 
                    $impact = $db->select($query)[0]["weighing"];         
                    $assets[$asset]["threatTypes"][$threatType]["impact"] = $impact*1; 
        
                    foreach ($threatTypeData["agentThreats"] as $agentThreat => $agentThreatData) { 
        
                        $probability = $agentThreatData["ocurrences"] / $threatTypeData["ocurrences"];
                        $assets[$asset]["threatTypes"][$threatType]["agentThreats"][$agentThreat]["probability"] = $probability;         
                        $query = "SELECT weighing FROM ThreatExists WHERE $probability BETWEEN lowerValue AND upperValue;";
                        $e = $db->select($query)[0]["weighing"]; /* ADDED */         
                        $assets[$asset]["threatTypes"][$threatType]["agentThreats"][$agentThreat]["e"] = $e*1; 
        
                        if($threatType == "Organizacional"){
                            $query = "SELECT weighing FROM ThreatInterest WHERE $probability BETWEEN lowerValue AND upperValue;";
                            $i = $db->select($query)[0]["weighing"];
                            $assets[$asset]["threatTypes"][$threatType]["agentThreats"][$agentThreat]["i"] = $i;
                        } 
                        $query = "SELECT weighing FROM ThreatCapacity WHERE $probability BETWEEN lowerValue AND upperValue;";
                        $c = $db->select($query)[0]["weighing"];
                        $assets[$asset]["threatTypes"][$threatType]["agentThreats"][$agentThreat]["c"] = $c*1;
        
                        $query = "SELECT weighing FROM InfrastructureVulnerability WHERE $probability BETWEEN lowerValue AND upperValue;";
                        $v = $db->select($query)[0]["weighing"]; 
        
                        $assets[$asset]["threatTypes"][$threatType]["agentThreats"][$agentThreat]["v"] = $v*1; 
                        $R = 0; 
                        if($threatType == "Organizacional"){
                            $R = ($e+$i+$c+$v)/4*$impact;
                        }else{
                            $R = ($e+$c+$v)/3*$impact;
                        } 
                        $assets[$asset]["threatTypes"][$threatType]["agentThreats"][$agentThreat]["R"] = $R; 
                        if($R<=$lowestRisk){
                            $lowestRisk=$R;
                        }
                    }
                }
            }

            foreach ($assets as $asset => $assetData) {
                foreach ($assetData["threatTypes"] as $threatType => $threatTypeData) {
                    foreach ($threatTypeData["agentThreats"] as $agentThreat => $agentThreatData) {
                        $R = $agentThreatData["R"]; 
                        $query = "SELECT id_probability, id_impact FROM RiskMatrix WHERE FORMAT(result,2) = FORMAT(".$R.", 2)";
         
                        $coords = $db->select($query);
                        $id_probability = $coords[0]["id_probability"];
                        $id_impact = $coords[0]["id_impact"]; 
        
                        $query = "SELECT id_probability, id_impact FROM RiskMatrix WHERE FORMAT(result,2) = FORMAT(".$lowestRisk.", 2)";
                        $coords = $db->select($query);
                        $lowestProbability = $coords[0]["id_probability"];  
                        $lowestImpact = $coords[0]["id_impact"];
        
                        $distanceP = $probability - $lowestProbability;
                        $distanceI = $impact - $lowestImpact; 
                        $newRisk = $R;
        
                        $Plowered = 0;
                        $Ilowered = 0;
        
                        for($j=$id_probability;$newRisk>=$lowestRisk&&$j>0;$j--){
                            for($i=$id_impact;$newRisk>=$lowestRisk&&$i>0;$i--){
                                $query = "SELECT result FROM RiskMatrix WHERE id_probability=".$i." and id_impact=".$j;
                                $result = $db->select($query)[0]["result"];
                                if($result < $lowestRisk){
                                    $newRisk = $result;
                                    $Plowered = $probability-$j;
                                    $Ilowered = $impact-$i;
                                }
                            }
                        }
        
                        if($Plowered<$Ilowered){
                            $assets[$asset]["threatTypes"][$threatType]["agentThreats"][$agentThreat]["recomendation"] = "Prevenir";
                        } else if($Ilowered<=$Plowered){
                            $assets[$asset]["threatTypes"][$threatType]["agentThreats"][$agentThreat]["recomendation"] = "Mitigar";
                        } 
                    }
                }
            } 
            
            return json_encode($assets); 
        }
    }   
?>  