"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sqlite3_1 = __importDefault(require("sqlite3"));
const sqlite = sqlite3_1.default.verbose();
const createConnection = () => {
    const db = new sqlite.Database("./user.db", (error) => {
        if (error) {
            return console.log(error.message);
        }
    });
    console.log("Connection Established");
    return db;
};
