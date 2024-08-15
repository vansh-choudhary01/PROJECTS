const express = require("express");
const path = require("path");
const {faker} = require('@faker-js/faker');
const mysql = require('mysql2/promise');
const methodOverride = require('method-override');
const {v4 : uuid} = require('uuid');
const app = express();
const port = 8080;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(express.static(path.join(__dirname, "/public")));
app.use(express.urlencoded({extended : true}));
app.use(express.json());
app.use(methodOverride('_method'));

let db = async (q) => {return await database(q);};

async function logdata(q) {
    try {
        const result = await db(q);
        return result;
    } catch(e) {
        console.log(e);
    }
}

app.get("/", (req, res) => {
    let q = "SELECT COUNT(id) AS count FROM user";
    
    let cons = async () => {
        let data = await logdata(q);
        res.render("index", {data});
    }
    cons();
})

let user = {
    id : "124",
    name : "Vansh",
    email : "vansh@gmail.com",
    password : "vansh@123"
};

app.get("/user", (req, res) => {
    let q = "SELECT * FROM user";
    let cons = async () => {
        let users = await logdata(q);
        res.render("show", {users});
    }
    cons();
})

let add = "";
app.get("/user/edit/:id", (req, res) => {
    let {id} = req.params;
    let q = `SELECT * FROM user WHERE id = "${id}"`;
    let cons = async () => {
        let user = await logdata(q);
        user = user[0];
        res.render("edit", {user, add});
        add = "";
    }
    cons();
})

app.patch("/user/:id", (req, res) => {
    let {id} = req.params;
    let data = req.body;
    let q;
    console.log(data);
    if(!data.pass) {
        add = "notAdd";
        res.redirect(`/user/edit/${id}`);
    } else {
        if(data.password) {
            q = `UPDATE user SET name = "${data.name}", password = "${data.password}" WHERE id = "${id}" AND password = "${data.pass}"`;
        } else {
            q = `UPDATE user SET name = "${data.name}" WHERE id = "${id}" AND password = "${data.pass}"`;
        }
        let cons = async () => {
            let user = await logdata(q);
            console.log(user);
            if(user.affectedRows > 0) {
                res.redirect("/user");
            } else {
                add = "notAdd";
                res.redirect(`/user/edit/${id}`);
            }
        }
        cons();
    }
})

app.get("/user/sign", (req, res) => {
    res.render("add", {add});
})

app.post("/user", (req, res) => {
    let data = req.body;
    let q = `INSERT INTO user VALUES ("${uuid()}", "${data.name}", "${data.email}", "${data.email}")`;
    let cons = async () => {
        let user = await logdata(q);
        if(user) {
            add = "add";
        } else {
            add = "notAdd";
        }
        res.render("add", {add});
        add = "";
    }
    cons();
})

app.delete("/user/:id", (req, res) => {
    let {id} = req.params;
    let data = req.body;
    let q = `DELETE FROM user WHERE id = "${id}" AND password = "${data.pass}"`;
    if(data.pass.length < 1) {
        add = "notAdd";
        res.redirect(`/user/edit/${id}`);
    } else {
        let cons = async () => {
            let user = await logdata(q);
            if(user["affectedRows"] > 0) {
                res.redirect("/user");
            } else {
                add = "notAdd";
                res.redirect(`/user/edit/${id}`);
            }
        }
        cons();
    }
})


// let generateFaker = async () => {
//     for(let i = 1; i <= 83; i++) {
//         let arr = await randomUser();
//         let q = `INSERT INTO user (id, name, email, password) VALUES ("${arr[0]}", "${arr[1]}", "${arr[2]}", "${arr[3]}")`;
//         await logdata(q);
//     }
// }

// generateFaker();

// function randomUser() {
//     return [
//         uuid(),
//         faker.internet.userName(),
//         faker.internet.email(),
//         faker.internet.password()
//     ];
// }

async function database(query, arr) {
    const connection = await mysql.createConnection({
        host : 'localhost',
        user : 'root',
        database : 'delta_app',
        password : 'choudhary21*'
    });
  
    try {
        if(arr) {
            const [rows, fields] = await connection.execute(query, [arr]);
            await connection.end();
            return rows;
        } else {
            const [rows, fields] = await connection.execute(query);
            await connection.end();
            console.log(rows);
            return rows;
        }
        
    } catch(e) {
        console.log(e);
    }
  }

app.listen(port);