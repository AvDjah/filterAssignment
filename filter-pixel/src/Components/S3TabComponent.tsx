import { useState, useEffect } from "react"
import InfiniteScroll from "react-infinite-scroll-component"


export const S3Photos = () => {

    const amazonBase = "https://testbucketfp.s3.ap-south-1.amazonaws.com/"

    const [photos, setPhotos] = useState<string[]>([])

    const offset = 0
    const fetchKeys = async () => {

        const data = await fetch("http://localhost:3000/data?" + new URLSearchParams({
            offset: offset.toString(),
            limit: (photos.length + 6).toString(),
        }))
        const jsonData: string[] = await data.json()


        const transformed = jsonData.map((val) => {
            return encodeURIComponent(val)
        })

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

