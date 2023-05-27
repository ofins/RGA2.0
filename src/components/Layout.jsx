import { Outlet } from "react-router-dom";
import NavbarComponent from "./navbar/NavbarComponent";

function Layout() {
    return(
        <div className="layout--wrapper">
            <NavbarComponent />
            <main>
                <Outlet />
            </main>
        </div>
    )
}

export default Layout;