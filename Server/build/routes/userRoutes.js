"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const client_1 = require("@prisma/client");
const authServices_1 = require("../services/authServices");
const app = (0, express_1.Router)();
const prisma = new client_1.PrismaClient();
app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.get("/login", (req, res) => {
    res.send("Login");
});
app.post("/login", (req, res) => {
    console.log(req.body);
    res.sendStatus(200);
});
app.post("/signup", (req, res) => {
    const reqBody = req.body;
    console.log(reqBody);
    (0, authServices_1.signupHandler)(reqBody).then(() => {
        console.log("User Created");
        res.sendStatus(200);
    }).catch(err => {
        console.log(err);
        res.sendStatus(500);
    });
});
app.get("/user", (req, res) => {
    var _a;
    const query = req.query;
    const password = query.password;
    (0, authServices_1.getUserHandler)((_a = query.email) === null || _a === void 0 ? void 0 : _a.toString()).then((user) => {
        if (user !== null) {
            if (user.password !== password) {
                res.send({
                    result: "Fail",
                });
                return;
            }
            const response = {
                result: "Success",
                name: user.name,
                email: user.email,
                picture: user.picture,
                id: user.id.toString()
            };
            res.send(response);
        }
        else {
            res.send({
                result: "Fail"
            });
        }
    }).catch(err => {
        console.log(err);
        res.sendStatus(500);
    });
});
exports.default = app;
