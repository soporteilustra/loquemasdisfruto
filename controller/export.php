<?php
//Base de datos
$conexion = new mysqli('localhost','root','root','loquemasdisfruto');

//fecha de la exportación
$fecha = date("d-m-Y");
$consulta= "SELECT * FROM registros";
$resultado= $conexion->query($consulta);

//Inicio de la instancia para la exportación en Excel
header('Content-type: application/vnd.ms-excel');
header("Content-Disposition: attachment; filename=Registros_loquemasdisfruto_$fecha.xls");
header("Pragma: no-cache");
header("Expires: 0");

echo "<table border=1> ";
echo "<tr> ";
echo  "<th colspan='11'>REPORTE DE REGISTROS - #LOQUEMASDISFRUTO.COM </th> ";
echo "</tr> ";
echo "<tr> ";
echo  "<th>N&deg;</th> ";
echo  "<th>Nombre</th> ";
echo 	"<th>Empresa</th> ";
echo 	"<th>RUC</th> ";
echo  "<th>Correo electrónico</th> ";
echo 	"<th>Teléfono</th> ";
echo 	"<th>Perfil</th> ";
echo 	"<th>Área</th> ";
echo 	"<th>Cargo</th> ";
echo 	"<th>&iquest;Posee sistema de facturación?</th> ";
echo 	"<th>Fecha de registro</th> ";
echo "</tr> ";

while($row = mysqli_fetch_array($resultado)){

	$id = $row['id'];
	$nombre = $row['name'];
	$empresa = $row['enterprise'];
	$ruc = $row['ruc'];
	$correo = $row['email'];
  $telefono = $row['phone'];
	$perfil = $row['profile'];
	$area = $row['area'];
	$cargo = $row['position'];
	$getSistem = $row['getsistem'];
	$fecha = $row['date'];

	echo "<tr> ";
	echo 	"<td>".$id."</td> ";
	echo 	"<td>".$nombre."</td> ";
	echo 	"<td>".$empresa."</td> ";
	echo 	"<td>".$ruc."</td> ";
  echo 	"<td>".$correo."</td> ";
	echo 	"<td>".$telefono."</td> ";
	echo 	"<td>".$perfil."</td> ";
	echo 	"<td>".$area."</td> ";
	echo 	"<td>".$cargo."</td> ";
	echo 	"<td>".$getSistem."</td> ";
	echo 	"<td>".$fecha."</td> ";
	echo "</tr> ";

}
echo "</table> ";

?>
