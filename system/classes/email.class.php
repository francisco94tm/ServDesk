<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

class Mail {
    public function send($to, $data){    
        require 'PHPMailer/Exception.php';
        require 'PHPMailer/PHPMailer.php';
        require 'PHPMailer/SMTP.php';
        
        // $mail->addCustomHeader('Content-Type', 'text/html; charset=UTF-8'); 
        $config = parse_ini_file('connection/mail.ini'); 
        $mail             = new PHPMailer($to, $data);
        $mail->CharSet = 'UTF-8';

        $mail->IsSMTP(); // telling the class to use SMTP 
        $mail->SMTPDebug  = false;                   // enables SMTP debug information (for testing)
                                                  // 1 = errors and messages
                                                  // 2 = messages only
        $mail->SMTPAuth   = true;                // enable SMTP authentication 
        $mail->SMTPSecure = "tls";   
        $mail->Host       = $config['host'];      // SMTP server
        $mail->Port       = 587;                  // SMTP port
        $mail->Username   = $config['user'];      // username
        $mail->Password   = $config['pass'];      // password
        
        $mail->SetFrom($config['user'], 'ServDesk');        
        $mail->Subject = "Bienvenido | ServDesk";      

        // $data["pass"] = printf("%04d", $data["pass"]);

        $mail->MsgHTML('
        <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
        <html xmlns="http://www.w3.org/1999/xhtml">
        <head>
            <title>Making Accessible Emails</title> 
            <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <style type="text/css">
                /* CLIENT-SPECIFIC STYLES */
                body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
                table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
                img { -ms-interpolation-mode: bicubic;  margin: 0 auto!important; display:block!important; height: 150px!important; }
                /* RESET STYLES */
                img { border: 0;  line-height: 100%; outline: none; text-decoration: none;  margin: 0 auto; display: block;}
                table { border-collapse: collapse !important; }
                body { height: 100% !important; margin: 0 !important; padding: 0 !important; width: 100% !important; }
            </style>
        </head>
        <body yahoo style="margin: 0 !important; padding: 60px 0 60px 0 !important;">
            <table border="0" cellspacing="0" cellpadding="0" role="presentation" width="100%">
            <tr>
                <td style="font-size: 0;"></td>
                <td align="center" text-align: "center"; width="600" style="border-radius: 4px; color: grey; font-family: sans-serif; font-size: 18px; line-height: 28px; padding: 40px 40px;">
                    <article>
                    <img alt="ServDesk" src="https://orig00.deviantart.net/81fa/f/2018/146/c/5/logo_by_arcticpaco-dcclkf9.png" height="150px" style="color: #333; display: block; margin: 0 auto!important; font-family: sans-serif; font-size: 40px; font-weight: bold; text-align: center">
                    <div class="h1" style="font-size: 30px; line-height: 40px; text-align: center; color: #111;  font-weight: bold; margin-top: 50px; margin-bottom: 40px;">¡Bienvenido '.$data["name"].'!</div>
                    <p style=" text-align: center; margin: 30px 0 30px 0;">Tus credenciales para acceder al sistema son las siguientes:</p>
                    <p style=" text-align: center; margin: 0 0 30px 0; color: #333">
                        <b>Usuario:</b> '.$data["user"].' <br>
                        <b>Contraseña:</b> '.$data["pass"].' </p>
                    </p> 
                    </article>
                </td>
                <td style="font-size: 0;">&​nbsp;</td>
            </tr>
            </table>
        </body>
        </html>
        '); 
        $mail->AddAddress($to, $data['name']." ".$data["lastname"]);        
        if(!$mail->Send()) {
            return json_encode($mail->ErrorInfo);
        }
        return; 
    }
}
?>