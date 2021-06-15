import React,{ useState, useEffect} from 'react'
import axios from 'axios'

function Giphy() {
    const [GIFs, setGIFs] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)

    useEffect(()=> {
        const FetchData = async () => {
            setIsError(false)
            setIsLoading(true)

            try {
                const results = await axios('https://api.giphy.com/v1/gifs/trending', {
                params: {
                    api_key: "FdTqhHyzBCHo4p7JSEFHPMUPfxsns4IX",
                    limit: 25
                }
                
            })
                setGIFs(results.data.data)
                
            } catch (error) {
                setIsError(true)
                console.log(error)
            }
            
            setIsLoading(false)
        }
        FetchData()
    },[])

    const renderGIFs = () => {   
        if (isLoading) {
            return (
                <div className="loadingAnim"> Loading </div>
            )
        }    

        return GIFs.map( (gif) => (
                <div className="gif" key={gif.id}>
                    <img src={gif.images.fixed_height.url} alt="broooooo"/>
                </div>
        ))
    }

    return (
        <div className="gifsList">
            { renderGIFs() }
        </div>

    );
}

export default Giphy;