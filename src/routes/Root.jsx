import { Link, Outlet } from "react-router-dom";
import "../index.css"

export default function App(){
    return(
        <div>
            <nav>
                <Link to={{ pathname: "/", search: "?limit=20&offset=0" }}>Home</Link>
                <Link to="/about">About</Link>
            </nav>
            <Outlet />
        </div>
    )
}