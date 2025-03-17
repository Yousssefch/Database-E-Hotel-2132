"use client";
import React from "react";
import { useState } from "react";
import ProfileContent from "../components/account/ProfileContent";
import SecurityContent from "../components/account/SecurityContent";
import DocumentsContent from "../components/account/DocumentsContent";
import MetricsContent from "../components/account/MetricsContent";
import PaymentsContent from "../components/account/PaymentsContent";

const page = () => {
  const [activeTab, setActiveTab] = useState("Profile");

  return (
    <div className="bg-gray-900 h-full">
      {/* cover pic*/}
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
              src="images/SignUpImage.png"
              alt="Profile"
              className="w-40 h-40 rounded-full border-4 border-gray-900"
            />
            <div className="p-6 mt-16 ">
              <h2 className="text-xl font-bold">Saimon Hewitt</h2>
              <p className="text-md text-gray-500">@saimon25</p>
            </div>
          </div>
          <div className="relative gap-12 top-4 right-12">
            <button className="btn btn-md m-4 btn-primary rounded-xl hover:scale-95">
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
              Manage account
            </button>
            <button className="btn btn-outline btn-md rounded-xl hover:scale-95">
              {" "}
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
      <div className="mt-8">
        <div className="tabs tabs-boxed justify-center font-semibold py-4 btn-outline shadow-inner">
          {["Profile", "Security", "Documents", "Metrics", "Payments"].map(
            (tab) => (
              <button
                key={tab}
                className={`tab ${activeTab === tab ? "tab-active" : ""}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            )
          )}
        </div>
      </div>
      {/* Contenu affiché selon l'onglet actif */}
      <div className="mt-6 bg-gray-900 p-6 rounded-lg shadow-md">
        {activeTab === "Profile" && <ProfileContent />}
        {activeTab === "Security" && <SecurityContent />}
        {activeTab === "Documents" && <DocumentsContent />}
        {activeTab === "Metrics" && <MetricsContent />}
        {activeTab === "Payments" && <PaymentsContent />}
      </div>

      {/* <!-- Action Buttons --> */}
      <div className="gap-8 p-14 flex justify-end space-x-2">
        <button className="btn btn-outline rounded-xl">Cancel</button>
        <button className="btn btn-primary rounded-xl">Save changes</button>
      </div>
    </div>
  );
};

export default page;
