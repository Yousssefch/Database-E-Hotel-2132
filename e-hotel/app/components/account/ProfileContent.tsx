"use client";

import React, { useEffect, useState, useRef } from "react";
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

const ProfileContent: React.FC = () => {
  const [imageUrl, setImageUrl] = useState<string>("");
  const [user, setUser] = useState<User | null>(null);
  const [profilePictureURL, setProfilePictureURL] = useState<string>("");
  const modalRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const userId = Cookies.get("user_id");
    const userType = Cookies.get("user_type");

    if (userId && userType) {
      fetch(`/api/${userType}/${userId}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            setUser(data.user);
            setProfilePictureURL(
              data.user.profilePictureURL || "images/SignUpImage.png"
            ); // Initialize the image with the user's or a default one
          } else {
            console.error(data.message);
          }
        })
        .catch((error) => console.error("Failed to fetch user data:", error));
    }
  }, []);

  const openModal = () => {
    if (modalRef.current) {
      modalRef.current.showModal();
    }
  };

  const closeModal = () => {
    if (modalRef.current) {
      modalRef.current.close();
    }
  };

  const handleImageUpload = async (url: string) => {
    if (!url.trim()) return;

    setProfilePictureURL(url);

    if (user) {
      const updatedUser = { ...user, profilePictureURL: url };
      setUser(updatedUser);

      const userId = Cookies.get("user_id");
      const userType = Cookies.get("user_type");

      if (userId && userType) {
        try {
          const response = await fetch(`/api/${userType}/${userId}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ profilePictureURL: url }),
          });

          // Check if the response is empty before trying to parse it as JSON
          const text = await response.text();
          let result = null;

          if (text) {
            try {
              result = JSON.parse(text);
            } catch (error) {
              console.error("The response is not in JSON format:", error);
            }
          }

          if (result && result.success) {
            alert("Profile picture updated successfully!");
          } else {
            console.error(
              "Failed to update profile picture:",
              result?.message || "Unknown error"
            );
          }
        } catch (error) {
          console.error("Failed to update profile picture:", error);
        }
      }
    }

    closeModal();
  };

  const handleRemovePicture = async () => {
    setProfilePictureURL("images/SignUpImage.png"); // Set to default image

    if (user) {
      const updatedUser = {
        ...user,
        profilePictureURL: "images/SignUpImage.png",
      };
      setUser(updatedUser);

      const userId = Cookies.get("user_id");
      const userType = Cookies.get("user_type");

      if (userId && userType) {
        try {
          const response = await fetch(`/api/${userType}/${userId}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              profilePictureURL: "images/SignUpImage.png",
            }), // Update the image in the database
          });

          const result = await response.json();

          if (result.success) {
            alert("Profile picture removed successfully!");
          } else {
            console.error("Failed to remove profile picture:", result.message);
          }
        } catch (error) {
          console.error("Failed to remove profile picture:", error);
        }
      }
    }
  };

  return (
    <div className="mt-4">
      {/* Profile Information */}
      <div className="flex items-center border-t border-gray-300">
        <h3 className="text-xl font-semibold px-32">Profile Photo</h3>
        <div className="flex items-center px-55 gap-6 my-12 justify-center">
          <img
            src={user?.profilePictureURL} // Display the uploaded image
            className="h-20 w-20 rounded-full object-cover"
            alt="Profile"
          />
          {/* Button to open the modal */}
          <button
            className="btn rounded-2xl my-4 hover:scale-95 mt-4"
            onClick={openModal}
          >
            Upload
          </button>

          {/* Modal */}
          <dialog id="my_modal_3" className="modal" ref={modalRef}>
            <div className="modal-box bg-gray-100">
              <form method="dialog">
                <button
                  type="button"
                  className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                  onClick={closeModal}
                >
                  ✕
                </button>
              </form>
              <h3 className="font-bold text-lg mb-4">Link a picture</h3>

              {/* URL Input Field */}
              <input
                type="text"
                placeholder="Paste the URL here"
                className="input bg-gray-100 my-4 input-lg border-gray-300 border-2 w-full"
                value={imageUrl} // <-- Utiliser imageUrl comme valeur
                onChange={(e) => setImageUrl(e.target.value)} // <-- Mettre à jour imageUrl, PAS profilePictureURL
              />

              {/* Save Button */}
              <button
                type="button"
                className="btn btn-primary rounded-box justify-center flex px-4 hover:scale-95 mt-4"
                onClick={() => handleImageUpload(imageUrl)} // <-- Passer imageUrl au lieu de profilePictureURL
              >
                Save
              </button>
            </div>
          </dialog>

          <button
            className="btn btn-outline border-0 btn-md hover:scale-95 text-red-400"
            onClick={handleRemovePicture}
          >
            Remove
          </button>
        </div>
      </div>

      {/* Displaying User Information */}
      {user && (
        <>
          <div className="mt-4 flex items-center border-t border-gray-300">
            <h3 className="text-xl font-semibold px-32 py-8">Full Name</h3>
            <p className="px-65 text-gray-800">{user.fullName}</p>
          </div>

          <div className="mt-4 flex items-center border-t border-gray-300">
            <h3 className="text-xl font-semibold px-32 py-8">SSN/SIN</h3>
            <p className="px-70 text-gray-800">{user.ssn_sin}</p>
          </div>

          <div className="mt-4 flex items-center border-t border-gray-300">
            <h3 className="text-xl font-semibold px-32 py-8">Address</h3>
            <p className="px-70 text-gray-800">{user.address}</p>
          </div>

          {user.date_of_registration && (
            <div className="mt-4 flex items-center border-t border-gray-300">
              <h3 className="text-xl font-semibold px-32 py-8">Member since</h3>
              <p className="px-70 text-gray-800">
                {new Date(user.date_of_registration).toLocaleDateString()}
              </p>
            </div>
          )}

          {user.role && (
            <div className="mt-4 flex items-center border-t border-gray-300">
              <h3 className="text-xl font-semibold px-32 py-8">Role</h3>
              <p className="px-70 text-gray-800">{user.role}</p>
            </div>
          )}

          {user.hotelName && (
            <div className="mt-4 flex items-center border-t border-gray-300">
              <h3 className="text-xl font-semibold px-32 py-8">Hotel</h3>
              <p className="px-70 text-gray-800">{user.hotelName}</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ProfileContent;
