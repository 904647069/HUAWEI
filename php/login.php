<?php
    include("public.php");
    $db = getConnect();
    $username=$_GET["username"];
    $pwd = $_GET["pwd"];
    $sql = "select upwd from users where uname='$username'";
    mysqli_query($db,$sql);
    $res = mysqli_fetch_array(mysqli_query($db,$sql));
    $sqlpwd=$res["upwd"];
    if($sqlpwd==$pwd){
        echo 1;
    }
    else{
        echo 0;
    }
?>
