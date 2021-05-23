<!DOCTYPE html>
<!--
To change this license header, choose License Headers in Project Properties.
To change this template file, choose Tools | Templates
and open the template in the editor.
-->
<html>
    <head>
        <meta charset="UTF-8">
        <title></title>
    </head>
    <body>
        <?php
            header("Content-Type: application/json; charset=UTF-8");
            $obj = json_decode($_POST["x"], false);

            $conn = new mysqli("myServer", "myUser", "myPassword", "Northwind");
            $result = $conn->query("SELECT name FROM ".$obj->table." LIMIT ".$obj->limit);
            $outp = array();
            $outp = $result->fetch_all(MYSQLI_ASSOC);

            echo json_encode($outp);
        ?>
    </body>
</html>
