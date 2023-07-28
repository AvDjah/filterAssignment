import { useContext, useEffect, useState } from "react"
import { S3Photos } from "../Components/S3TabComponent.tsx"
import { DrivePage } from "../Components/DriveTabComponent.tsx"
import { LoginContext } from "../App.tsx"
import { useNavigate } from "react-router-dom"



export const PaginatedPhotos = (props: { selectedTab: number }) => {

    

    return (
        <div>
            {props.selectedTab === 0 ?
                <S3Photos />
                : <DrivePage />
            }
        </div>
    )


}




export const PhotosPage = () => {


    const navigate = useNavigate()
    const loginContext = useContext(LoginContext)

    useEffect(()=>{
        console.log(loginContext)
        if(loginContext.info === null || loginContext.info?.accessToken === null){
            navigate("/login")
        } else {
            console.log("LoggedIn: ", loginContext)
        }
    })

    const [activeTab, setActiveTab] = useState(0)

    const handleTabChange = (val: number) => {
        setActiveTab(val)
    }


    var arr: string[] = ["@3", "#1", "!3", "323", "@31", "@3", "#1", "!3", "323", "@31", "@3", "#1", "!3", "323", "@31", "@3", "#1", "!3", "323", "@31"]
    arr = arr.concat(arr)

    return (
        <div className="flex flex-col items-center">
            <div>
                <span onClick={() => handleTabChange(0)} className={(activeTab === 0 ? "bg-white text-black " : "text-white ") + " p-4 text-xl w-tab inline-block rounded-t-full text-center cursor-pointer border-b-2 border-white"}  >S3</span>
                <span onClick={() => handleTabChange(1)} className={(activeTab === 1 ? "bg-white text-black " : "text-white ") + " p-4 text-xl w-tab inline-block rounded-t-full text-center cursor-pointer border-b-2 border-white"}  >Google Drive</span></div>
            <div className="border-2 p-6 m-2" style={{ width: "1000px" }} >
                <PaginatedPhotos selectedTab={activeTab} />
            </div>
        </div>
    )
}