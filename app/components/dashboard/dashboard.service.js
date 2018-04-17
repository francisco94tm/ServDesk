var Dashboard = function(Session, System, $timeout, $q) {   

   var catalogues = [
        "theme", "request", 
        "threatImpact", "threatInterest", "threatType", "threatExists", "threatCapacity",
        "infrastructureVulnerability", "assetRepository", "agentThreat",
        "status", "agent", "caseType", "registerMedium", "job",
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
                search: "", 
                theme: 	{
                    id: 1,
                    value: 'Oscuro',
                    url: 'assets/css/default.css'
                }
            } 
        });        
    } 
    this.logout = function(){
        Session.close();
    }
    this.setCatalogues = function(c){
        catalogues = c;
    }
    this.getCatalogues = function(){
        var opt = {};
        var promises = [];
        angular.forEach(catalogues, function(val, id){ 
            promises.push(
                System.call('getTableData', {'table': val}).then(function(response){
                    if(response.data.error[0] !== "")
                        console.log(response.data.error[0]);
                    opt[val] = response.data.info; 
                })
            );
        });        
        return $q.all(promises).then(function(response){      
            angular.forEach(Object.keys(opt), function(val, id){
                fixIndexFields(val, opt);
            });
            return opt;
        });  
    }

    function fixIndexFields(table, object){
        switch(table){
            case 'a':
                break;
        }
    };
}

angular.module('app').service('Dashboard', Dashboard); 
 