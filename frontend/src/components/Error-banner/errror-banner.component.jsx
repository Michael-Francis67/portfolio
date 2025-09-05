import {useErrorStore} from "../../store/useErrorStore";

function ErrorBanner() {
    const {message, clearMessage} = useErrorStore();
    if (!message) return null;

    return (
        <div className="bg-red-500 text-white p-2 rounded">
            {message}
            <button onClick={clearMessage} className="ml-2">
                ✖
            </button>
        </div>
    );
}

export default ErrorBanner;
