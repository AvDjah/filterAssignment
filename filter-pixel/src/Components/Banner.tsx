import { useContext } from "react"
import { LoginContext } from "../App.tsx"
import Logo from "../assets/filterpixelLogo.png"
import { UserInfo } from "../Pages/LoginPage.tsx"
import {useNavigate} from "react-router-dom";





export const Banner = (props : { isLoginPage : boolean}) => {

    const loginContext = useContext(LoginContext)
    const navigate = useNavigate()

    const handleNavigate = () => {
        if(props.isLoginPage){
            navigate("/signup")
        } else {
            navigate("/login")
        }
    }

    return (
        <div className="flex flex-row justify-between m-4 p-2" >
            <div className='flex flex-row items-center' ><img src={Logo} ></img><span className='mx-2 px-2 text-3xl' >FilterPixel</span>

            </div>
            {loginContext.info?.accessToken && loginContext.info.loginType ? <UserInfo loginType={loginContext.info.loginType} access_token={loginContext.info.accessToken}  /> :
                <button onClick={handleNavigate}  className='bg-white text-black hover:bg-gray-300 px-4 rounded-md font-semibold' >{props.isLoginPage ? "Sign Up": "Already have account?"}</button>
            }
        </div>
    )
}