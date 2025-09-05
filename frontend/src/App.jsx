import {Route, Routes, useNavigate} from "react-router-dom";
import HomePage from "./pages/home.pages";
import "./App.css";
import {useUserStore} from "./store/useUserStore";
import {useEffect} from "react";
import {useErrorStore} from "./store/useErrorStore";
import React from "react";

const OwnerPage = React.lazy(() => import("./pages/owner.page"));
const AdminLogin = React.lazy(() => import("./components/admin-login/admin-login.component"));
const ErrorBanner = React.lazy(() => import("./components/Error-banner/errror-banner.component"));

const App = () => {
    const {isLoggedIn, user, checkAuth} = useUserStore();
    const {message} = useErrorStore();

    useEffect(() => {
        checkAuth();
    }, [checkAuth]);

    if (message) return <ErrorBanner />;

    return (
        <div className="flex flex-col gap-2 overflow-x-hidden overflow-y-auto">
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={!user && !isLoggedIn ? <AdminLogin /> : <OwnerPage />} />
                <Route path="/admin" element={user && isLoggedIn ? <OwnerPage /> : <HomePage />} />
            </Routes>
        </div>
    );
};

export default App;
