<?php
// check to see if form was submitted
if ($_POST) {
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

    $id = $_POST['id'];

    // update the category
    echo $category->delete($id) ? 'Delete successful' : 'Delete failed';
}
