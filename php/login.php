<?php
    include("public.php");
    $db = getConnect();
    $username=$_POST["username"];
    $pwd = $_POST["pwd"];
    $sql = "select upwd from users where uname='$username'";
    mysqli_query($db,$sql);
    $res = mysqli_fetch_array(mysqli_query($db,$sql));
    $sqlpwd=$res["upwd"];
     if($res){
        if($sqlpwd==$pwd){
            echo 1;
        }
        else{
            echo 0;
        }
     }
     else{
         echo -1;
     }
?>
