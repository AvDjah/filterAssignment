import { useState, useEffect } from "react"
import InfiniteScroll from "react-infinite-scroll-component"


type Photos = {
    description?: string,
    id: number,
    title?: string,
    url: string
}




export const DrivePage = () => {

    const [offset, setOffset] = useState(0)
    const [limit, setLimit] = useState(9)
    const [photos, setPhotos] = useState<Photos[]>([])



    const fetchPhotos = () => {

        const url = `https://api.slingacademy.com/v1/sample-data/photos?offset=${0}&limit=${limit}`
        console.log(url)
        fetch(url).then(async (res) => {
            const jsonOutput: Photos[] = (await res.json()).photos
            // console.log(jsonOutput)
            setPhotos(photos?.concat(jsonOutput))
        }).catch(e => console.log(e))
        return
    }

    useEffect(() => {
        fetchPhotos()
    }, [offset])



    return (<>
        <InfiniteScroll dataLength={photos.length} next={fetchPhotos} hasMore={photos.length < 20} loader={<h4>Loading</h4>} >
            <div className="flex flex-row flex-wrap gap-2" >
                {photos?.map((val, index) => {
                    return <div className="flex-grow h-72" key={index} ><img src={val.url} className="object-fill w-full h-72 transition-all ease-in-out hover:-translate-y-1" ></img></div>
                })}
            </div>
        </InfiniteScroll >
    </>
    )

}