var Dashboard = function(Session, System, $timeout, $q) {   
    
    // Default catalogues
   var default_catalogues = [
        "theme", "request", 
        "threatImpact", "threatInterest", "threatType", "threatExists", "threatCapacity",
        "infrastructureVulnerability", "assetRepository", "agentThreat",
        "status", "agent", "caseType", "registerMedium", "job", "client",
        "area", "department", "businessUnit", "level", "clientstatus"
    ];
      
    // Set default catalogues
    this.setCatalogues = (catalogues) => {
        default_catalogues = catalogues;
    }

    // Retrieve catalogues information
    this.getCatalogues = function(cat){
        var opt = {};
        var promises = [];
        var defcat = (cat != undefined) ? cat : default_catalogues; 
            
        angular.forEach(defcat, (val, id) => {
            promises.push(
                System.call('getTableData', {'table': val}).then(function(response){     
                    if(response.data.error != undefined && response.data.error[0] !== "")
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
 