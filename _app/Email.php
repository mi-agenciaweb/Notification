<?php

namespace Notification;

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

class Email{
    
    private $mail = \stdClass::class;

    
    
    public function __construct() {
        $this->mail = new PHPMailer(true);  
        //Server settings
        $this->mail->SMTPDebug = 2;                                 // Enable verbose debug output
        $this->mail->isSMTP();                                      // Set mailer to use SMTP
        $this->mail->Host = 'mail.mi-agenciaweb.com';  // Specify main and backup SMTP servers
        $this->mail->SMTPAuth = true;                               // Enable SMTP authentication
        $this->mail->Username = 'contato@mi-agenciaweb.com';                 // SMTP username
        $this->mail->Password = 'rd@at1902';                           // SMTP password
        $this->mail->SMTPSecure = 'tls';                            // Enable TLS encryption, `ssl` also accepted
        $this->mail->Port = 465;                                    // TCP port to connect to
        $this->mail->CharSet = 'utf-8';
        $this->mail->setLanguage('br');
        $this->mail->isHTML(true);
        $this->mail->setFrom('richard.deus@mi-agenciaweb.com', 'Richard de Deus');

    }

        public function sendMail($subject, $body, $replayEmail, $replayName, $addressEmail, $addressName) {
            $this->mail->Subject = (string)$subject;
            $this->mail->Body = $body;
            
            $this->mail->addReplyTo($replayEmail, $replayName);
            $this->mail->addAddress($addressEmail, $addressName);
            
            try{
                $this->mail->send();
            } catch (Exception $e) {
                echo 'Erro ao enviar o e-mail: {$this->mail-ErroInfo} {$e->getMessage()}';
            }
            
        echo "E-mail enviado";
    }
};

