import {Prisma, PrismaClient} from "@prisma/client";

const prisma = new PrismaClient()
type SignUpBody = {
    name: string,
    email: string,
    password: string,
    picture: string
}
export const getUserService = async (email: string | Prisma.StringFilter<"User"> | undefined) => {
    const user = await prisma.user.findFirst({
        where: {
            email: email
        }
    })
    console.log(user)
    return user
}


export const signupHandler = async (user: SignUpBody) => {
    const userCreate = await prisma.user.create({
        data: {
            name: user.name,
            email: user.email,
            password: user.password,
            picture: user.picture
        }
    })
    console.log(userCreate)

}


export const userProfileService = async (token : string) => {
    const user = await prisma.user.findFirst({
        where : {
            email : token
        }
    })
    if(user === null ){
        return { result : "Fail" }
    } else {
        return {
            result : "Success",
            name : user.name,
            email : user.email,
            id : user.id,
            picture : user.picture
        }
    }

}