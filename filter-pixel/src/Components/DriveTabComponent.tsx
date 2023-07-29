import { useState, useEffect } from "react"
import InfiniteScroll from "react-infinite-scroll-component"


type Photos = {
    url : string
}




export const DrivePage = () => {

    const [offset, setOffset] = useState(0)
    const [limit, setLimit] = useState(9)
    const [photos, setPhotos] = useState<string[]>([])



    const fetchPhotos = () => {

        const url = `http://localhost:3000/drive?` + new URLSearchParams({limit : (photos.length + 6).toString()})
        console.log(url)
        fetch(url).then(async (res) => {
            const jsonOutput: string[] = (await res.json())
            // console.log(jsonOutput)
            setPhotos(photos?.concat(jsonOutput))
            console.log(jsonOutput)
        }).catch(e => console.log(e))
        return
    }

    useEffect(() => {
        fetchPhotos()
    }, [offset])



    return (<>
        <InfiniteScroll dataLength={photos.length} next={fetchPhotos} hasMore={photos.length < 14 } loader={<h4>Loading</h4>} >
            <div className="grid grid-cols-3 gap-4 " >
                {photos?.map((val, index) => {
                    return <div className="h-96" key={index} ><img src={val} className="object-cover h-96 w-full transition-all ease-in-out hover:-translate-y-1" ></img></div>
                })}
            </div>
        </InfiniteScroll >
    </>
    )

}