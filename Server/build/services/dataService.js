"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.driveService = void 0;
const driveService = () => {
    const folderId = "1_qOJ0z3kI_e2IJq4X6HqF0T1ROBESygS";
    const GOOGLE_API = process.env.GOOGLE_API;
    const { google } = require('googleapis');
    // @ts-ignore
    const drive = google.drive({ version: "v3", auth: GOOGLE_API.toString() });
    let conf = {
        maxResults: 0,
        orderBy: "",
        q: ""
    };
    conf.maxResults = 10;
    conf.orderBy = "createdTime";
    conf.q = `'${folderId}' in parents`;
    return new Promise((resolve, reject) => {
        drive.files.list(conf, function (error, response) {
            if (error) {
                console.log(error);
                reject(error);
            }
            else {
                let files = [];
                response.data.files.map(file => {
                    let fileUrl = 'https://drive.google.com/u/0/uc?id=' + file.id;
                    files.push(fileUrl);
                    console.log('fileUrl ', fileUrl);
                });
                resolve(files);
            }
        });
    });
};
exports.driveService = driveService;
