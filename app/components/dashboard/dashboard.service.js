var Dashboard = function(Session, System, $timeout, $q) {   

   var catalogues = [
        "theme", "request", 
        "threatImpact", "threatInterest", "threatType", "threatExists", "threatCapacity",
        "infrastructureVulnerability", "assetRepository", "agentThreat",
        "status", "agent", "caseType", "registerMedium", "job", "client",
        "area", "department", "businessUnit", "level"
    ];

    this.sessionExists = function(){
        return Session.isSet().then(function(response){ 
            return response.data !== 'FALSE';
        });
    }

    this.getSessionData = function(){         
        return Session.getData().then(function(response){ 
            return {
                id : response.id,
                name :  response.name + " " +  response.firstLastname,  
                icon:	'settings', 
                view: 'settings-container',
                sectionlevel: response.id_level,
                theme: 	{
                    id: 1,
                    value: 'Oscuro',
                    url: 'assets/css/default.css'
                }
            } 
        });        
    } 
    
    this.setCatalogues = function(c){
        catalogues = c;
    }
    this.getCatalogues = function(cat){
        var opt = {};
        var promises = [];
        angular.forEach(catalogues, function(val, id){ 
            
            // Look for specific catalog
            if(cat !== undefined){
                if(cat !== val)
                return;
            }
            promises.push(
                System.call('getTableData', {'table': val}).then(function(response){   
                    if(response.data.error[0] !== "")
                        console.log(response.data.error[0]);
                    opt[val] = response.data.info; 
                })
            );
        });        
        return $q.all(promises).then(function(response){     
            return opt;
        });  
    } 
}

angular.module('app').service('Dashboard', Dashboard); 
 