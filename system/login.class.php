<?php if(!isset($_SESSION)) session_start();
class Login{
    protected $connectionFilePath = "connection/connection.php";
    protected $values = [];

    /************************************************************************
     * Verify credentials to allw init session
     * @return  JSON Flag to check whether credentials were correct and if so, the user object data. 
     */
    public function startSession($credentials){

        // Create connection
		include_once("connection/connection.php");
        $db = new Connection(); 

        $user = $credentials['user'];
        $pass = $credentials['pass'];

        $query = "SELECT * from `agent` WHERE usr = '$user'";
        $row = $db->select($query);

        // Verify user existance and valid credentials
        if(count($row) == 0)
            $values['instruction'] = -1;        
        else if($row[0]['pass'] != $pass)
            $values['instruction'] = 0;        
        else{
            $values['instruction'] = 1;
            unset($row[0]['pass']);               
            $values['session'] = $row[0];
            $_SESSION['servDesk'] = $row[0];
        }
        return json_encode($values);
    }

    /************************************************************************
	 * Close session deleting SESSION object 
	 */
    public function closeSession(){
        if(isset($_SESSION['servDesk']))
            unset($_SESSION['servDesk']);
    }

    /************************************************************************
	 * Verify if $_SESSION object exists
     * @return false if the $_SESSION object does not exist
     * @return the $_SESSION['servDesk'] object if it exists
	 */
    public function verifySession(){
        if(isset($_SESSION['servDesk']))
            return json_encode($_SESSION['servDesk']);
        return 'FALSE';
    }

    
}
?>