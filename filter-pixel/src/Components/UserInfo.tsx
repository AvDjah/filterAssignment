import {useContext, useEffect, useState} from "react";
import Dummy from '../assets/download.png'
import {LoginContext} from "../App.tsx";

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

    const [profile, setProfile] = useState<Profile>()
    const loginContext = useContext(LoginContext)

    console.log(profile)

    useEffect(() => {
        if (props.loginType === "Plain") {
            console.log("Plain Banner")
            fetch(`http://localhost:3000/getProfile?` + new URLSearchParams({
                email: props.access_token
            })).then(async (res) => {
                const resultJson: ProfileJsonResult = await res.json()
                console.log("getUser: ", resultJson)
                if (resultJson.result === "Fail") {
                    return
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
                    // console.log(res)
                    return res.json()
                }
            ).then((res: Profile) => {
                setProfile({
                    email: res.email,
                    id: res.id,
                    name: res.name,
                    picture: res.picture
                })
                // console.log(res)
            }).catch(err => {
                // console.log("Possible Token Expire")
                console.log(err)
            })
        }
    }, [props.access_token, props.loginType])


    const handleLogout = () => {
        if (loginContext.setToken !== null) {
            loginContext.setToken(null)
        }
    }


    if (props.loginType === "Google") {


        return (
            <div className='flex flex-row items-center gap-3'>
                <span>{profile?.name}</span>
                <img className='rounded-full h-12' src={Dummy} alt='No Images  '></img>
                <span onClick={handleLogout} className=" cursor-pointer bg-white text-black p-4 m-2 rounded-lg active:opacity-80">Logout</span>
            </div>
        )
    }

    return (
        <div className='flex flex-row items-center gap-3'>
            <span>{profile?.name}</span>
            <img className='rounded-full h-12' src={Dummy} alt='No Imagses'></img>
            <span onClick={handleLogout} className="cursor-pointer bg-white text-black p-4 m-2 rounded-lg active:opacity-80">Logout</span>
        </div>
    )


}

