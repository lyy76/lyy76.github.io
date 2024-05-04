<?php 

$name = $_POST['name'];
$name_surname = $_POST['name_surname'];
$your_name = $_POST['your_name'];
$phone = $_POST['phone'];
$email = $_POST['email'];
$email_contacts = $_POST['email_contacts'];
$email_organizers = $_POST['email_organizers'];
$email_sponsors = $_POST['email_sponsors'];
$text = $_POST['text'];
$top = $_POST['top'];
$forex = $_POST['forex'];
$package = $_POST['package'];
$company_name = $_POST['company_name'];
$company = $_POST['company'];
$surname = $_POST['surname'];
$position = $_POST['position'];
$country = $_POST['country'];
$web = $_POST['web'];
$money = $_POST['money'];

require_once('phpmailer/PHPMailerAutoload.php');
$mail = new PHPMailer;
$mail->CharSet = 'utf-8';

// $mail->SMTPDebug = 3;                               // Enable verbose debug output

$mail->isSMTP();                                      // Set mailer to use SMTP
$mail->Host = 'smtp.gmail.com';  // Specify main and backup SMTP servers
$mail->SMTPAuth = true;                               // Enable SMTP authentication
$mail->Username = 'iskra.od@gmail.com';                 // Наш логин
$mail->Password = 'whxnncuewvinzgxv';                  // Наш пароль от ящика
$mail->SMTPSecure = 'ssl';                            // Enable TLS encryption, `ssl` also accepted
$mail->Port = 465;                                    // TCP port to connect to
 
$mail->setFrom('iskra.od@gmail.com', 'Top Forum');   // От кого письмо 
$mail->addAddress('xr007@outlook.com');     // Add a recipient
//$mail->addAddress('ellen@example.com');               // Name is optional
//$mail->addReplyTo('info@example.com', 'Information');
//$mail->addCC('cc@example.com');
//$mail->addBCC('bcc@example.com');
//$mail->addAttachment('/var/tmp/file.tar.gz');         // Add attachments
//$mail->addAttachment('/tmp/image.jpg', 'new.jpg');    // Optional name
$mail->isHTML(true);                                  // Set email format to HTML

$mail->Subject = 'Данные';
$mail->Body    = '
	Поступили данные для ПОДПИСКИ: <br> 
	Имя Фамилия: ' . $name_surname . ' <br>
	Компания: ' . $company_name . ' <br>
	E-mail: ' . $email . ' <br><br><br>

	Поступили данные из FEEDBACK: <br>
	Сообщение: ' . $text . ' <br>
	E-mail: ' . $email_contacts . ' <br>
	Имя: ' . $your_name . ' <br><br><br>

	Поступили данные для РЕГИСТРАЦИИ: <br> 
	Выбрана конференция: ' . $top . ' <br>
	Пакет: ' . $package . ' <br>
	Имя: ' . $name . ' <br>
	Фамилия: ' . $surname . ' <br>
	Компания: ' . $company . ' <br>
	Форекс компании: ' . $forex . ' <br>
	Position: ' . $position . ' <br>
	Sponsors email: ' . $email_sponsors . ' <br>
	Organizers email: ' . $email_organizers . ' <br>	
	Номер телефона: ' . $phone . ' <br>
	Country: ' . $country . ' <br>
	Web-site: ' . $web . ' <br>	
	Method of payment: ' . $money . '';

if(!$mail->send()) {
    return false;
} else {
    return true;
}

?>