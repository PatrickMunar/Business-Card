<?php
//get data from form  
$name = $_POST['name'];
$email= $_POST['email'];
$message= $_POST['message'];
$to = "rptmunar@gmail.com";
$subject = "BZNZCard Contact Form";
$txt ="Name = ". $name . "\r\n  Email = " . $email . "\r\n Message =" . $message;
if($email!=NULL){
    mail($to,$subject,$txt);
}
?>