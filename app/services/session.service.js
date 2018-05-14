var Session = function(System) { 
    
    // Session object
    this.session = {        
        id:             undefined,
        backup:         undefined,
        name:           undefined,
        firstLastname:  undefined,
        secondLastname: undefined,
        email:          undefined,
        status:         undefined,
        user:           undefined,
        level:          undefined,
        icon:           'settings',
        view:           'settings-container', 
        theme: {
            id:             0,
            value:          'Por defecto',
            url:            'assets/css/default.css'
        }
    } 

    /** ************************************************************************
     * 
     *  F U N C T I O N S
     *  
     */ 
     
    // Close and delete cuerrent session
    this.close = function(){
        return System.call('logout');
    }
    
    // Verify in server if session object is set
    this.isSet = () =>  { return System.call('getLoginStatus'); }
     
    // Load Session data values from server
    this.loadData = function(){
        var _this = this;
        return System.call('getLoginStatus').then(function(response){  
            // User has logged correctly
            if(response.data !== false){ 
                _this.setData(response.data);
            } 
            return _this.getData();          
        }); 
    }  

    /** ************************************************************************
     * 
     *  G E T T E R S
     *  
     */ 

    this.getId = () => { 
        return this.session.id; 
    };
    this.getBackup = () => { 
        return this.session.backup; 
    };
    this.getName = () => { 
        return this.session.name; 
    };
    this.getFirstLastname = () => { 
        return this.session.firstLastname; 
    };
    this.getSecondLastname = () =>  { 
        return this.session.secondLastname; 
    };
    this.getEmail = () => { 
        return this.session.email; 
    };
    this.getStatus = () => { 
        return this.session.status; 
    };
    this.getUser = () => { 
        return this.session.user; 
    };
    this.getLevel= () => { 
        return this.session.level;
    }; 
    this.getIcon = () => { 
        return this.session.icon;
    }; 
    this.getView = () => { 
        return this.session.view;
    }; 
    this.getTheme = () => { 
        return this.session.theme;
    };
    this.getData = () => { 
        return this.session; 
    };
    
    /** ************************************************************************
     * 
     *  S E T T E R S
     *  
     */ 

    this.setId = (id) => { 
        this.session.id = id;
    }
    this.setBackup = (backup) => { 
        this.session.backup = backup;
    }
    this.setName = (name) => { 
        this.session.name = name;
    }
    this.setFirstLastname = (firstLastname) =>  { 
        this.session.firstLastname = firstLastname;
    }
    this.setSecondLastname= (secondLastname) => { 
        this.session.secondLastname = secondLastname;
    }
    this.setEmail = (email) => { 
        this.session.email = email;
    }
    this.setStatus = (status) => { 
        this.session.status = status;
    }
    this.setUser = (user) => { 
        this.session.user = user;
    }
    this.setLevel = (level) => { 
        this.session.level = level;
    }
    this.setIcon = (icon) => { 
        this.session.icon = icon;
    }
    this.setView = (view) => { 
        this.session.view = view;
    }
    this.setTheme = (theme) => { 
        this.session.theme = theme; 
    }

    this.setData = (data) => {
        this.session.id = data.id;      
        this.session.backup = data.backup;      
        this.session.name = data.name;
        this.session.firstLastname = data.firstLastname;
        this.session.secondLastname = data.secondLastname;
        this.session.email = data.email;
        this.session.status = data.status;
        this.session.user = data.usr;
        this.session.level = data.id_level;
    }
 

}

angular.module('app').service('Session', Session); 
 