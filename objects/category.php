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
        $query = "SELECT * FROM {$this->table_name} ORDER BY id ASC";

        // prepare the query for execution
        $stmt = $this->conn->prepare($query);

        // execute
        $stmt->execute();

        $results = $stmt->fetchAll(PDO::FETCH_ASSOC);

        return json_encode($results);
    }

    // Read one category function
    public function readOne($id) {
        // select the data
        $query = "SELECT * FROM {$this->table_name} WHERE id=:id";

        // prepare the query for execution
        $stmt = $this->conn->prepare($query);

        // sanitize
        $id = htmlspecialchars(strip_tags($id));

        // bind the parameter
        $stmt->bindParam(':id', $id);

        // execute
        $stmt->execute();

        $results = $stmt->fetchAll(PDO::FETCH_ASSOC);

        return json_encode($results);
    }
}