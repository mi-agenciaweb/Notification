<?php
require __DIR__.'/../lib_ext/autoload.php';

//instancia namespace e classe
use Notification\Email;


$email = new Email(2, "mail.host.com", "your@email.com", "your-pass", "smtp secure (tls/ssl)", "port (587)", "from@email.com", "From Name");

$email->sendEmail("SUbject", "Content", "reply@email.com", "Replay Name", "address@email.com", "Address Name");


