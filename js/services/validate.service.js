
/****************************************************************************
 * Validate Service
 ********************************************/

var Validate = function(Regex){
    this.isEmpty = function(value){
        return (value === null || value === undefined || value === "")    
    }

    this.isInArray = function(value, array) {
        if(array == undefined)
            return 0;
        return array.indexOf(value) > -1;
    }

    this.curp = function(curp){
        var re = /^([A-Z][AEIOUX][A-Z]{2}\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])[HM](?:AS|B[CS]|C[CLMSH]|D[FG]|G[TR]|HG|JC|M[CNS]|N[ETL]|OC|PL|Q[TR]|S[PLR]|T[CSL]|VZ|YN|ZS)[B-DF-HJ-NP-TV-Z]{3}[A-Z\d])(\d)$/,
            validado = curp.match(re);   
                 
        // The regex has matched
        if (!validado)
            return false;        

        // Validate verifier code
        function digitoVerificador(curp17) 
        {
            var diccionario  = "0123456789ABCDEFGHIJKLMNÑOPQRSTUVWXYZ",
                lngSuma      = 0.0,
                lngDigito    = 0.0;
            for(var i=0; i<17; i++)
                lngSuma = lngSuma + diccionario.indexOf(curp17.charAt(i)) * (18 - i);
            lngDigito = 10 - lngSuma % 10;
            if (lngDigito == 10) return 0;
            return lngDigito;
        }      
        if (validado[2] != digitoVerificador(validado[1])) 
            return false;  

        // It is a valid CURP
        return true; 
    }

    this.regex = function(string, regex){
        if(Regex.getPatterns()[regex] !== undefined)
            regex = Regex.getPatterns()[regex].pattern;
        var reg = new RegExp(regex);  
        return reg.test(string);
    }
}
 