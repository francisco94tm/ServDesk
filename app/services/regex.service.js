/****************************************************************************
 *  Regex Service
 ********************************************/

var Regex = function() {
    this.getPatterns = function(language){
        return {
            'email' : {
                'pattern': '^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$',
                'message': 'Ingresa un email válido'            
            },
            'date' : {
                'pattern': '^(?:(?:31(\\/)(?:0?[13578]|1[02]))\\1|(?:(?:29|30)(\\/)(?:0?[1,3-9]|1[0-2])\\2))(?:(?:1[6-9]|[2-9]\\d)?\\d{2})$|^(?:29(\\/)0?2\\3(?:(?:(?:1[6-9]|[2-9]\\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\\d|2[0-8])(\\/)(?:(?:0?[1-9])|(?:1[0-2]))\\4(?:(?:1[6-9]|[2-9]\\d)?\\d{2})$',
                'message': 'Formato DD/MM/AAAA'
            },
            'postalCode': {
                'pattern': '^\\d{5}?$',
                'message': 'Ingresa un código Postal válido (5 dígitos)'
            },
            'phoneNumber': {
                'pattern': '^\\d{10}$',
                'message': 'Ingresa número de 10 dígitos'
            },
            'videoUrl': {
                'pattern': '^(https?:\\/\\/)?(www\\.)?(.*)\\.(.*)$',
                'message': 'Ingresa una URL valida'
            },
            'lada': {
                'pattern': '^\\d\\d(\\d)?$',
                'message': 'Ingresa una clave LADA válida (2 o 3 dígitos)'
            },
            'rfc': {
                'pattern': '^[A-Z]{4}\\d{6}(..)?$',
                'message': 'Ingresa un RFC válido'
            },
            'digits': {
                'pattern': '^\\d+$',
                'message': 'Ingresa números exclusivamente'
            },
            'curp':{
                'pattern' : '^[A-Z]{1}[AEIOU]{1}[A-Z]{2}[0-9]{2}(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1])[HM]{1}(AS|BC|BS|CC|CS|CH|CL|CM|DF|DG|GT|GR|HG|JC|MC|MN|MS|NT|NL|OC|PL|QT|QR|SP|SL|SR|TC|TS|TL|VZ|YN|ZS|NE)[B-DF-HJ-NP-TV-Z]{3}[0-9A-Z]{1}[0-9]{1}$',
                'message' : 'Ingresa un CURP válido'
            },
            'score':{
                'pattern' : '^(10(\\.00)|[0-9](\\.\\d{2}))$',
                'message' : 'Ingresa una calificación (con dos decimales)'
            },
            'validDate':{
                'pattern' : '^(0?[1-9]|[12][0-9]|3[01])[\\/](0?[1-9]|1[012])[\\/]([8][789]|[019][\\d])',
                'message' : 'Ingresa fecha válida posterior a 01/01/87'
            }
        };
    }
}
 
angular.module('app').service('Regex', Regex); 
