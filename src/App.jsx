import { Route, Routes, useLocation } from "react-router-dom"
import Home from './components/Home/Home'
import Catalogue from './components/Catalogue/Catalogue'
import HistorianWorkshop from './components/HistorianWorkshop/HistorianWorkshop'
import SpaceTimeMap from "./components/SpaceTimeMap.jsx/SpaceTimeMap"
import About from "./components/About/About"
import Credits from "./components/Credits/Credits"
import Notice from "./components/Notice/Notice"
import Menu from "./components/Menu/Menu"
import Terms from "./components/Terms/Terms"
import Contact from "./components/Contact/Contact"
import { AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useSharedState } from './contexts/SharedStateProvider'
import Clouds from './components/Clouds/Clouds'
import Curtains from './components/Curtains/Curtains'
import Note from "./components/Note/Note"
import Source from "./components/Source/Source"
import Sources from "./components/Sources/Sources"
import Layout from "./components/Layout/Layout"
import ResearchInstitutions from "./components/ResearchInstitutions/ResearchInstitutions"
import Bibliography from './components/Bibliography/Bibliography'
import Glossary from "./components/Glossary/Glossary"
import { MenuProvider } from "./contexts/MenuProvider"
import { LanguageProvider } from "./contexts/LanguageProvider"
import { SourceProvider } from "./contexts/SourceProvider"
import { MenuHistorianProvider } from "./contexts/MenuHistorianProvider"
import NotFound from "./components/NotFound/NotFound"
import { IntroProvider } from "./contexts/IntroProvider"

export default function App() {

    const location = useLocation()
    const [sharedState, setSharedState] = useSharedState()
    const [firstLaunch, setFirstLaunch] = useState(true)
    const from = location.state?.from;


    useEffect(() => {
        if (!firstLaunch) {
            if (from === '/' && location.pathname.includes('notice')) {
                setSharedState({ ...sharedState, showClouds: true })
            } else {
                setSharedState({ ...sharedState, showClouds: false, showCurtains: true })
            }
        }
        setFirstLaunch(false);
    }, [location.pathname]);

    return (
        <>
            <IntroProvider>
                <LanguageProvider>
                    <MenuProvider>
                        <SourceProvider>
                            <MenuHistorianProvider>
                                <Menu />
                                <AnimatePresence mode="wait">
                                    <Routes location={location} key={location.pathname}>
                                        <Route path='/' element={ <Layout/>} >
                                            <Route path='/' element={ <Home /> }/>
                                            <Route path='/catalogue' element={ <Catalogue /> }/>
                                            <Route path='/historian-workshop' element={ <HistorianWorkshop /> }/>
                                            <Route path='/research-institutions' element={ <ResearchInstitutions /> }/>
                                            <Route path='/bibliography' element={ <Bibliography /> }/>
                                            <Route path='/glossary' element={ <Glossary /> }/>
                                            <Route path='/spatiotemporal-map' element={ <SpaceTimeMap /> }/>
                                            <Route path='/notice/:slug' element={ <Notice /> }/>
                                            <Route path='/note/:slug' element={ <Note /> }/>
                                            <Route path='/sources' element={ <Sources /> }/>
                                            <Route path='/source/:id' element={ <Source /> }/>
                                            <Route path='/credits' element={ <Credits /> }/>
                                            <Route path='/about' element={ <About /> }/>
                                            <Route path='/terms' element={ <Terms /> }/>
                                            <Route path='/contact' element={ <Contact /> }/>
                                            <Route path="*" element={ <NotFound /> }/>
                                        </Route>
                                    </Routes>
                                </AnimatePresence>
                            </MenuHistorianProvider>
                        </SourceProvider>    
                    </MenuProvider>
                </LanguageProvider>
            </IntroProvider>

            <AnimatePresence mode="wait">
                {sharedState.showClouds && <Clouds />}
                {sharedState.showCurtains && <Curtains />}
            </AnimatePresence>
        </>
    )
}
