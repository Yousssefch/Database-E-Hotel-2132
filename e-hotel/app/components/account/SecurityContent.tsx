import React from "react";

const SecurityContent = () => {
  return (
    <>
      {/* Email Address */}
      <div className="mt-4 flex items-center border-t border-gray-800">
        <h3 className="text-xl font-semibold px-32 py-8">Change Password</h3>
        <div className="items-center gap-8 px-70 my-12">
          <fieldset className="fieldset w-sm   bg-base-200 border border-base-300 p-4 rounded-2xl">
            <legend className="fieldset-legend">Password</legend>

            <label className="fieldset-label">Old Password</label>
            <input
              type="text"
              className="input rounded-2xl w-full"
              placeholder="old password"
            />

            <label className="fieldset-label">New Password</label>
            <input
              type="text"
              className="input rounded-2xl w-full"
              placeholder="new password"
            />

            <label className="fieldset-label">Confirm Password</label>
            <input
              type="text"
              className="input rounded-2xl w-full"
              placeholder="confirm password"
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
