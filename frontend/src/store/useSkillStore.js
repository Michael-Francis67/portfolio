import {create} from "zustand";
import {toast} from "react-hot-toast";
import api from "../lib/axios";

export const useSkillStore = create((set, get) => ({
    skills: [],
    adminSkills: [],
    loading: false,
    otherDetails: {},
    current: 1,
    hasToastBeenShown: false,
    totalPage: 1,

    fetchSkills: async (page) => {
        set({loading: true});
        try {
            const res = await api.get(`/skills?page=${page}`);
            console.log(res.data);
            set({
                skills: res.data?.skills,
                totalPage: res.data?.pagination?.total,
                loading: false,
                otherDetails: res.data?.pagination,
            });
        } catch (error) {
            console.log("Error fetching skills", error);
            set({loading: false});
        }
    },

    fetchAdminSkills: async () => {
        set({loading: true});
        try {
            const res = await api.get("/skills/admin");
            console.log(res.data);
            set({adminSkills: res.data, loading: false});
        } catch (error) {
            console.log("Error fetching skills", error);
            set({loading: false});
        }
    },

    createSkill: async (name) => {
        set({loading: true});
        try {
            const res = await api.post("/skills", {name});
            console.log(res.data);
            get().fetchAdminSkills();
            toast.success("Skill added successfully");
        } catch (error) {
            console.log("Error fetching skills", error);
            get().handleToastShown("Error occured", "error");
        } finally {
            set({loading: false});
        }
    },

    deleteSkill: async (id) => {
        set({loading: true});
        try {
            const res = await api.delete(`/skills/${id}`);
            console.log(res.data);
            get().fetchAdminSkills();
            toast.success("Skill deleted successfully");
        } catch (error) {
            console.log("Error fetching skills", error);
            get().handleToastShown("Error occured", "error");
        } finally {
            set({loading: false});
        }
    },

    updateCurrentPage: (type) => {
        if (type === "increase") {
            set({current: current + 1});
            get().fetchSkills(current);
        } else if (type === "decrease") {
            set({current: current - 1});
            get().fetchSkills(current);
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
