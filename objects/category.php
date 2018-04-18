<?php

class Category {
    // database connection and table name
    private $conn;
    private $table_name = 'categories';

    // object properties
    public $id;
    public $name;
    public $description;
    public $timestamp;

    public function __construct($db) {
        $this->conn = $db;
    }

    // Read all categories function
    public function readALL() {
        // select all data
        $query = "SELECT * FROM " . $this->table_name . "
        ORDER BY id ASC";

        $stmt = $this->conn->prepare($query);
        $stmt->execute();

        $results = $stmt->fetchAll(PDO::FETCH_ASSOC);

        return json_encode($results);
    }
}