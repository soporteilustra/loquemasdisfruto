<?php
function sendEmail($variables, $values)
{

  $vars = explode(',',$variables);
  $vals = explode(',',$values);

  $email_to = "soporte@ilustraconsultores.com";
  $email_subject = "Contacto de #loquemásdisfruto | Efacturación";

  $email_message = "<h2>Nuevo contacto desde #loquemásdisfruto.com</h2>";
  $email_message .= "<h3>Detalles de la consulta: </h3>\n\n";

  for ($i=0; $i < count($vars); $i++) {
    $email_message.= "<h3 style='font-family: arial; font-weight: 300; background: #4eb648; color: #fff; padding: .5em 1em; margin: 0em;'>".translater($vars[$i])."</h3>";
    $email_message.= "<h3 style='font-family: arial; font-weight: 300; color: #424242; margin: 0em; padding: .5em 1em;'>".strtoupper($vals[$i])."</h3>";
  }

  // Ahora se envía el e-mail usando la función mail() de PHP
  $headers = "MIME-Version: 1.0\r\n";
  $headers .= "Content-type: text/html; charset=utf-8\r\n";
  //dirección del remitente
  $headers .= "From: Lo que más disfruto | Efacturación < soporte@ilustraconsultores.com >\r\n";
  //Enviamos el mensaje a tu_dirección_email
  $bool = mail($email_to,$email_subject,$email_message,$headers);

  return $bool;
}

function translater($value)
{
    $dicc = [
      "profile" => "perfil",
      "area" => "Área",
      "position" => "Cargo",
      "getSistem" => "¿Posee sistema de facturación?",
      "name" => "Nombre",
      "email" => "Correo electrónico",
      "enterprise" => "Empresa",
      "phone" => "teléfono",
      "ruc" => "R.U.C",
    ];

  return ucfirst($dicc["$value"]);
}


?>
