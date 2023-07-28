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
exports.run = exports.s3Client = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
const express_1 = require("express");
const region = "ap-south-1";
const app = (0, express_1.Router)();
exports.s3Client = new client_s3_1.S3Client({
    region: region,
    signer: {
        sign: (req) => __awaiter(void 0, void 0, void 0, function* () { return req; })
    },
});
const run = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield exports.s3Client.send(new client_s3_1.ListObjectsCommand({
            Bucket: "testbucketfp"
        }));
        // console.log("Success: ", data)
        return data;
    }
    catch (err) {
        console.log(1, err);
    }
});
exports.run = run;
app.get("/datainfo", (req, res) => {
    const name = req.query.name;
    console.log("Name");
    exports.s3Client.send(new client_s3_1.GetObjectCommand({
        Bucket: "testbucketfp",
        Key: name === null || name === void 0 ? void 0 : name.toString()
    })).then(data => {
        console.log(data);
        res.send(200);
    }).catch(e => console.log(e));
});
app.get("/data", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const q = req.query;
    let query;
    if (q.offset !== undefined && q.limit !== undefined) {
        query = {
            offset: Number(q.offset),
            limit: Number(q.limit)
        };
    }
    else {
        res.sendStatus(429);
        return;
    }
    console.log(query);
    const data = yield (0, exports.run)();
    const photos = [];
    if ((data === null || data === void 0 ? void 0 : data.Contents) === undefined) {
        res.sendStatus(500);
    }
    else {
        // console.log(data.Contents)
        for (let i = query.offset; i <= Math.min(query.offset + query.limit - 1, data.Contents.length - 1); i++) {
            if (data.Contents[i] !== undefined) {
                if (data.Contents[i].ETag != undefined) {
                    photos.push(data.Contents[i].Key);
                }
            }
        }
        console.log(photos);
        res.send(photos);
    }
}));
exports.default = app;
