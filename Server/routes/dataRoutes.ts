import {ListObjectsCommand, S3Client} from "@aws-sdk/client-s3";
import {Router} from 'express'
import {getDataList, getDriveList, getIndividualItemInfo} from "../controllers/dataController";

const app = Router()

app.get("/datainfo",getIndividualItemInfo)
app.get("/data", getDataList)

app.get("/drive",getDriveList)

export default app