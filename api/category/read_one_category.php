<?php
// include core configuration
include_once('../../config/core.php');

// include database connection
include_once('../../config/database.php');

// category object
include_once('../../objects/category.php');

// class instance
$database = new Database();
$db = $database->getConnection();

$category = new Category($db);

// read one category
$id = $_POST['category_id'];

$results = $category->readOne($id);

// output in json format
echo $results;
