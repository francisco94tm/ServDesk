<html>
<head>
    <title>CR</title>
</head>
<?php
    ini_set('xdebug.var_display_max_data', -1);
    ini_set('xdebug.var_display_max_children', -1);
    ini_set('xdebug.var_display_max_depth', -1);
	include_once("connection/connection.php");
	$db = new Connection(); 

    $fechaIni = "2018-04-17"; // $_REQUEST['fechaIni'];//
    $fechaFin = "2018-04-26"; //$_REQUEST['fechaFin'];
    
    $query = "SELECT r.infrastructure,tt.name as threatType,at.name as agentThreat, COUNT(at.id) as count
        FROM Request r
        INNER JOIN AgentThreat at ON r.id_agentThreat=at.id
        INNER JOIN ThreatType tt ON at.id_threatType=tt.id and at.id=r.id_agentThreat
        WHERE r.id_status=3 
        AND r.registerDate BETWEEN $fechaIni AND NOW()
        GROUP BY r.infrastructure,tt.name,at.name;";
    $rows = $db->select($query); 

    $assets = []; 
    foreach ($rows as $r) {
        if(!isset($assets[$r["infrastructure"]])){
            $assets[$r["infrastructure"]]["threatTypes"]=[];
            $assets[$r["infrastructure"]]["ocurrences"]=0;
        } 

        if(!isset($assets[$r["infrastructure"]]["threatTypes"][$r["threatType"]])){
            $assets[$r["infrastructure"]]["threatTypes"][$r["threatType"]]["agentThreats"] = [];
            $assets[$r["infrastructure"]]["threatTypes"][$r["threatType"]]["ocurrences"] = 0;
            $assets[$r["infrastructure"]]["threatTypes"][$r["threatType"]]["probability"] = 0.0;
            $assets[$r["infrastructure"]]["threatTypes"][$r["threatType"]]["impact"] = 0;
        }

        if(!isset($assets[$r["infrastructure"]]["threatTypes"][$r["threatType"]]["agentThreats"][$r["agentThreat"]])){
            $assets[$r["infrastructure"]]["threatTypes"][$r["threatType"]]["agentThreats"][$r["agentThreat"]]["ocurrences"] = 0;
            $assets[$r["infrastructure"]]["threatTypes"][$r["threatType"]]["agentThreats"][$r["agentThreat"]]["probability"] = 0.0;
            $assets[$r["infrastructure"]]["threatTypes"][$r["threatType"]]["agentThreats"][$r["agentThreat"]]["e"] = 0;
            if($assets[$r["infrastructure"]]["threatTypes"][$r["threatType"]] == "Organizacional"){
                $assets[$r["infrastructure"]]["threatTypes"][$r["threatType"]]["agentThreats"][$r["agentThreat"]]["i"] = 0;
            }
            $assets[$r["infrastructure"]]["threatTypes"][$r["threatType"]]["agentThreats"][$r["agentThreat"]]["c"] = 0;
            $assets[$r["infrastructure"]]["threatTypes"][$r["threatType"]]["agentThreats"][$r["agentThreat"]]["v"] = 0;
            $assets[$r["infrastructure"]]["threatTypes"][$r["threatType"]]["agentThreats"][$r["agentThreat"]]["R"] = 0;
            $assets[$r["infrastructure"]]["threatTypes"][$r["threatType"]]["agentThreats"][$r["agentThreat"]]["action"] = 0;
        }

        $assets[$r["infrastructure"]]["threatTypes"][$r["threatType"]]["agentThreats"][$r["agentThreat"]]["ocurrences"] += $r["count"];
        $assets[$r["infrastructure"]]["threatTypes"][$r["threatType"]]["ocurrences"] += $r["count"];
        $assets[$r["infrastructure"]]["ocurrences"] += $r["count"];
    }

    $lowestRisk = 10; 

    foreach ($assets as $asset => $assetData) {
        foreach ($assetData["threatTypes"] as $threatType => $threatTypeData) {
 
            $probability = $threatTypeData["ocurrences"]/$assetData["ocurrences"]*10;
            $assets[$asset]["threatTypes"][$threatType]["probability"] = $probability;
            
            $query = "SELECT weighing FROM ThreatImpact WHERE $probability BETWEEN lowerValue AND upperValue;"; 
            $impact = $db->select($query)[0]["weighing"]; 

            $assets[$asset]["threatTypes"][$threatType]["impact"] = $impact*1; 

            foreach ($threatTypeData["agentThreats"] as $agentThreat => $agentThreatData) { 

                $probability = $agentThreatData["ocurrences"]/$threatTypeData["ocurrences"];
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

    foreach ($assets as $asset => $assetData) {
        echo "asset ".$asset.": ".$assetData["ocurrences"]." ocurrencias.<br>";
        foreach ($assetData["threatTypes"] as $threatType => $threatTypeData) {
            echo "-->Tipo de amenaza ".$threatType.": ".$threatTypeData["ocurrences"]." ocurrencias, probabilidad de ocurrencia: ".$threatTypeData["probability"].", impacto: ".$threatTypeData["impact"].".<br>";
            foreach ($threatTypeData["agentThreats"] as $agentThreat => $agentThreatData) {
                echo "---->Agente de amenaza: ".$agentThreat."<br>";
                echo "---->Ocurrencias: ".$agentThreatData["ocurrences"]."<br>";
                echo "---->e: ".$agentThreatData["e"]."<br>";
                if($threatType == "Organizacional"){
                    echo "---->i: ".$agentThreatData["i"]."<br>";
                }
                echo "---->c: ".$agentThreatData["c"]."<br>";
                echo "---->v: ".$agentThreatData["v"]."<br>";
                echo "---->R: ".$agentThreatData["R"]."<br>";
                echo "---->Recomendacion: ".$agentThreatData["recomendation"]."<br>";
            }
        }
        echo "<br>";
    }    

    echo "Riesgo mas bajo: ".$lowestRisk;

?> 
</html> 