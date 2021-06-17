import React,{ useState, useEffect} from 'react'
import axios from 'axios'
import '../css/Trending.css';

function Random() {
    const [GIFs, setGIFs] = useState([])

    useEffect(()=> {
        const FetchData = async () => {

            try {
                const results = await axios('https://api.giphy.com/v1/gifs/trending', {
                params: {
                    api_key: "FdTqhHyzBCHo4p7JSEFHPMUPfxsns4IX",
                    limit: 25,
                    offset: 25
                } 
            })
                setGIFs(results.data.data)
                
            } catch (error) {
                console.log(error)
            }
        }
        FetchData()
    },[])

    const renderGIFs = () => {
        return GIFs.map( (gif) => (
                <div key={gif.id} className="indvWrapper"> 
                    <img className="gif"  src={gif.images.fixed_height.url} alt="broooooo"/>  
                </div>
        ))
    }


    return (
        <div className="Trending">
            <div className="trendingText">
                <h3>Some Random GIFs</h3>
            </div>
            <div className="trendingGIFs">
                <div className="trendingRow">
                    {renderGIFs()}
                </div>
            </div>
        </div>
    );
}

export default Random;