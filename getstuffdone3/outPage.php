<html>
<body>
<?php $name= $_POST["name"]; ?><br>
<?php $category= $_POST["category"]; ?><br>
<?php $isbn= $_POST["isbn"]; ?><br>
<?php $desc= $_POST["desc"]; ?><br>
<?php
$mysqli= new mysqli("localhost", "root", "root", "bookLib");
$mysqli->query("INSERT INTO Books VALUES ('$name', '$category', '$isbn', '$desc', NULL)");
?>
</body>
</html>