export default function NavBar(){
    return(
        <div className="navbar bg-[#e3a76b] shadow-sm absolute top-5 w-95/100 left-1/2 -translate-x-1/2 rounded-md">
                <div className="navbar-start">
                    <a className="btn btn-ghost text-xl hover:bg-[#e3a76b]">E-Hotel</a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                    <li><a>Home</a></li>
                    </ul>
                </div>

                <div className="navbar-end">
                    <a className="btn btn-ghost hover:bg-[#d19a62] rounded-xl border-0">Sign in</a>
                    <a className="btn btn-ghost hover:bg-[#d19a62] rounded-xl border-0">Log in</a>
                </div>
            </div>
    )
}