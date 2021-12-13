require('dotenv').config();
const express = require("express");
const app = express();

app.listen(3002, function() {
    console.log("Server is listening on port 3002. Ready to accept requests!");
});

const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'cyf_ecommerce',
    password: 'process.env.SECRETPASSWORD',
    port: 5432
});

app.get("/customers", function(req, res) {
    pool.query('SELECT * FROM customers', (error, result) => {
        res.json(result.rows);
    });
});

app.get("/suppliers", function(req, res) {
    pool
    .query("SELECT * FROM suppliers")
    .then((result) => res.json(result.rows))
    .catch((e) => console.error(e));
});

app.get("/products", function(req, res) {
    pool
    .query(`SELECT p.product_name, pa.unit_price, s.supplier_name  
        FROM products p
        INNER JOIN product_availability pa ON pa.prod_id = p.id
        INNER JOIN suppliers s ON s.id = pa.supp_id;`)
    .then((result) => res.json(result.rows))
    .catch((e) => console.error(e));
});

