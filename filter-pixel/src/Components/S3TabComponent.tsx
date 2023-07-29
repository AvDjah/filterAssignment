import {useState, useEffect, useRef, createRef} from "react"
import InfiniteScroll from "react-infinite-scroll-component"


export const S3Photos = () => {

    const amazonBase = "https://testbucketfp.s3.ap-south-1.amazonaws.com/"

    const [photos, setPhotos] = useState<string[]>([])

    const myRef = useRef(null)



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

    const imageSizes = ()=> {
        const children = myRef.current?.children
        const items = myRef.current?.children.length
        for(let i=0;i < items;i++){
            console.log(children[i].children[0].naturalWidth, children[i].children[0].naturalHeight)
        }
    }


    useEffect(()=> {
        fetchKeys()
        imageSizes()
    },[])




    return (
        <div>
            <InfiniteScroll dataLength={photos.length} hasMore={photos.length <= 14} next={fetchKeys} loader={<h4></h4>}  >
                <div ref={myRef}  className="grid grid-cols-3 gap-8 justify-items-center" >
                    {photos.map((val, index) => {
                        const photoUrl = amazonBase + val
                        return <div className="items-center" key={index} ><img  className="h-full border-4 border-gray-800 object-cover wed mx-auto items-center transition-all ease-in-out hover:-translate-y-1" src={photoUrl} /></div>
                    })}
                </div>
            </InfiniteScroll>
        </div>
    )
}

