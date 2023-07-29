
import {SyntheticEvent, useState} from 'react'
import {Alert, Snackbar} from "@mui/material";


type Signup = {
    name : string,
    password : string,
    email : string,
    picture : ""
}

export const SignUpBox = () => {


    const [email, setEmail] = useState("")
    const [Password, setPassword] = useState("")
    const [username, setName] = useState("")
    const [open, setOpen] = useState(false);
    const [errorOpen, setErrorOpen] = useState(false)

    // HANDLE SNACKBAR SUCCESS
    const handleClick = () => {
        setOpen(true);
    };
    const handleClose = (_event: SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    // HANDLE SNACKBAR FAILURE
    const handleErrorClick = () => {
        setErrorOpen(true);
    };
    const handleErrorClose = (_event: SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setErrorOpen(false);
    };

    // Handle SignUp Request
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
            if(data.result === "Success"){
                handleClick()
            }  else {
                handleErrorClick()
            }
        })
    }

    return (
        <div className='flex flex-col w-96 mx-auto gap-6 items-center text-xl' >
            <input value={username} onChange={(e) => setName(e.target.value)} style={{ width: "321px" }} className='rounded-lg p-2 text-black  outline-none border-2 focus:border-blue-400 border-slate-300 ' placeholder='Enter Name' ></input>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} style={{ width: "321px" }} className='rounded-lg p-2 text-black  outline-none border-2 focus:border-blue-400 border-slate-300 ' placeholder='Enter Mail' ></input>
            <input type="password" value={Password} onChange={(e) => setPassword(e.target.value)} style={{ width: "321px" }} className='rounded-lg p-2 text-black  outline-none border-2 focus:border-blue-400 border-slate-300 ' placeholder='Password' ></input>
            <button onClick={handleSignup} className='font-semibold w-24 bg-blue text-black p-2 rounded-lg bg-cya hover:bg-cyan-500 active:opacity-90  ' >Submit</button>
            <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    Successful Sign Up
                </Alert>
            </ Snackbar>
            <Snackbar open={errorOpen} autoHideDuration={3000} onClose={handleErrorClose}>
                <Alert onClose={handleErrorClose} severity="error" sx={{ width: '100%' }}>
                    Signup Failed ( Check if email already exits. )
                </Alert>
            </ Snackbar>
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