import React from "react";
import api from "../../lib/axios";

function DownloadButton() {
    const [isDownloading, setIsDownloading] = React.useState(false);

    const handleDownload = async () => {
        try {
            setIsDownloading(true);
            // Fetch the file from backend
            const res = await api.get("/cv", {
                responseType: "blob", // important: tells axios to treat response as a file
            });

            // Handle the response and create a URL for the file
            const url = window.URL.createObjectURL(new Blob([res.data]));

            // Create a temporary link element
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", "My_CV.docx"); // force download with given filename
            document.body.appendChild(link);
            link.click();

            // Cleanup
            link.remove();
            window.URL.revokeObjectURL(url);
        } catch (err) {
            console.error("Download failed:", err);
        } finally {
            setIsDownloading(false);
        }
    };

    return (
        <div>
            <button
                className={`download-btn ${isDownloading ? "downloading" : ""}`}
                onClick={handleDownload}
                disabled={isDownloading}
            >
                {isDownloading ? "Downloading..." : "Download CV"}
                <span className="download-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 16L6 10H9V4H15V10H18L12 16Z" />
                        <path d="M4 18V20H20V18H4Z" />
                    </svg>
                </span>
            </button>
        </div>
    );
}

export default DownloadButton;
