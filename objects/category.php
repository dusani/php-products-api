<?php

class Category
{
    // database connection and table name
    private $conn;
    private $table_name = 'categories';

    // object properties
    public $id;
    public $name;
    public $description;
    public $timestamp;

    public function __construct($db)
    {
        $this->conn = $db;
    }

    //---- create category function ----//
    public function create()
    {
        try {
            // insert query
            $query = "INSERT INTO {$this->table_name}
                        SET name=:name,
                            description=:description,
                            created=:created";

            // prepare the statement
            $stmt = $this->conn->prepare($query);

            // sanitize
            $name = htmlspecialchars(strip_tags($this->name));
            $description = htmlspecialchars(strip_tags($this->description));

            // bind the parameters
            $stmt->bindParam(':name', $name);
            $stmt->bindParam(':description', $description);

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

            // catch any errors of any
        } catch (PDOException $exception) {
            die("ERROR: {$exception->getMessage()}");
        }
    }

    //---- Read all categories function ----//
    public function readALL()
    {
        // select all data
        $query = "SELECT *
                    FROM {$this->table_name}
                    ORDER BY id ASC";

        // prepare the query for execution
        $stmt = $this->conn->prepare($query);

        // execute
        $stmt->execute();

        $results = $stmt->fetchAll(PDO::FETCH_ASSOC);

        return json_encode($results);
    }

    //---- Read one category function ----//
    public function readOne($id)
    {
        // select the data
        $query = "SELECT *
                    FROM {$this->table_name}
                    WHERE id=:id";

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

    // update category function
    public function update($id)
    {
        // update category based on id
        $query = "UPDATE {$this->table_name}
                    SET name=:name,
                        description=:description
                    WHERE id=:id";
        // prepare the statement
        $stmt = $this->conn->prepare($query);

        // sanitize
        $name = htmlspecialchars(strip_tags($this->name));
        $description = htmlspecialchars(strip_tags($this->description));
        $id = htmlspecialchars(strip_tags($id));

        // bind the parameters
        $stmt->bindParam(':name', $name);
        $stmt->bindParam(':description', $description);
        $stmt->bindParam(':id', $id);

        // execute the query
        if ($stmt->execute()) {
            return true;
        } else {
            return false;
        }
    }
}
