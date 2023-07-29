import GoogleLogo from '../assets/google.png'
import { useGoogleLogin } from '@react-oauth/google'
import { LoginContext } from '../App.tsx'
import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'



export const LoginBox = () => {

    const loginContext = useContext(LoginContext)

    const [username, setUsername] = useState("")
    const [Password, setPassword] = useState("")

    const navigate = useNavigate()



    const login = useGoogleLogin({
        onSuccess: response => {

            // console.log(response)

            if (loginContext.setToken !== null) {
                loginContext.setToken({
                    accessToken: response.access_token,
                    loginType: "Google"
                })
            }
            navigate("/")
        }
    })

    useEffect(() => {
        if(loginContext.info?.accessToken !== null && loginContext.info !== null){
            navigate("/")
        } else {
            // console.log("No Login")
        }
    }, [loginContext.info, loginContext.info?.accessToken, navigate]);



    const handlePlainLogin = () => {
        fetch(`http://localhost:3000/login?` + new URLSearchParams({
            email: username,
            password : Password
        })).then(async (res) => {
            const resultJson = await res.json()
            // console.log("getUser: ", resultJson)
            if (resultJson.result === "Fail") {
                alert("Wrong ID or Password")
                return
            } else {
                if (loginContext.setToken !== null) {
                    loginContext.setToken({
                        accessToken: username,
                        loginType: "Plain"
                    })
                }
            }
        }
        ).catch(e => console.log(e))
    }

    return (
        <div className='flex flex-col w-96 mx-auto gap-6 items-center text-xl' >
            <button className='bg-orange px-4 py-2 rounded-md active:opacity-90' style={{ width: "321px" }}  >
                <img className='inline-block h-6' src={GoogleLogo} ></img><
                    span className='mx-2' onClick={() => login()} >Login with google</span>
            </button>
            <div className='flex flex-row items-center' ><hr className='w-24' /><span className='px-2' >OR</span><hr className='w-24' /></div>
            <input  type="email" value={username} onChange={(e) => setUsername(e.target.value)} style={{ width: "321px" }} className='rounded-lg p-2 text-black  outline-none text-lg  border-2 focus:border-blue-400 border-slate-300 ' placeholder='Username' ></input>
            <input type="password" value={Password} onChange={(e) => setPassword(e.target.value)} style={{ width: "321px" }} className='rounded-lg p-2 text-black  outline-none border-2 focus:border-blue-400 border-slate-300 ' placeholder='Password' ></input>
            <button onClick={handlePlainLogin} className='font-semibold w-24 bg-blue text-black p-2 rounded-lg bg-cya hover:bg-cyan-500 active:opacity-90  ' >Submit</button>
        </div>
    )
}


export const LoginPage = () => {

    return (
        <>
            <div className='md:h-60' ></div>
            <LoginBox></LoginBox>
        </>
    )
}