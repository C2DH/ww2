import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from './pages/Home'
import Path from './pages/Path'
import Catalogue from './pages/Catalogue'
import HistorianWorkshop from './pages/HistorianWorkshop'
import SpaceTimeMap from "./pages/SpaceTimeMap";
import About from "./pages/About";
import Terms from "./pages/Terms";
import Contact from "./pages/Contact";
import Credits from "./pages/Credits";
import Notice from "./pages/Notice";

export default function App() {

    const router = createBrowserRouter([
        {
            path: "/",
            element: <Home />,
        },
        {
            path: "/path",
            element: <Path />,
        },
        {
            path: "/catalogue",
            element: <Catalogue />,
        },
        {
            path: "/historian-workshop",
            element: <HistorianWorkshop />,
        },
        {
            path: "/spacetime-map",
            element: <SpaceTimeMap />,
        },
        {
            path: "/about",
            element: <About />,
        },
        {
            path: "/terms",
            element: <Terms />,
        },
        {
            path: "/contact",
            element: <Contact />,
        },
        {
            path: "/credits",
            element: <Credits />,
        },
        {
            path: '/notice/:noticeId',
            element: <Notice />,
        }
    ])


    return (
        <RouterProvider router={router} />
    )
}
