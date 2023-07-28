import {Prisma, PrismaClient} from "@prisma/client";

const prisma = new PrismaClient()
type SignUpBody = {
    name: string,
    email: string,
    password: string,
    picture: string
}
export const getUserHandler = async (email: string | Prisma.StringFilter<"User"> | undefined) => {
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