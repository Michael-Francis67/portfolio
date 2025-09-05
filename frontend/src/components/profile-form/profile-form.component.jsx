import axios from "axios";
import api from "../../lib/axios";
import toast from "react-hot-toast";
import {Loader2} from "lucide-react";
import UpdateCV from "../UpdateButton/UpdateButton.component";
import {useEffect, useState} from "react";
import {useUserStore} from "../../store/useUserStore";

const ProfileForm = () => {
    const [profilePic, setProfilePic] = useState("");
    const [publicId, setPublicId] = useState("");
    const [name, setName] = useState("");
    const [title, setTitle] = useState("");
    const [bio, setBio] = useState("");
    const [username, setUsername] = useState("");
    const [isUploading, setIsUploading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [preview, setPreview] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const {user} = useUserStore();

    useEffect(() => {
        setProfilePic(user.profilePic);

        setName(user.name);
        setTitle(user.title);
        setBio(user.bio);
        setUsername(user.username);
    }, [user]);

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        try {
            setPreview(URL.createObjectURL(file));
            setIsUploading(true);
            // Step 1: Get signature from backend
            const sigRes = await api.get("/upload/signature");
            const {timestamp, signature, apiKey, cloudName} = sigRes.data;

            // Step 2: Prepare form data
            const formData = new FormData();
            formData.append("file", file);
            formData.append("api_key", apiKey);
            formData.append("timestamp", timestamp);
            formData.append("signature", signature);

            // Step 3: Upload to Cloudinary
            const uploadRes = await axios.post(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, formData, {
                headers: {"Content-Type": "multipart/form-data"},
                onUploadProgress: (progressEvent) => {
                    const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    setProgress(percentCompleted);
                },
            });
            console.log(uploadRes.data);

            setProfilePic(uploadRes.data.secure_url);
            setPublicId(uploadRes.data.public_id);
            console.log("Uploaded Image URL:", uploadRes.data.secure_url);

            setPreview(uploadRes.data.secure_url);
            setIsUploading(false);
        } catch (err) {
            console.error("Upload error:", err);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        // Handle form submission
        try {
            const res = await api.put("/auth/profile", {profilePic, publicId, name, title, bio, username});
            console.log("Profile updated successfully", res.data);
            toast.success("Profile updated successfully");
            setIsLoading(false);
        } catch (error) {
            console.error("Profile update error:", error);
            toast.error("Failed to update profile");
            setIsLoading(false);
        }
    };
    return (
        <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Manage Profile</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <form onSubmit={handleSubmit}>
                    <div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Professional Title</label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            />
                        </div>
                    </div>

                    <button type="submit" className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
                        {isLoading ? (
                            <div className="flex items-center justify-center gap-2">
                                <Loader2 className="animate-spin h-4 w-4 mr-2" />
                                Saving...
                            </div>
                        ) : (
                            "Save Changes"
                        )}
                    </button>
                </form>

                <div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                        <textarea
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                            rows="5"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Profile Photo</label>
                        <div className="flex items-center space-x-4 relative">
                            <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                                {preview ? (
                                    <img
                                        src={preview}
                                        alt="profile-pic"
                                        className="w-10 h-10 text-gray-400 object-cover rounded-full"
                                    />
                                ) : (
                                    <img
                                        src={profilePic}
                                        alt="profile-pic"
                                        className="w-10 h-10 text-gray-400 object-cover rounded-full"
                                    />
                                )}
                            </div>
                            {isUploading && (
                                <div className="absolute inset-0 max-w-2xl flex items-center justify-center bg-black bg-opacity-50">
                                    <span className="text-white">Uploading...</span>
                                    <div className="relative w-full h-2 bg-gray-300 rounded-full">
                                        <div
                                            className="absolute top-0 left-0 h-full bg-purple-600 rounded-full"
                                            style={{width: `${progress}%`}}
                                        />
                                    </div>
                                </div>
                            )}
                            <label className="cursor-pointer">
                                <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
                                    Change Photo
                                </span>
                                <input type="file" className="hidden" onChange={handleImageUpload} />
                            </label>
                        </div>

                        <UpdateCV />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileForm;
