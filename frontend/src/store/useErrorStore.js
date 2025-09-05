// errorStore.js
import {create} from "zustand";

export const useErrorStore = create((set) => ({
    message: "",
    setMessage: (msg) => set({message: msg}),
    clearMessage: () => set({message: ""}),
}));
