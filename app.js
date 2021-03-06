const { request } = require('express');
const express = require('express');
const app = express();
const port = 9870;

//connect with pg
const Pool = require('pg').Pool;
const pool = new Pool({
    user:'',
    host:'',
    database:'',
    port:5432
})

app.get('/',(req,res) => {
    pool.query('Select * from customers',(err,result) => {
        if(err) throw err;
        res.send(result.rows)
    })
})

app.post('/add',(req,res) => {
    var fname = req.body.fname;
    var lname = req.body.lname;
    pool.query(`insert into customers(first_name,last_name)  values (${fname},${lname})`,
    (err,result) => {
        if(err) throw err;
        res.send(result)
    })
})

app.listen(port)
