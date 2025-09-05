import {useState} from "react";
import api from "../../lib/axios";
import toast from "react-hot-toast";

function UpdateCV() {
    const [file, setFile] = useState(null);
    const [isUploading, setIsUploading] = useState(false);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]); // capture the file
    };

    const handleUpload = async () => {
        if (!file) {
            toast.error("Please select a file first");
            return;
        }

        setIsUploading(true);
        const formData = new FormData();
        formData.append("file", file); // must match backend upload.single("file")

        try {
            const res = await api.put("/cv/update", formData, {
                headers: {"Content-Type": "multipart/form-data"},
            });
            toast.success(res.data.message || "CV updated successfully");
        } catch (err) {
            console.error(err);
            toast.error("Upload failed");
        } finally {
            setIsUploading(false);
            setFile(null); // reset file input
            document.getElementById("file").value = ""; // clear the file input
        }
    };

    return (
        <div className="p-4 flex max-lg:flex-col justify-center items-center gap-3">
            <input
                type="file"
                accept=".pdf,.doc,.docx"
                id="file"
                onChange={handleFileChange}
                className="file-input file-input-bordered file-input-accent w-full max-w-xs"
            />
            <button
                onClick={handleUpload}
                className="ml-2 px-4 py-2 bg-green-600 text-white rounded"
                disabled={isUploading}
            >
                {isUploading ? "Uploading..." : "Update CV"}
            </button>
        </div>
    );
}

export default UpdateCV;
