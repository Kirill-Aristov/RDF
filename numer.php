<?php
$name = "Не известно";
$age = "Не известно";
if(isset($_GET['name'])) $name = $_GET['name'];
if (isset($_GET['age'])) $age = $_GET['age'];
echo "Ваше имя: $name  <br> Ваш возраст: $age";
?>