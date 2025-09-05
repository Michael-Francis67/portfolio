import {create} from "zustand";
import toast from "react-hot-toast";
import api from "../lib/axios";

export const useProjectStore = create((set, get) => ({
    projects: [],
    loading: false,
    error: null,
    current: 1,
    totalPage: 1,
    hasToastBeenShown: false,
    id: null,
    project: null,

    fetchProjects: async () => {
        set({loading: true, error: null});
        try {
            const res = await api.get("/projects");
            console.log(res.data);
            set({projects: res.data?.projects, totalPage: res.data?.pagination?.total});
            get().handleToastShown("Project fetched successfully", "success");
        } catch (error) {
            console.log("Error occured", error.response?.data?.message);
            set({error: error.response?.data?.message});
            get().handleToastShown("Error occured", "error");
        } finally {
            set({loading: false});
        }
    },

    fetchAProject: async (id) => {
        set({loading: true, error: null});
        try {
            const res = await api.get(`/projects/${id}`);
            console.log(res.data);
            set({id: res.data?._id, project: res.data});
            get().handleToastShown("Project fetched successfully", "success");
        } catch (error) {
            console.log("Error occured", error);
            set({error: error.response?.data?.message});
            get().handleToastShown("Error occured", "error");
        } finally {
            set({loading: false});
        }
    },

    createProject: async ({title, description, link, imageUrl, imagePublicId}) => {
        set({loading: true, error: null});
        try {
            const res = await api.post("/projects", {title, description, link, imageUrl, imagePublicId});
            console.log(res.data);
            get().fetchProjects();
            get().handleToastShown("Project added successfully", "success");
        } catch (error) {
            console.log("Error occured", error.response?.data?.message);
            set({error: error.response?.data?.message});
            get().handleToastShown("Error occured", "error");
        } finally {
            set({loading: false});
        }
    },

    deleteProject: async (id) => {
        set({loading: true, error: null});
        try {
            const res = await api.delete(`/projects/${id}`);
            console.log(res.data);
            get().fetchProjects();
            get().handleToastShown("Project deleted successfully", "success");
        } catch (error) {
            console.log("Error occured", error.response?.data?.message);
            set({error: error.response?.data?.message});
            get().handleToastShown("Error occured", "error");
        } finally {
            set({loading: false});
        }
    },

    updateProject: async (id, {title, description, link, imageUrl, imagePublicId}) => {
        set({loading: true, error: null});
        try {
            const res = await api.put(`/projects/${id}`, {title, description, link, imageUrl, imagePublicId});
            console.log(res.data);
            get().fetchProjects();
            get().handleToastShown("Project updated successfully", "success");
        } catch (error) {
            console.log("Error occured", error.response?.data?.message);
            set({error: error.response?.data?.message});
            get().handleToastShown("Error occured", "error");
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
