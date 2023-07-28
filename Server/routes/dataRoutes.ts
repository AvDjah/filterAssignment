import {GetObjectCommand, ListObjectsCommand, S3Client} from "@aws-sdk/client-s3";
import {Request, Response, Router} from 'express'

type DataRequest = {
    offset: number
    limit: number
}


const region = "ap-south-1"
const app = Router()
export const s3Client = new S3Client({
    region: region,
    signer: {
        sign: async (req) => req
    },
})

export const run = async () => {
    try {
        const data = await s3Client.send(new ListObjectsCommand({
            Bucket: "testbucketfp"
        }))
        // console.log("Success: ", data)
        return data
    } catch (err) {
        console.log(1, err)
    }
}

app.get("/datainfo",(req : Request, res:  Response)=> {
    const name = req.query.name
    console.log("Name")
    s3Client.send(new GetObjectCommand({
        Bucket : "testbucketfp",
        Key : name?.toString()
    })).then(data => {
        console.log(data)
        res.send(200)
    }).catch(e => console.log(e))
})


app.get("/data", async (req: Request, res: Response) => {

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

    console.log(query)

    const data = await run()
    const photos = []
    if (data?.Contents === undefined) {
        res.sendStatus(500)
    } else {
        // console.log(data.Contents)

        for (let i = query.offset; i <= Math.min(query.offset + query.limit - 1, data.Contents.length - 1); i++) {
            if (data.Contents[i] !== undefined) {
                if (data.Contents[i].ETag != undefined) {
                    photos.push(data.Contents[i].Key)
                }
            }
        }
        console.log(photos)
        res.send(photos)
    }

})

export default app