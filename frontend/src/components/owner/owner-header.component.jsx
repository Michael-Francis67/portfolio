// frontend/src/components/AdminDashboard.jsx
import {EyeIcon, Loader, Menu, X} from "lucide-react";
import {useState} from "react";
import {useUserStore} from "../../store/useUserStore";
import {useNavigate} from "react-router-dom";
import {EyeSlashIcon} from "@heroicons/react/24/outline";

const AdminDashboard = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const {logout, loading} = useUserStore();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate("/");
    };

    return (
        <header className="flex w-screen justify-between items-center h-20 bg-white overflow-hidden">
            <section className="flex justify-between items-center w-full h-full px-4 py-8 max-w-7xl">
                <div>
                    <h1 className="text-xl whitespace-nowrap text-black uppercase">My Portfolio</h1>
                </div>

                <div onClick={() => setMobileMenuOpen(true)} className="lg:hidden max-lg:visible">
                    <Menu aria-hidden="true" size={68} className="btn btn-ghost text-black" />
                </div>

                <div className="max-lg:hidden">
                    <ul className="flex justify-center items-center gap-4">
                        <li className="text-black capitalize p-2 rounded-lg hover:text-blue-400 transition-all duration-300 w-full cursor-pointer">
                            home
                        </li>
                        <li className="flex justify-center items-center gap-3">
                            <button
                                type="button"
                                className="btn btn-outline btn-accent whitespace-nowrap"
                                onClick={handleLogout}
                                disabled={loading}
                            >
                                {loading ? (
                                    <>
                                        <Loader size={24} className="animate-spin" />
                                        Logining out
                                    </>
                                ) : (
                                    "Logout"
                                )}
                            </button>
                        </li>
                    </ul>
                </div>

                <div
                    className={
                        mobileMenuOpen
                            ? "h-screen px-4 py-8 w-screen z-50 fixed right-0 bottom-0 top-0 max-lg:left-0 bg-white text-black flex flex-col justify-start items-start gap-4"
                            : "hidden"
                    }
                >
                    <nav className="w-full">
                        <div className="flex justify-between items-center flex-row">
                            <div className="">
                                <h1 className="text-xl whitespace-nowrap text-black uppercase hover:text-blue-400 cursor-pointer transition-all duration-200">
                                    My Portfolio
                                </h1>
                            </div>
                            <div className="flex justify-center items-center" onClick={() => setMobileMenuOpen(false)}>
                                <X size={68} className="btn btn-ghost text-black" />
                            </div>
                        </div>
                        <hr className="w-full text-gray-600 my-9" />
                        <ul className="flex flex-col justify-center items-start gap-4">
                            <li className="text-black capitalize hover:bg-gray-400 p-2 rounded-lg transition-all duration-300 w-full cursor-pointer">
                                Home
                            </li>
                            <li className="flex justify-center items-center gap-3">
                                <button
                                    type="button"
                                    className="btn btn-outline btn-accent whitespace-nowrap"
                                    onClick={handleLogout}
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <>
                                            <Loader size={24} className="animate-spin" />
                                            Logining out...
                                        </>
                                    ) : (
                                        "Logout"
                                    )}
                                </button>
                            </li>
                        </ul>
                    </nav>
                </div>
            </section>
        </header>
    );
};

export default AdminDashboard;
