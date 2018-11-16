<?php
    include("public.php");
    $goodId = $_GET["goodId"];
    $db = getConnect();
    $sql = "select * from goods where gid = '$goodId'";
    $str = mysqli_fetch_array(mysqli_query($db,$sql));
    echo JSON_encode($str);

?>