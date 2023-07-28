"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.driveFileHandler = void 0;
const googleapis_1 = require("googleapis");
const folderId = '1_qOJ0z3kI_e2IJq4X6HqF0T1ROBESygS';
const apiKey = 'AIzaSyCS8lDqbONWgp7GVBjNsWHXUXoPm8TrAwk';
const credentials = require('./client_secret.json');
const driveFileHandler = (req, res) => {
    const auth = new googleapis_1.google.auth.GoogleAuth({
        credentials,
        scopes: ['https://www.googleapis.com/auth/drive.readonly']
    });
};
exports.driveFileHandler = driveFileHandler;
