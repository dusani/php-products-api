<?php

class Product{
    // database connection and table name
    private $conn;
    private $table_name = 'products';

    // object properties
    public $id;
    public $name;
    public $price;
    public $description;
    public $category_id;
    public $timestamp;

    public function __construct($db) {
        $this->conn = $db;
    }

    public function readAll() {
        // select all data
        $query = "SELECT p.id, p.name, p.description, p.price, c.name as category_name  
            FROM " . $this->table_name . " p 
            LEFT JOIN categories c
            ON p.category_id = c.id
            ORDER BY id DESC";

        $stmt = $this->conn->prepare($query);
        $stmt->execute();

        $results = $stmt->fetchAll(PDO::FETCH_ASSOC);

        return json_encode($results);
    }

}