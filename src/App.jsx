import { Route, Routes, useLocation } from "react-router-dom";
import Home from './components/Home/Home'
import Catalogue from './components/Catalogue/Catalogue'
import HistorianWorkshop from './components/HistorianWorkshop/HistorianWorkshop'
import SpaceTimeMap from "./components/SpaceTimeMap.jsx/SpaceTimeMap";
import About from "./components/About/About";
import Contact from "./components/Contact/Contact";
import Credits from "./components/Credits/Credits";
import Notice from "./components/Notice/Notice";
import Menu from "./components/Menu/Menu";
import Terms from "./components/Terms/Terms";
import { AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useSharedState } from './contexts/SharedStateProvider'
import Clouds from './components/Clouds/Clouds'
import Curtains from './components/Curtains/Curtains'
import Note from "./components/Note/Note";
import Source from "./components/Source/Source";

export default function App() {

    const location = useLocation();
    const [sharedState, setSharedState] = useSharedState();
    const [firstLaunch, setFirstLaunch] = useState(true);

    useEffect(() => {
        if (!firstLaunch) {
          if ((location.state?.from == '/' && location.pathname.includes('notice')) || (location.state?.from.includes('notice') && location.pathname == '/')) {
            setSharedState({ ...sharedState, showClouds: true });
          } else if(location.state) {
            setSharedState({ ...sharedState, showCurtains: true });
          }
        }
        setFirstLaunch(false);
      }, [location.pathname]);
  

    return (
        <>
            <AnimatePresence mode="wait">
                <Routes location={location} key={location.pathname}>
                    <Route path='/' element={ <Menu/>} >
                        <Route index element={ <Home /> }/>
                        <Route path='/map' element={ <Map /> }/>
                        <Route path='/catalogue' element={ <Catalogue /> }/>
                        <Route path='/historian-workshop' element={ <HistorianWorkshop /> }/>
                        <Route path='/spacetime-map' element={ <SpaceTimeMap /> }/>
                        <Route path='/notice/:id' element={ <Notice /> }/>
                        <Route path='/note/:id' element={ <Note /> }/>
                        <Route path='/source/:id' element={ <Source /> }/>
                        <Route path='/credits' element={ <Credits /> }/>
                        <Route path='/about' element={ <About /> }/>
                        <Route path='/terms' element={ <Terms /> }/>
                        <Route path='/contact' element={ <Contact /> }/>
                    </Route>
                </Routes>
            </AnimatePresence>

            <AnimatePresence>
                {sharedState.showClouds && <Clouds />}
                {sharedState.showCurtains && <Curtains />}
            </AnimatePresence>
        </>
    )
}
