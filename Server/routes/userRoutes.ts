import {Request, Response, Router} from 'express'
import { Prisma, PrismaClient } from '@prisma/client';
import {getUserHandler, signupHandler} from "../services/authServices";

const app = Router()
const prisma = new PrismaClient()

type GetUser = {
    email: string
}
type SignUpBody = {
    name: string,
    email: string,
    password: string,
    picture: string
}
type UserResponse = {
    result: "Success" | "Fail",
    name?: string,
    email?: string,
    picture?: string | null,
    id?: string
}

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get("/login", (req: Request, res: Response) => {
    res.send("Login")
})

app.post("/login", (req: Request, res: Response) => {
    console.log(req.body)
    res.sendStatus(200)
})



app.post("/signup", (req: Request, res: Response) => {

    const reqBody = req.body
    console.log(reqBody)
    signupHandler(reqBody).then(() => {
        console.log("User Created")
        res.sendStatus(200)
    }).catch(err => {
        console.log(err)
        res.sendStatus(500)
    })
})


app.get("/user", (req: Request, res: Response) => {
    const query = req.query
    const password = query.password
    getUserHandler(query.email?.toString()).then((user) => {
        if (user !== null) {

            if(user.password !== password){
                res.send({
                    result : "Fail",
                })
                return
            }


            const response: UserResponse = {
                result: "Success",
                name: user.name,
                email: user.email,
                picture: user.picture,
                id: user.id.toString()
            }
            res.send(response)
        } else {
            res.send({
                result: "Fail"
            })
        }
    }).catch(err => {
        console.log(err)
        res.sendStatus(500)
    })

})

export default app