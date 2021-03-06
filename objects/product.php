<?php

class Product
{
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

    public function __construct($db)
    {
        $this->conn = $db;
    }


    // Create product function
    public function create()
    {
        try {
            // insert query
            $query = "INSERT INTO products
                SET name=:name,
                    description=:description,
                    price=:price,
                    category_id=:category_id,
                    created=:created";

            // prepare statement
            $stmt = $this->conn->prepare($query);

            // sanitize
            $name = htmlspecialchars(strip_tags($this->name));
            $price = htmlspecialchars(strip_tags($this->price));
            $description = htmlspecialchars(strip_tags($this->description));
            $category_id = htmlspecialchars(strip_tags($this->category_id));

            // bind the parameters
            $stmt->bindParam(':name', $name);
            $stmt->bindParam(':price', $price);
            $stmt->bindParam(':description', $description);
            $stmt->bindParam(':category_id', $category_id);

            // we need the created variable to know when the record was created
            // also, to comply with strict standards: only variables should be passed
            // by reference
            $created = date('Y-m-d H:i:s');
            $stmt->bindParam(':created', $created);

            // execute the query
            if ($stmt->execute()) {
                return true;
            } else {
                return false;
            }
        } // Show error if any
        catch (PDOException $exception) {
            die('ERROR: ' . $exception->getMessage());
        }
    }

    // Return all products function
    public function readAll()
    {
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

    // Return one product function
    public function readOne()
    {

        // select the data
        $query = "SELECT p.id, p.name, p.description, p.price, c.name as category_name
            FROM " . $this->table_name . " p
            LEFT JOIN categories c
            ON p.category_id = c.id
            WHERE p.id = :id";

        // prepare the query for execution
        $stmt = $this->conn->prepare($query);

        $id = htmlspecialchars(strip_tags($this->id));
        $stmt->bindParam(':id', $id);

        $stmt->execute();

        $results = $stmt->fetchAll(PDO::FETCH_ASSOC);

        return json_encode($results);
    }

    // Update product function
    public function update($id)
    {

        // update product based on id
        $query = "UPDATE {$this->table_name}
                    SET name=:name,
                        description=:description,
                        price=:price,
                        category_id=:category_id
                    WHERE id=:id";

        // prepare statement
        $stmt = $this->conn->prepare($query);

        // sanitize
        $name = htmlspecialchars(strip_tags($this->name));
        $price = htmlspecialchars(strip_tags($this->price));
        $description = htmlspecialchars(strip_tags($this->description));
        $category_id = htmlspecialchars(strip_tags($this->category_id));
        $id = htmlspecialchars(strip_tags($this->id));

        // bind the parameters
        $stmt->bindParam(':name', $name);
        $stmt->bindParam(':price', $price);
        $stmt->bindParam(':description', $description);
        $stmt->bindParam(':category_id', $category_id);
        $stmt->bindParam(':id', $id);

        // execute the query
        if ($stmt->execute()) {
            return true;
        } else {
            return false;
        }
    }

    // delete product function
    public function delete($id)
    {

        // query to delete a record from the db
        $query = "DELETE FROM products WHERE id=:id";

        $stmt = $this->conn->prepare($query);

        // sanitize
        $id = htmlspecialchars(strip_tags($id));

        // bind the parameter
        $stmt->bindParam(':id', $id);

        // execute
        $stmt->execute() ? true : false;
    }
}
