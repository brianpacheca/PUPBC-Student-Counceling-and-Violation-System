<?php

include_once 'dbconnection.php';

$courseCode = $_GET['delete'];

$conn ->query("DELETE from forprogram WHERE pCode = '$courseCode'");

header("Location: ../index.php?Deleted=success");



