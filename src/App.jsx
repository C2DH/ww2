import { Route, Routes, useLocation } from "react-router-dom";
import Home from './components/Home/Home'
import Path from './components/Path/Path'
import Catalogue from './components/Catalogue/Catalogue'
import HistorianWorkshop from './components/HistorianWorkshop/HistorianWorkshop'
import SpaceTimeMap from "./components/SpaceTimeMap.jsx/SpaceTimeMap";
import About from "./components/About/About";
import Contact from "./components/Contact/Contact";
import Credits from "./components/Credits/Credits";
import Notice from "./components/Notice/Notice";
import Popup from "./components/Popup/Popup";
import Menu from "./components/Menu/Menu";
import Terms from "./components/Terms/Terms";

export default function App() {

    const location = useLocation();
    const previousLocation = location.state?.previousLocation;

    return (
        <Routes location={ previousLocation || location }>
            <Route path='/' element={ <Menu/>} >
                <Route index element={ <Home /> }/>
                <Route path='/path' element={ <Path /> }/>
                <Route path='/catalogue' element={ <Catalogue /> }/>
                <Route path='/historian-workshop' element={ <HistorianWorkshop /> }/>
                <Route path='/spacetime-map' element={ <SpaceTimeMap /> }/>
                <Route path='/notice/:id' element={ <Notice /> }/>
                <Route path='/note/:id' element={ <Popup /> }/>
                <Route path='/credits' element={ <Credits /> }/>
                <Route path='/about' element={ <About /> }/>
                <Route path='/terms' element={ <Terms /> }/>
                <Route path='/contact' element={ <Contact /> }/>
            </Route>
        </Routes>
    )
}
