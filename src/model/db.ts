import * as mysql from 'mysql';

let con = mysql.createConnection({
  host: 'localhost',
  user: 'tim',
  password: 'tim',
  database: 'tim'
});

function find(query, params, cb): void {
  con.query(query, params, function(err, rows) {
    if (err) throw new Error();
    else cb(rows.length < 1 ? null : rows[0]);
    });
}

function findAll(query, params, cb): void {
  con.query(query, params, function(err, rows) {
    if (err) throw new Error();
    else cb(rows)
  });
}

function insert(table: String, data, cb): void {
  con.query("INSERT INTO " + table + " SET ?", data, (err, result, fields) => {
    if (err) throw new Error();
    else cb(result.insertId);
  });
}

export { find, findAll, insert };
