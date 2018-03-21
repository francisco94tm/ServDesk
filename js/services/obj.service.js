/****************************************************************************
 *  Object Service
 ********************************************/

var Obj = function(Validate) {     
    /**
     * Return a parametrized string with the whole object properties
     * 
     * @param  {Object} obj [Object to be parametrized]
     * @return {String} [Parametrized string]
     */
    this.toparams = function(obj){ 
        var pairs = []; 
        var aux = "";

        for (var prop in obj) {
            if (!obj.hasOwnProperty(prop)) {
                continue;
            }
            if ($.isArray(obj)) { 
                $.each(obj, function(index, objeto){  
                   for (var propy in objeto) {
                        pairs.push(index + '['+propy+']=' + obj[propy]);
                   }
                }); 
                break;
            }
            if (Object.prototype.toString.call(obj[prop]) == '[object Object]') {
                pairs.push(this.toparams(obj[prop]));
                continue;
            }            
            pairs.push(prop + '=' + obj[prop]);
        }
        return pairs.join('&'); 
    };

    /**
     * Verify if the object properties are not null, empty or undefined
     * 
     * @param  {Object}  obj        [Object to be parametrized]
     * @param  {Array}  exceptions  [Array with the property names to exclude in the verification process]
     * @return {Boolean}            [True if all properties are filled, else otherwise]
     */
    this.isFilled = function(obj, exceptions){
        var isFilled = true;
        angular.forEach(obj, function(val, index){
            if(!Validate.isInArray(index, exceptions)){
                if(Validate.isEmpty(val)){
                    isFilled = false;
                    return -1;
                }
            }
        });
        return isFilled;
    }   
}
 