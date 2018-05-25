<?php
class Curp{ 
    protected $values = [];

    /************************************************************************
     * Verify credentials to allw init session
     * @return  JSON Flag to check whether credentials were correct and if so, the user object data. 
     */
    public function getMetadata($curp){ 
        $curl = curl_init();
        curl_setopt_array($curl, array(
            CURLOPT_URL => "https://curp.munett.com/v1/curp/",
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => "",
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 30,
            CURLOPT_POSTFIELDS => '{"curp":"TEMF941013HDFRRR05","options" : {"rfc" : true,"nss" : true}}',
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => "POST", 
            CURLOPT_HTTPHEADER => array( 
                "authorization: Token token=dceade403b9dda272e2cf3d54da7138d",
                "content-type: application/json"
            ),
        ));
        $values['info'] = curl_exec($curl);
        $values['error'][] = curl_error($curl);
        curl_close($curl); 
    
        return json_encode($values);
    } 
 
}
?>