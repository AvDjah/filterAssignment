import GoogleLogo from '../assets/google.png'
import { useGoogleLogin } from '@react-oauth/google'
import { LoginContext } from '../App.tsx'
import { useContext, useEffect, useState } from 'react'
import Dummy from '../assets/download.png'
import { useNavigate } from 'react-router-dom'





type Profile = {
    email: string,
    id: string,
    name: string,
    picture: string
}

interface ProfileJsonResult extends Profile {
    result: "Fail" | "Success"
}

export const UserInfo = (props: { access_token: string, loginType: "Google" | "Plain" }) => {

    useEffect(() => {
        if (props.loginType === "Plain") {
            console.log("Plain Banner")
            fetch(`http://localhost:3000/user?` + new URLSearchParams({
                email: props.access_token
            })).then(async (res) => {
                const resultJson: ProfileJsonResult = await res.json()
                console.log("getUser: ", resultJson)
                if (resultJson.result === "Fail") {
                    alert("Wrong ID or Password")
                } else {
                    setProfile({
                        email: resultJson.email,
                        id: resultJson.id,
                        name: resultJson.name,
                        picture: "./assets/download.png"
                    })
                }
            }).catch(e => console.log(e))

        } else {
            fetch(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${props.access_token}`).then(
                res => {
                    console.log(res)
                    return res.json()
                }
            ).then((res: Profile) => {
                setProfile({
                    email: res.email,
                    id: res.id,
                    name: res.name,
                    picture: res.picture
                })
                console.log(res)
            }).catch(err => {
                console.log("Possible Token Expire")
                console.log(err)
            })
        }
    }, [])

    const [profile, setProfile] = useState<Profile>()

    if (props.loginType === "Google") {


        return (
            <div className='flex flex-row items-center gap-3' >
                <span>{profile?.name}</span>
                <img className='rounded-full h-12' src={Dummy} alt='No Images  ' ></img>
            </div>
        )
    }

    return (
        <div className='flex flex-row items-center gap-3' >
            <span>{profile?.name}</span>
            <img className='rounded-full h-12' src={Dummy} alt='No Imagses' ></img>
        </div>
    )



}









export const LoginBox = () => {

    const loginContext = useContext(LoginContext)

    const [username, setUsername] = useState("")
    const [Password, setPassword] = useState("")

    const navigate = useNavigate()



    const login = useGoogleLogin({
        onSuccess: response => {

            console.log(response)

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
            console.log("No Login")
        }
    }, [loginContext.info, loginContext.info?.accessToken, navigate]);



    const handlePlainLogin = () => {
        fetch(`http://localhost:3000/user?` + new URLSearchParams({
            email: username,
            password : Password
        })).then(async (res) => {
            const resultJson = await res.json()
            console.log("getUser: ", resultJson)
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
            <input value={username} onChange={(e) => setUsername(e.target.value)} style={{ width: "321px" }} className='rounded-lg p-2 text-black  outline-none border-2 focus:border-blue-400 border-slate-300 ' placeholder='Username' ></input>
            <input value={Password} onChange={(e) => setPassword(e.target.value)} style={{ width: "321px" }} className='rounded-lg p-2 text-black  outline-none border-2 focus:border-blue-400 border-slate-300 ' placeholder='Password' ></input>
            <button onClick={handlePlainLogin} className='font-semibold w-24 bg-blue text-black p-2 rounded-lg bg-cya hover:bg-cyan-500 active:opacity-90  ' >Submit</button>
        </div>
    )
}


export const LoginPage = () => {



    return (
        <> {
            console.log(import.meta.env)
        }
            <div className='md:h-60' ></div>
            <LoginBox></LoginBox>
        </>
    )
}