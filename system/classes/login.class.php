<?php if(!isset($_SESSION)) session_start();
class Login{ 
    protected $values = [];

    /************************************************************************
     * Verify credentials to allw init session
     * @return  JSON Flag to check whether credentials were correct and if so, the user object data. 
     */
    public function startSession($credentials){

        // Create connection
		include_once('connection/connection.php');
        $db = new Connection(); 

        $user = $credentials['user'];
        $pass = $credentials['pass'];

        $query = "SELECT * from `agent` WHERE usr = '$user'"; 
        $row = $db->select($query);

        // The user is an agent
        if(count($row) > 0){
            // pass matches
            if($row[0]['pass'] === $pass){
                unset($row[0]['pass']);               
                $values['session'] = $row[0];
                $_SESSION['servDesk'] = $row[0];
                $values['instruction'] = 1;
            }
            // Pass not matches
            else $values['instruction'] = 0;
            
        }
        // The user is not an agent, check if he or she is a client
        else{
            // Verify existance in client table
            $query = "SELECT * from `client` WHERE curp = '$user'"; 
            $values['QUERY'] = $query;
            $row = $db->select($query);
            $values['row'] = $row;

            // User exists
            if(count($row) > 0){
                // pass matches 
                $values['matches'] = $row[0]['id'].", ".$pass*1;
                if($row[0]['id'] == $pass*1){ 
                    $row[0]['id_level'] = 4;
                    $row[0]['id_theme'] = 1;
                    $values['session'] = $row[0];
                    $_SESSION['servDesk'] = $row[0];
                    $values['instruction'] = 1;
                }
                // Pass not matches
                else $values['instruction'] = 0;
            }
            // User not exist
            else $values['instruction'] = -1;
        }  
        return json_encode($values);
    }

    /************************************************************************
	 * Close session deleting SESSION object 
	 */
    public function closeSession(){ 
        unset($_SESSION['servDesk']);
        $_SESSION['servDesk'] = [];
        return json_encode($_SESSION['servDesk']);
    }

    /************************************************************************
	 * Verify if $_SESSION object exists
     * @return false if the $_SESSION object does not exist
     * @return the $_SESSION['servDesk'] object if it exists
	 */
    public function verifySession(){
        if(isset($_SESSION['servDesk']) && $_SESSION['servDesk'] != [])
            return json_encode($_SESSION['servDesk']);
        return 'FALSE';
    } 
}
?>