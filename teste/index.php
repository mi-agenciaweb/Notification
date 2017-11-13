<?php
require __DIR__.'/../lib_ext/autoload.php';

//instancia namespace e classe
use Notification\Email;


$novoEmail = new Email(2, 'mail.mi-agenciaweb.com', 'contato@mi-agenciaweb.com', 'rd@at1902', 'tls', '587', 'richard.deus@tarjaconsult.com', "Richard Tarjaconsult");
$novoEmail->sendMail("teste composer", "<p>Esse´é um e-mail de teste do curso de <b>composer</b></p>","richard.deus@tarjaconsult.com", "Richard de deus", "richard.deus@gmail.com", "Richard Gmail" );

var_dump($novoEmail);

