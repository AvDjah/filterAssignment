import {Request, Response, Router} from 'express'
import { getUser, signUp } from '../controllers/userController'


const app = Router()


app.post("/signup",signUp)
app.get("/login",getUser )

export default app