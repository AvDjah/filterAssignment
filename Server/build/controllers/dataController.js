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
exports.getIndividualItemInfo = exports.getDataList = exports.getItemListFromBucket = exports.s3Client = exports.getDriveList = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
const dataService_1 = require("../services/dataService");
const region = "ap-south-1";
const getDriveList = (req, res) => {
    (0, dataService_1.driveService)().then(result => {
        console.log(result);
        res.send(result);
    }).catch(e => {
        console.log(e);
        res.send(500);
    });
};
exports.getDriveList = getDriveList;
// Initializing S3 Client
exports.s3Client = new client_s3_1.S3Client({
    region: region,
    signer: {
        sign: (req) => __awaiter(void 0, void 0, void 0, function* () { return req; })
    },
});
const getItemListFromBucket = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // console.log("Success: ", data)
        return yield exports.s3Client.send(new client_s3_1.ListObjectsCommand({
            Bucket: "testbucketfp"
        }));
    }
    catch (err) {
        console.log(1, err);
    }
});
exports.getItemListFromBucket = getItemListFromBucket;
const getDataList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Get the amount of data required
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
    // Get the data from the Bucket
    const data = yield (0, exports.getItemListFromBucket)();
    // Store the required Keys from the Bucket
    const photos = [];
    if ((data === null || data === void 0 ? void 0 : data.Contents) === undefined) {
        res.sendStatus(500);
    }
    else {
        for (let i = query.offset; i <= Math.min(query.offset + query.limit - 1, data.Contents.length - 1); i++) {
            if (data.Contents[i] !== undefined) {
                if (data.Contents[i].ETag != undefined) {
                    photos.push(data.Contents[i].Key);
                }
            }
        }
        res.send(photos);
    }
});
exports.getDataList = getDataList;
const getIndividualItemInfo = (req, res) => {
    // Get Key of Data Item
    const name = req.query.name;
    // Send Request to bucket to get Item Details
    exports.s3Client.send(new client_s3_1.GetObjectCommand({
        Bucket: "testbucketfp",
        Key: name === null || name === void 0 ? void 0 : name.toString()
    })).then(data => {
        console.log(data);
        res.send(200);
    }).catch(e => console.log(e));
};
exports.getIndividualItemInfo = getIndividualItemInfo;
