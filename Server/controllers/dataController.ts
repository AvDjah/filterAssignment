import {Request, Response} from "express";
import {GetObjectCommand, ListObjectsCommand, S3Client} from "@aws-sdk/client-s3";

type DataRequest = {
    offset: number
    limit: number
}


const region = "ap-south-1"


// Initializing S3 Client
export const s3Client = new S3Client({
    region: region,
    signer: {
        sign: async (req) => req
    },
})

export const getItemListFromBucket = async () => {
    try {
        // console.log("Success: ", data)
        return await s3Client.send(new ListObjectsCommand({
            Bucket: "testbucketfp"
        }))
    } catch (err) {
        console.log(1, err)
    }
}


export const getDataList = async (req: Request, res: Response) => {

    // Get the amount of data required
    const q = req.query
    let query: DataRequest
    if (q.offset !== undefined && q.limit !== undefined) {
        query = {
            offset: Number(q.offset),
            limit: Number(q.limit)
        }
    } else {
        res.sendStatus(429)
        return
    }

    // Get the data from the Bucket
    const data = await getItemListFromBucket()

    // Store the required Keys from the Bucket
    const photos = []
    if (data?.Contents === undefined) {
        res.sendStatus(500)
    } else {

        for (let i = query.offset; i <= Math.min(query.offset + query.limit - 1, data.Contents.length - 1); i++) {
            if (data.Contents[i] !== undefined) {
                if (data.Contents[i].ETag != undefined) {
                    photos.push(data.Contents[i].Key)
                }
            }
        }
        res.send(photos)
    }
}

export const getIndividualItemInfo = (req : Request, res:  Response)=> {
    // Get Key of Data Item
    const name = req.query.name

    // Send Request to bucket to get Item Details
    s3Client.send(new GetObjectCommand({
        Bucket : "testbucketfp",
        Key : name?.toString()
    })).then(data => {
        console.log(data)
        res.send(200)
    }).catch(e => console.log(e))
}