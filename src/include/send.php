<?php
include_once("./config.php");

if((isset($_POST['name_f'])&&$_POST['name_f']!="")&&(isset($_POST['phone_f'])&&$_POST['phone_f']!="")){ 
	
	    $to = "bbenjamin@rambler.ru";
        $subject = 'Новая заявка';
		$from_title = 'Заполнена форма с сайта SomeSite';
		$from_mail = 'test@admin.ru';
		$adres_l ='';
    if(isset($_POST['adress_f'])) {
        $adres_l = '<p>Адрес: '.$_POST['adress_f'].'</p>';
    }
    $message ='
		<html>
			<head>
				<title>'.$subject.'</title>
            </head>
			<body>
				<p>Форма: '.$_POST['nameForm'].'</p>
				<p>Имя: '.$_POST['name_f'].'</p>
                <p>Телефон: '.$_POST['phone_f'].'</p>                     
				<p>// ----------------------------- //</p>  
				'.$adres_l.'
            </body>
        </html>';
		
        $headers = "From: ".$from_title." <".$from_mail.">\r\n";
        $headers .= "Content-type: text/html; charset=utf-8 \r\n";
        mail($to, $subject , $message, $headers);
}
else{
	echo "error";
}
?>





