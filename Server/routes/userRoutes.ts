import {Request, Response, Router} from 'express'
import {getUser, getUserProfile, signUp} from '../controllers/userController'


const app = Router()


app.post("/signup",signUp)
app.get("/login",getUser )
app.get("/getProfile",getUserProfile)


export default app
