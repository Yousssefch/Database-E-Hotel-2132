import React from "react";

const ProfileContent = () => {
  return (
    <div className="mt-4">
      {/* Profile Information */}
      <div className="flex items-center border-t border-gray-800">
        <h3 className="text-xl font-semibold px-32">Profile Photo</h3>
        <div className="flex items-center px-70 gap-6 my-12 justify-center">
          <img
            src="images/SignUpImage.png"
            className="h-20 w-20 rounded-full"
            alt="Profile"
          />
          <button className="btn btn-md ml-4 btn-primary rounded-box">
            Update
          </button>
          <button className="btn btn-outline border-0 btn-md hover:scale-95 text-red-400">
            Remove
          </button>
        </div>
      </div>

      {/* Email Address */}
      <div className="mt-4 flex items-center border-t border-gray-800">
        <h3 className="text-xl font-semibold px-32 py-8">Email address</h3>
        <div className="items-center gap-8 px-70 my-12">
          <p className="text-gray-400">
            saimonhewitt@kahf.dev{" "}
            <span className="badge badge-primary ml-2">Primary</span>
          </p>
          <button className="text-blue-500 mt-2">+ Add email address</button>
        </div>
      </div>

      {/* Phone Number */}
      <div className="mt-4 flex border-t items-center border-gray-800">
        <h3 className="text-xl font-semibold px-32 py-8">Phone number</h3>
        <div className="items-center gap-8 px-70 my-12">
          <p className="text-gray-400">
            +1 (545) 124-4547{" "}
            <span className="badge badge-primary ml-2">Primary</span>
          </p>
          <button className="text-blue-500 mt-2">+ Add phone number</button>
        </div>
      </div>

      {/* Connected Accounts */}
      <div className="mt-4 flex border-t border-b items-center border-gray-800">
        <h3 className="text-xl font-semibold px-32 py-8">Connected accounts</h3>
        <div className="items-center px-56 my-12">
          <div className="flex items-center mt-2">
            <img
              src="https://logomaven.com/wp-content/uploads/Google-Logo-542x554px-compressed.png"
              className="w-5 h-5 mr-2"
              alt="Google"
            />
            <p className="text-gray-400">Google • example@gmail.com</p>
          </div>
          <button className="text-blue-500 mt-2">+ Connect account</button>
        </div>
      </div>
    </div>
  );
};

export default ProfileContent;
