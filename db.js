import sqlite3 from "sqlite3";
import { hashPassword } from "./helper/validation.js";
const sqlite = sqlite3.verbose();
const DBSOURCE = "db.sqlite"

let db = new sqlite.Database(DBSOURCE, (err) => {
    if (err) {
        // Cannot open database
        console.error(err.message)
        throw err
    } else {
        console.log('Connected to the SQLite database.')
        const queryDBRole = `CREATE TABLE role (id INTEGER PRIMARY KEY AUTOINCREMENT, role text)`;
        const queryDBUser = `CREATE TABLE user (id INTEGER PRIMARY KEY AUTOINCREMENT,role_id INTEGER, username text, name text, email text UNIQUE, password text, CONSTRAINT email_unique UNIQUE (email))`;
        db.run(queryDBRole, (err) => {
            if (err) {
                // Table already created'
                console.log("Table Role already created")
            } else {
                // Table just created, creating some rows
                const insert = 'INSERT INTO role (role) VALUES (?)'
                db.run(insert, ["admin"])
                db.run(insert, ["user"])
            }
        });
        db.run(queryDBUser, (err) => {
            if (err) {
                // Table already created'
                console.log("Table User already created")
            } else {
                // Table just created, creating some rows
                const insert = 'INSERT INTO user (role_id, username,name, email, password) VALUES (?,?,?,?,?)'
                db.run(insert, [1, "admin", "admin", "admin@example.com", hashPassword("admin112233")])
                db.run(insert, [2, "user", "user", "user@example.com", hashPassword("user112233")])
            }
        });
    }
});


export default db
