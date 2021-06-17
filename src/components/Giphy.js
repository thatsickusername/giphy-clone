import React,{ useState, useEffect} from 'react'
import axios from 'axios'

function Giphy() {
    const [GIFs, setGIFs] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)
    const [search, setSearch] = useState("")

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
                <div className="content"> 
                    <img className="gif" key={gif.id} src={gif.images.fixed_height.url} alt="broooooo"/>  
                </div>
        ))
    }

    const renderError = () => {
        if (isError) {
            return (<div>UNABLE TO GET GIF TRY IN A FEW MINUTEs or RELOAD</div>)
        }
    }

    const handleSearch = (e) => {
        setSearch(e.target.value)
        console.log("handleSearch works")
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log("i work")
       
        setIsError(false)
        setIsLoading(true)


        try {
            const results = await axios("https://api.giphy.com/v1/gifs/search", {
                params: {
                    api_key: "FdTqhHyzBCHo4p7JSEFHPMUPfxsns4IX",
                    q: search
                }
        })
            setGIFs(results.data.data)
            setIsLoading(false)
            
        } catch (error) {
            setIsError(true)
            console.log(error)
        }
            
        
    }



    return (

        <div>
            { renderError() }
            <form className="formSearch">
                    <input value={search} type="text" placeholder="search" className="formControl" onChange={handleSearch}/>
                    <button className="buttonSearch" type="submit" onClick={handleSubmit} > GO </button>
                </form>
            <div className="gifsList">
                { renderGIFs() }
            </div>
        </div>

    );
}

export default Giphy;

// onChange={handleSearch()} value={search}