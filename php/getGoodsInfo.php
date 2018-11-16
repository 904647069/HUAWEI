<?php
    include("public.php");
    $db = getConnect();
    $sql = "select * from goods";
    $res=mysqli_query($db,$sql);
    $data = array();
    while($result = mysqli_fetch_array($res)){
        $data[]=$result;
    }
    echo json_encode($data);
    // print_r($data);
    //print_r(json_encode(mysqli_fetch_array(mysqli_query($db,$sql))));
    
   //print_r(json_encode($data));
    
?>