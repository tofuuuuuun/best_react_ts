import { AlbumApp } from "@/album/components/AlbumApp"
import { MovieApp } from "@/movie/MovieApp"
import { BrowserRouter, Link, Route, Routes } from "react-router-dom"

export const Home = () => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path='/album' element={<AlbumApp />} />
                    <Route path='/movie' element={<MovieApp />} />
                </Routes>
            </BrowserRouter>
            <h1>Home</h1>
            <ul>
                <li><Link to={'/album'}>album</Link></li>
                <li><Link to={'/movie'}>movie</Link></li>
            </ul>
        </>
    )
}