"use client";
import React, { useEffect, useState } from "react";
import ProfileContent from "../components/account/ProfileContent";
import SecurityContent from "../components/account/SecurityContent";
import Navbar from "../components/global/Navbar";
import Cookies from "js-cookie";

interface User {
  fullName: string;
  ssn_sin: string;
  address: string;
  date_of_registration?: string;
  profilePictureURL?: string;
  role?: string;
  hotelName?: string;
}

const Page: React.FC = () => {
  const [activeTab, setActiveTab] = useState("Profile");
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Récupération des cookies
    const userId = Cookies.get("user_id");
    const userType = Cookies.get("user_type");

    if (userId && userType) {
      // Requête pour récupérer les informations de l'utilisateur
      fetch(`/api/${userType}/${userId}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            setUser(data.user);
          } else {
            console.error(data.message);
          }
        })
        .catch((error) => console.error("Failed to fetch user data:", error));
    }
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex bg-gray-100 h-full w-full">
      <Navbar />
      <div className="bg-gray-100 h-full w-full">
        {/* cover pic */}
        <div className="relative overflow-visible">
          <img
            src="images/LogInImage.png"
            alt="Cover"
            className="w-full h-60 object-cover"
          />

          {/* profile pic and id */}
          <div className="justify-between flex">
            <div className="relative bottom-16 left-12 flex items-center">
              <img
                src={user.profilePictureURL}
                alt="Profile"
                className="w-40 h-40 m-auto rounded-full border-4 border-gray-100 object-cover"
              />

              <div className="p-6 mt-16">
                <h2 className="text-xl text-gray-800 font-bold">
                  {user.fullName}
                </h2>
                <p className="text-md text-gray-700">
                  {user.fullName}
                  {user.ssn_sin[0]}
                </p>
              </div>
            </div>
            <div className="relative gap-12 top-4 right-12">
              {/* You can open the modal using document.getElementById('ID').showModal() method */}
              <button
                className="btn btn-md btn-primary m-4 rounded-xl hover:scale-95"
                onClick={() =>
                  document.getElementById("my_modal_3").showModal()
                }
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>
                Manage Account
              </button>
              <dialog id="my_modal_3" className="modal">
                <div className="modal-box">
                  <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                      ✕
                    </button>
                  </form>
                  <h3 className="font-bold text-xl items-center">
                    You're all update{" "}
                  </h3>
                </div>
              </dialog>

              <button
                className="btn btn-outline hover:text-white text-gray-900 btn-md rounded-xl hover:scale-95"
                onClick={() => {
                  // Supprimer les cookies d'identification
                  Cookies.remove("user_id");
                  Cookies.remove("user_type");

                  // Rediriger l'utilisateur vers la page de connexion
                  window.location.href = "/";
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"
                  />
                </svg>
                Sign out
              </button>
            </div>
          </div>
        </div>
        {/* <!-- Profile Tabs --> */}
        <div className="mt-8 flex justify-center">
          <div className="tabs tabs-boxed max-w-fit bg-gray-100 rounded-2xl font-semibold py-4 btn-outline shadow-xl">
            {["Profile", "Security"].map((tab) => (
              <button
                key={tab}
                className={`tab ${
                  activeTab === tab
                    ? "tab-active scale-110 text-gray-800 hover:text-gray-500"
                    : "!text-gray-400"
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
        {/* Contenu affiché selon l'onglet actif */}
        <div className="mt-6 bg-gray-100 p-6 rounded-lg text-gray-900">
          {activeTab === "Profile" && <ProfileContent />}
          {activeTab === "Security" && <SecurityContent />}
        </div>

        {/* <!-- Action Buttons --> */}
        <div className="gap-8 p-14 flex text-gray-900 justify-end space-x-2">
          <a href="/account">
            <button className="btn rounded-xl border-2 border-gray-800 btn-ghost hover:btn-primary hover:scale-110">
              Save changes
            </button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Page;
