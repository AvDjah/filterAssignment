"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserProfile = exports.getUser = exports.signUp = void 0;
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
const getUserProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const query = req.query;
    const token = query.email;
    if (token !== undefined) {
        const profile = yield (0, authServices_1.userProfileService)(token.toString());
        res.send(profile);
    }
    else {
        res.sendStatus(409);
    }
});
exports.getUserProfile = getUserProfile;
