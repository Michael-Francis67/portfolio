import {create} from "zustand";
import toast from "react-hot-toast";
import api from "../lib/axios";

export const useUserStore = create((set, get) => ({
    user: null,
    error: null,
    loading: false,
    isLoggedIn: false,
    hasToastBeenShown: false,

    login: async (username, password) => {
        set({loading: true, error: null});
        try {
            const res = await api.post("/auth/login", {username, password});
            console.log(res.data);
            set({user: res.data?.user, isLoggedIn: true});
            get().handleToastShown(res.data?.message, "success");
        } catch (error) {
            console.log("Error in login function", error.message);
            get().handleToastShown("Something went wrong.", "error");
            set({error: error?.response?.data?.message || "Error Occured"});
        } finally {
            set({loading: false});
        }
    },

    checkAuth: async () => {
        set({loading: true, error: null});
        try {
            const res = await api.get("/auth/me");
            console.log(res.data);
            set({user: res.data, isLoggedIn: true});
        } catch (error) {
            console.log("Error in check auth function", error.message);
            get().handleToastShown("Something went wrong.", "error");
            set({error: error?.response?.data?.message || "Error Occured"});
            set({user: null, isLoggedIn: false});
        } finally {
            set({loading: false});
        }
    },

    logout: async () => {
        set({loading: true, error: null});
        try {
            const res = await api.post("/auth/logout");
            set({user: null, isLoggedIn: false});
            get().handleToastShown(res.data?.message, "success");
        } catch (error) {
            console.log("Error in logout function", error.message);
            get().handleToastShown("Something went wrong.", "error");
            set({error: error?.response?.data?.message || "Error Occured"});
        } finally {
            set({loading: false});
        }
    },

    handleToastShown: (message, type) => {
        if (!get().hasToastBeenShown) {
            if (type === "success") {
                toast.success(message);
                set({hasToastBeenShown: true});
            } else {
                toast.error(message);
                set({hasToastBeenShown: true});
            }
        }
    },
}));
