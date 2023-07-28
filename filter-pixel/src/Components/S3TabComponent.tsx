import { useState, useEffect } from "react"
import InfiniteScroll from "react-infinite-scroll-component"



type Photos = {
    description?: string,
    id: number,
    title?: string,
    url: string
}


type PhotoKeys = {
    Key: string
}

export const S3Photos = () => {

    const amazonBase = "https://testbucketfp.s3.ap-south-1.amazonaws.com/"


    const [offset, setOffset] = useState(0)
    const [limit, setLimit] = useState(9)
    const [photos, setPhotos] = useState<string[]>([])


    const fetchKeys = async () => {
        // setOffset(offset + 6)
        console.log("Starting Request")

        const data = await fetch("http://localhost:3000/data?" + new URLSearchParams({
            offset: offset.toString(),
            limit: (photos.length + 6).toString(),
        }))
        const jsonData: string[] = await data.json()

        console.log("Received Data: ", jsonData)

        const transformed = jsonData.map((val,index) => {
            return encodeURIComponent(val)
        })
        console.log("transformed: ", transformed)
        setPhotos(transformed)
    }

    useEffect(()=> {
        fetchKeys()
    },[])



    return (
        <div>
            <InfiniteScroll dataLength={photos.length} hasMore={photos.length <= 14} next={fetchKeys} loader={<h4></h4>}  >
                <div className="grid grid-cols-3 gap-8 justify-items-center items-stretch" >
                    {photos.map((val, index) => {
                        const photoUrl = amazonBase + val
                        // console.log("loaded",index)
                        return <div className="items-center flex" key={index} ><img className="mx-auto items-center transition-all ease-in-out hover:-translate-y-1" src={photoUrl} /></div>
                    })}
                </div>
            </InfiniteScroll>
        </div>
    )
}

