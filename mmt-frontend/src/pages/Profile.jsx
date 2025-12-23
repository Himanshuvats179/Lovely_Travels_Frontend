import { useState } from "react";
import "./Profile.css";

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  // ================= USER STATE =================
  const [user, setUser] = useState({
    fullName: "John Doe",
    email: "john.doe@example.com",
    city: "Pune",
    gender: "Male",
    profilePhoto: null, // ✅ consistent naming
  });

  // ================= FORM STATE =================
  const [formData, setFormData] = useState(user);

  // ================= INPUT CHANGE =================
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ================= SAVE PROFILE =================
  const handleSave = () => {
    setUser(formData);
    setIsEditing(false);
  };

  // ================= CANCEL EDIT =================
  const handleCancel = () => {
    setFormData(user); // ✅ reset changes
    setIsEditing(false);
  };

  // ================= PHOTO UPLOAD =================
  const handlePhotoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const uploadData = new FormData();
    uploadData.append("file", file);
    uploadData.append("folder", "profile");

    try {
      setIsUploading(true);

      const res = await fetch("http://localhost:8080/api/upload", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: uploadData,
      });

      const imageUrl = await res.text();

      // ✅ update both user & formData
      setUser((prev) => ({ ...prev, profilePhoto: imageUrl }));
      setFormData((prev) => ({ ...prev, profilePhoto: imageUrl }));

    } catch (err) {
      alert("Profile image upload failed");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="profile-panel">
      <h3 className="panel-title">My Profile</h3>

      {/* ================= AVATAR ================= */}
      <div className="avatar">
        {user.profilePhoto ? (
          <img src={user.profilePhoto} alt="Profile" />
        ) : (
          <span>{user.fullName.charAt(0)}</span>
        )}
      </div>

      <label className="upload-btn">
        {isUploading ? "Uploading..." : "Change Photo"}
        <input
          type="file"
          accept="image/*"
          hidden
          onChange={handlePhotoUpload}
        />
      </label>

      {/* ================= FIELDS ================= */}
      <div className="field">
        <label>Full Name</label>
        {isEditing ? (
          <input
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
          />
        ) : (
          <span>{user.fullName}</span>
        )}
      </div>

      <div className="field">
        <label>Email</label>
        <span className="readonly">{user.email}</span>
      </div>

      <div className="field">
        <label>City</label>
        {isEditing ? (
          <input
            name="city"
            value={formData.city}
            onChange={handleChange}
          />
        ) : (
          <span>{user.city}</span>
        )}
      </div>

      <div className="field">
        <label>Gender</label>
        {isEditing ? (
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
          >
            <option>Male</option>
            <option>Female</option>
            <option>Transgender</option>
            <option>Other</option>
          </select>
        ) : (
          <span>{user.gender}</span>
        )}
      </div>

      {/* ================= ACTIONS ================= */}
      <div className="actions">
        {isEditing ? (
          <>
            <button className="btn primary" onClick={handleSave}>
              Save
            </button>
            <button className="btn secondary" onClick={handleCancel}>
              Cancel
            </button>
          </>
        ) : (
          <button
            className="btn primary full"
            onClick={() => setIsEditing(true)}
          >
            Edit Profile
          </button>
        )}
      </div>
    </div>
  );
}
