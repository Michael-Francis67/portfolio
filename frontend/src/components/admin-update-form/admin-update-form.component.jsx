import React, {useEffect} from "react";
import {useProjectStore} from "../../store/useProjectStore";
import api from "../../lib/axios";
import axios from "axios";
import {Loader2} from "lucide-react";

const AdminUpdateForm = () => {
    const [title, setTitle] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [link, setLink] = React.useState("");
    const [imageUrl, setImageUrl] = React.useState("");
    const [imagePublicId, setImagePublicId] = React.useState("");
    const [id, setId] = React.useState("");
    const [isLoading, setIsLoading] = React.useState(false);
    const [isUploading, setIsUploading] = React.useState(false);
    const [progress, setProgress] = React.useState(0);
    const {project, updateProject} = useProjectStore();

    useEffect(() => {
        if (project) {
            setTitle(project.title);
            setDescription(project.description);
            setLink(project.link);
            setId(project._id);
            setImageUrl(project.imageUrl);
            setImagePublicId(project.imagePublicId);
        }
    }, [project]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            await updateProject(id, {title, description, link, imageUrl, imagePublicId});
        } catch (error) {
            console.error("Error updating project:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        try {
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

            setImageUrl(uploadRes.data.secure_url);
            setImagePublicId(uploadRes.data.public_id);
            console.log("Uploaded Image URL:", uploadRes.data.secure_url);
            setIsUploading(false);
        } catch (err) {
            console.error("Upload error:", err);
        }
    };

    return (
        <div>
            <div className="justify-center items-center flex max-w-2xl">
                <div>
                    {/* Open the modal using document.getElementById('ID').showModal() method */}
                    <dialog id="my_modal_2" className="modal">
                        <div className="modal-box">
                            <h3 className="font-bold text-lg">Update Project</h3>
                            <div className="py-4">
                                <form onSubmit={handleSubmit} method="dialog" className="modal-backdrop">
                                    <div>
                                        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                                            Project Title
                                        </label>
                                        <input
                                            type="text"
                                            name="title"
                                            id="title"
                                            value={title}
                                            onChange={(e) => setTitle(e.target.value)}
                                            required
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm input focus:border-blue-500 focus:ring-blue-500 text-white"
                                        />
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="description"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            Description
                                        </label>
                                        <textarea
                                            name="description"
                                            id="description"
                                            rows={3}
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                            required
                                            className="mt-1 block w-full textarea rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-white"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="link" className="block text-sm font-medium text-gray-700">
                                            Project Link (Optional)
                                        </label>
                                        <input
                                            type="url"
                                            name="link"
                                            id="link"
                                            value={link}
                                            onChange={(e) => setLink(e.target.value)}
                                            className="mt-1 block w-full textarea rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-white"
                                        />
                                    </div>

                                    <div className="mb-6 p-4 w-full mx-auto">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Project Image
                                        </label>
                                        <input
                                            type="file"
                                            name="imageUrl"
                                            id="imageUrl"
                                            onChange={handleImageUpload}
                                            className="file-input file-input-bordered file-input-accent w-full text-white"
                                        />

                                        {isUploading && (
                                            <div className="mt-4">
                                                <div className="flex items-center gap-2">
                                                    {/* Progress bar */}
                                                    <div className="flex-1 bg-gray-200 rounded-full h-4 overflow-hidden">
                                                        <div
                                                            className="bg-blue-500 h-4 transition-all duration-200"
                                                            style={{
                                                                width: `${progress}%`,
                                                            }}
                                                        />
                                                    </div>
                                                    {/* Percentage text */}
                                                    <span className="text-sm font-medium text-gray-700">
                                                        {progress}%
                                                    </span>
                                                </div>
                                            </div>
                                        )}

                                        {imageUrl && !isUploading && (
                                            <img
                                                src={imageUrl}
                                                alt="Uploaded"
                                                className="mt-4 w-64 rounded-lg shadow-md"
                                            />
                                        )}
                                    </div>

                                    <button
                                        type="submit"
                                        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex justify-center items-center gap-2"
                                        disabled={isLoading || isUploading}
                                    >
                                        {isLoading ? (
                                            <>
                                                <Loader2 className="w-5 h-5 animate-spin" />
                                                Loading...
                                            </>
                                        ) : (
                                            "Save Changes"
                                        )}
                                    </button>
                                </form>

                                <form method="dialog">
                                    {/* if there is a button in form, it will close the modal */}
                                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                                        ✕
                                    </button>
                                </form>
                            </div>
                        </div>
                    </dialog>
                </div>
            </div>
        </div>
    );
};

export default AdminUpdateForm;
