<?php
    include("public.php");
    $db = getConnect();
    $username = $_POST["username"];
    $pwd = $_POST["pwd"];
    $sql = "insert into users(uname,upwd) values ('$username','$pwd')";
    mysqli_query($db,$sql);
    echo 1;
?>