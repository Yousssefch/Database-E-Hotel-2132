import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const NavBarTop = () => {
  const [user, setUser] = useState(null);
  const [userType, setUserType] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch("/api/check-auth");

        if (response.status === 200) {
          const data = await response.json();

          if (data.authenticated) {
            setUser(data.user);
            setUserType(data.userType);
          } else {
            setUser(null);
            setUserType(null);
          }
        } else {
          setUser(null);
          setUserType(null);
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/logout", { method: "POST" });
      if (response.ok) {
        setUser(null);
        setUserType(null);
        router.refresh();
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="flex-1">
        <a href="/" className="btn btn-ghost text-xl">
          E-Hotel
        </a>
      </div>
      <div className="flex-none">
        {user ? (
          <div className="flex items-center space-x-4">
            <Image
              src="/default-profile.png"
              alt="Profile Picture"
              width={40}
              height={40}
              className="rounded-full"
            />
            <div className="dropdown dropdown-end">
              <button className="btn btn-ghost btn-circle">{user.name}</button>
              <ul className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                <li>
                  <a>Profile</a>
                </li>
                {userType === "employee" && (
                  <li>
                    <a>Employee Dashboard</a>
                  </li>
                )}
                <li>
                  <button onClick={handleLogout}>Logout</button>
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <button
            className="btn btn-primary hover: scale-95 btn-sm px-4 mx-6 rounded-xl"
            onClick={() => router.push("/login")}
          >
            Login
          </button>
        )}
      </div>
    </div>
  );
};

export default NavBarTop;
