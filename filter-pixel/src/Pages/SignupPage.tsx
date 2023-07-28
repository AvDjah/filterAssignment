
import { LoginContext } from '../App.tsx'
import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'


type Signup = {
    name : string,
    password : string,
    email : string,
    picture : ""
}

export const SignUpBox = () => {

    useContext(LoginContext);

    const [email, setEmail] = useState("")
    const [Password, setPassword] = useState("")
    const [username, setName] = useState("")


    useNavigate();

    const handleSignup = () => {
        if(username.length === 0 || Password.length === 0 || username.length === 0){
            alert("Please Fill properly")
            return
        }

        const signUpCredentials : Signup = {
            name : username,
            password : Password,
            email : email,
            picture : ""
        }

        fetch("http://localhost:3000/signup", {
            method : "POST",
            body : JSON.stringify(signUpCredentials),
            headers : {
                "Content-type": "application/json",
            }
        }).then(async  res => {
            const data = await res.json()
            console.log(data)
        })
    }

    return (
        <div className='flex flex-col w-96 mx-auto gap-6 items-center text-xl' >
            <input value={username} onChange={(e) => setName(e.target.value)} style={{ width: "321px" }} className='rounded-lg p-2 text-black  outline-none border-2 focus:border-blue-400 border-slate-300 ' placeholder='Enter Name' ></input>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} style={{ width: "321px" }} className='rounded-lg p-2 text-black  outline-none border-2 focus:border-blue-400 border-slate-300 ' placeholder='Enter Mail' ></input>
            <input value={Password} onChange={(e) => setPassword(e.target.value)} style={{ width: "321px" }} className='rounded-lg p-2 text-black  outline-none border-2 focus:border-blue-400 border-slate-300 ' placeholder='Password' ></input>
            <button onClick={handleSignup} className='font-semibold w-24 bg-blue text-black p-2 rounded-lg bg-cya hover:bg-cyan-500 active:opacity-90  ' >Submit</button>
        </div>
    )
}


export const SignupPage = () => {

    return (
        <>
            <div className='md:h-60' ></div>
            <SignUpBox></SignUpBox>
        </>
    )
}