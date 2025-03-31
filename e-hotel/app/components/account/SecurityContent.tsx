import React, { useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
const SecurityContent = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    const userId = Cookies.get("user_id");
    const userType = Cookies.get("user_type");

    if (!userId || !userType) {
      setError(`User not authenticated. UserID: ${userId}`);
      return;
    }

    try {
      const response = await fetch(`/api/${userType}/${userId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ssn_sin: oldPassword, // Change from `oldPassword` to `ssn_sin`
          newssn_sin: newPassword, // Change from `newPassword` to `newssn_sin`
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "An error occurred.");
      } else {
        setSuccess("Password updated successfully.");
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
      }
    } catch (error) {
      setError("Network error. Please try again!");
    }
  };

  return (
    <>
      {/* Change Password */}
      <div className="mt-4 flex items-center border-t border-gray-300">
        <h3 className="text-xl font-semibold px-32 py-8">Change Password</h3>
        <div className="items-center gap-8 px-20 my-12">
          <form onSubmit={handlePasswordChange}>
            <fieldset className="fieldset w-sm bg-gray-200 p-4 rounded-2xl">
              <legend className="fieldset-legend text-gray-800">
                Password
              </legend>

              <label className="fieldset-label text-gray-800">
                Old Password
              </label>
              <input
                type="password"
                className="input rounded-2xl w-full bg-gray-300"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />

              <label className="fieldset-label text-gray-800 mt-4">
                New Password
              </label>
              <input
                type="password"
                className="input rounded-2xl w-full bg-gray-300"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />

              <label className="fieldset-label text-gray-800 mt-4">
                Confirm Password
              </label>
              <input
                type="password"
                className="input rounded-2xl w-full bg-gray-300"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />

              <button
                className="btn btn-md btn-primary rounded-2xl mt-8"
                type="submit"
              >
                Submit
              </button>
            </fieldset>

            {error && <div className="mt-4 text-red-500">{error}</div>}
            {success && <div className="mt-4 text-green-500">{success}</div>}
          </form>
        </div>
      </div>
    </>
  );
};

export default SecurityContent;
