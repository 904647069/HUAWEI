<?php
    include("public.php");
    $username = $_GET["username"];
    $db = getConnect();
    $sql = "select * from users where uname='$username'";
    $str= mysqli_fetch_array((mysqli_query($db,$sql)));
    if($str){
         echo 1;
    }
    else{
         echo 0;
    }
?>