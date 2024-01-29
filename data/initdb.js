const { Client } = require("pg");
const fs = require('fs');

async function initdb() {

const client = new Client('postgresql://postgres:random@localhost/Todolist');

await client.connect();

const sqlFileContent = fs.readFileSync('./create_tables.sql', 'utf8');
const result = await client.query(sqlFileContent)

// const result = await client.query('RELOAD;');

await client.end();

console.log(result.rows);

;}

console.log("read done");
initdb();

