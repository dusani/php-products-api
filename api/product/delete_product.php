<?php
// if the form was submitted
if ($_POST) {
    // include core configuration
    include_once('../../config/core.php');

    // include database connection
    include_once('../../config/database.php');

    // product object
    include_once('../../objects/product.php');

    // class instance
    $database = new Database();
    $db = $database->getConnection();

    $product = new Product($db);

    $id = $_POST['del_id'];

    echo $product->delete($id) ? 'true' : 'false';
}
