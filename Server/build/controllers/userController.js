"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUser = exports.signUp = void 0;
const authServices_1 = require("../services/authServices");
const signUp = (req, res) => {
    // Get User Details
    const reqBody = req.body;
    console.log(reqBody);
    // Make request to DB to store User
    (0, authServices_1.signupHandler)(reqBody).then(() => {
        console.log("User Created");
        res.send({ result: "Success" });
    }).catch(err => {
        console.log(err);
        res.send({ result: "Failure" });
    });
};
exports.signUp = signUp;
const getUser = (req, res) => {
    var _a;
    // Get User credentials from Request
    const query = req.query;
    const password = query.password;
    // Make request to DB to check if user credentials are valid
    (0, authServices_1.getUserService)((_a = query.email) === null || _a === void 0 ? void 0 : _a.toString()).then((user) => {
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
};
exports.getUser = getUser;
