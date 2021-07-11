import React,{ useState, useEffect} from 'react'
import axios from 'axios'

function HomePage() {
    const [GIFs, setGIFs] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)
    const [search, setSearch] = useState("")
    const [GIFTitle,setGIFTitle] = useState("Trending GIFs")

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
            setGIFTitle("Search Results")
            setIsLoading(false)
            
        } catch (error) {
            setIsError(true)
            console.log(error)
        }
            
        
    }



    return (

        <div>
            { renderError() }

{/* navbar starts */}
            <div className="Navbar">
                <div className="topBar">
                    <h1>GIPHY</h1>
                    <div >
                        <h3> <a href="https://giphy.com/login">user login<a/></h3>
                    </div>
                </div>

                <div className="bottomBar">
                    <input value={search} type="text" placeholder="search" className="formControl" onChange={handleSearch}/>
                    <button className="buttonSearch" type="submit" onClick={handleSubmit} > GO </button>
                </div>
            </div>
{/* navbar ends */}



            <div className="Trending">
                <div className="trendingText">
                    <h3>{GIFTitle}</h3>
                </div>
                <div className="gifList">
                        {renderGIFs()}
                </div>
            </div>
        </div>

    );
}

export default HomePage;
