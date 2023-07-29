"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const app = (0, express_1.Router)();
app.post("/signup", userController_1.signUp);
app.get("/login", userController_1.getUser);
exports.default = app;
