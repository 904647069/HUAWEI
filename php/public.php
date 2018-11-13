<?php
    header("content-type:text/html;charset=utf8");
    function getConnect(){
        $db = mysqli_connect("localhost","root","root");
        mysqli_select_db($db,"huawei");
        mysqli_query($db,"set names utf8");
        return $db;
    }
?>