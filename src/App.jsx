import { Route, Routes, useLocation } from "react-router-dom";
import Home from './components/Home/Home'
import Path from './pages/Path'
import Catalogue from './components/Catalogue/Catalogue'
import HistorianWorkshop from './pages/HistorianWorkshop'
import SpaceTimeMap from "./pages/SpaceTimeMap";
import About from "./components/About/About";
import Terms from "./pages/Terms";
import Contact from "./components/Contact/Contact";
import Credits from "./pages/Credits";
import Notice from "./components/Notice/Notice";
import Popup from "./components/Popup/Popup";
import Menu from "./components/Menu/Menu";

export default function App() {

    const location = useLocation();
    const previousLocation = location.state?.previousLocation;

    return (
        <Routes location={ previousLocation || location }>
            <Route path='/' element={ <Menu/>} >
                <Route index element={ <Home /> }/>
                <Route path='/path' element={ <Path /> }/>
                <Route path='/catalogue' element={ <Catalogue /> }/>
                <Route path='/notice/:id' element={ <Notice /> }/>
            </Route>
        </Routes>
    )



    // const router = createBrowserRouter([
    //     {
    //         path: "/",
    //         element: <Home />,
    //     },
    //     {
    //         path: "/path",
    //         element: <Path />,
    //     },
    //     {
    //         path: "/catalogue",
    //         element: <Catalogue />,
    //     },
    //     {
    //         path: "/historian-workshop",
    //         element: <HistorianWorkshop />,
    //     },
    //     {
    //         path: "/spacetime-map",
    //         element: <SpaceTimeMap />,
    //     },
    //     {
    //         path: "/about",
    //         element: <About />,
    //     },
    //     {
    //         path: "/terms",
    //         element: <Terms />,
    //     },
    //     {
    //         path: "/contact",
    //         element: <Contact />,
    //     },
    //     {
    //         path: "/credits",
    //         element: <Credits />,
    //     },
    //     {
    //         path: '/notice/:noticeId',
    //         element: <Notice />,
    //     },
    //     {
    //         path: '/note/:noteId',
    //         element: <Popup />
    //     }
    // ])


    // return (
    //     <RouterProvider router={router} />
    // )
}
