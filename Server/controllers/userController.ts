import { Response, Request } from 'express'
import {getUserService, signupHandler} from "../services/authServices";


type UserResponse = {
    result: "Success" | "Fail",
    name?: string,
    email?: string,
    picture?: string | null,
    id?: string
}


export const signUp = (req: Request, res: Response) => {

    // Get User Details
    const reqBody = req.body
    console.log(reqBody)

    // Make request to DB to store User
    signupHandler(reqBody).then(() => {
        console.log("User Created")
        res.send({ result : "Success" })
    }).catch(err => {
        console.log(err)
        res.send({ result : "Failure"})
    })
}


export const getUser = (req: Request, res: Response) => {

    // Get User credentials from Request
    const query = req.query
    const password = query.password

    // Make request to DB to check if user credentials are valid
    getUserService(query.email?.toString()).then((user) => {
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

}


