<?php
include_once("../config.php");
if (isset ($_POST['contactFF'])) {
    $to = $address;
    $subject = "Заполнена контактная форма с  SomeSite";
    $from_title = 'Заполнена форма с сайта SomeSite';
    $from_mail = 'test@admin.ru';
    $message ="".$subject."\r\nИмя: ".$_POST['nameFF']."\r\nТелефон: ".$_POST['contactFF']."\r\nСообщение: ".$_POST['messageFF']."\r\nФорма: ".$_POST['nameForm']."\r\n";
    $boundary = md5(date('r', time()));
    $filesize = '';
    $headers = "MIME-Version: 1.0\r\n";
    $headers = "From: ".$from_title." <".$from_mail.">\r\n";
    $headers .= "Reply-To: " . $from . "\r\n";
    $headers .= "Content-Type: multipart/mixed; boundary=\"$boundary\"\r\n";
    $message="
Content-Type: multipart/mixed; boundary=\"$boundary\"

--$boundary
Content-Type: text/plain; charset=\"utf-8\"
Content-Transfer-Encoding: 7bit

$message";
    for($i=0;$i<count($_FILES['fileFF']['name']);$i++) {
        if(is_uploaded_file($_FILES['fileFF']['tmp_name'][$i])) {
            $attachment = chunk_split(base64_encode(file_get_contents($_FILES['fileFF']['tmp_name'][$i])));
            $filename = $_FILES['fileFF']['name'][$i];
            $filetype = $_FILES['fileFF']['type'][$i];
            $filesize += $_FILES['fileFF']['size'][$i];
            $message.="

--$boundary
Content-Type: \"$filetype\"; name=\"$filename\"
Content-Transfer-Encoding: base64
Content-Disposition: attachment; filename=\"$filename\"

$attachment";
        }
    }
    $message.="
--$boundary--";

    if ($filesize < 10000000) { // проверка на общий размер всех файлов. Многие почтовые сервисы не принимают вложения больше 10 МБ
        mail($to, $subject, $message, $headers);
        echo $_POST['nameFF'].', Ваше сообщение получено, спасибо!';
    } else {
        echo 'Извините, письмо не отправлено. Размер всех файлов превышает 10 МБ.';
    }
}
?>
