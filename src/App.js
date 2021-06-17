
import './app.css'
import Navbar from './components/Navbar'
import Random from './components/Random'
import Trending from './components/Trending'

function App() {
    return (
        <div className="container">
            <Navbar/>
            <Trending/>
            <Random/>
        </div>
    );
}

export default App;