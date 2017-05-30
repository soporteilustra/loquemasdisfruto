<?php
include_once 'connection.php';
include 'sendmail.php';

//get parameters
$variables='';
$values='';
foreach ($_POST as $key => $value) {
  if ($key == 'data') {
    foreach ($value as $datakey => $datavalue) {
      $variables.="$datakey,";
      $values.="'$datavalue',";
    }
  } else {
    $variables.="$key,";
    $values.="'$value',";
  }
}
$variables = substr($variables,0,-1);
$values= substr($values,0,-1);

//table data
$table = 'registros';
//insertar registros
$insertar = "INSERT INTO $table ($variables) VALUES ($values)";
mysqli_query($conexion,$insertar);
//enviar correo
$bool = sendEmail($variables, $values);
if ($bool) {
  # code...
  $message = 'success';
} else {
  $message = 'warning';
}

mysqli_close($conexion);

echo $message;
?>
