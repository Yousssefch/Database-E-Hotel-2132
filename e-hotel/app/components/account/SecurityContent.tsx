import React from "react";

const SecurityContent = () => {
  return (
    <>
      {/* Email Address */}
      <div className="mt-4 flex items-center border-t border-gray-300">
        <h3 className="text-xl font-semibold px-32 py-8">Change Password</h3>
        <div className="items-center gap-8 px-70 my-12">
          <fieldset className="fieldset w-sm   bg-gray-200 p-4 rounded-2xl">
            <legend className="fieldset-legend  text-gray-800">Password</legend>

            <label className="fieldset-label  text-gray-800">
              Old Password
            </label>
            <input
              type="text"
              className="input rounded-2xl w-full bg-gray-300"
            />

            <label className="fieldset-label  text-gray-800">
              New Password
            </label>
            <input
              type="text"
              className="input rounded-2xl w-full  bg-gray-300"
            />

            <label className="fieldset-label  text-gray-800 ">
              Confirm Password
            </label>
            <input
              type="text"
              className="input rounded-2xl w-full  bg-gray-300"
            />
            <button className="btn btn-md btn-primary rounded-2xl mt-8">
              Submit
            </button>
          </fieldset>
        </div>
      </div>
    </>
  );
};

export default SecurityContent;
