export default function NavBar() {
  return (
    <div className="navbar bg-[#2c9956] shadow-sm ">
      <div className="navbar-start">
        <img className="h-12 px-4" src="/images/Logo.png" />
        <a className="btn btn-ghost text-xl hover:bg-[#2c9956]">E-Hotel</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1"></ul>
      </div>

      <div className="navbar-end">
        <a className="btn btn-ghost hover:bg-[#d19a62] rounded-sm border-1 border-white">
          Sign in
        </a>
        <a className="btn btn-ghost hover:bg-[#d19a62] rounded-sm border-1 border-white ml-5">
          Log in
        </a>
      </div>
    </div>
  );
}
