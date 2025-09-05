import toast from "react-hot-toast";
import {create} from "zustand";
import emailjs from "@emailjs/browser";

const useContactStore = create((set) => ({
    loading: false,

    sendEmail: async (ref) => {
        set({loading: true});
        try {
            await emailjs.sendForm("service_qvlno9q", "template_3vf2wx5", ref, {
                publicKey: "e0SIOARMR2sRAfmVR",
            });
            toast.success("Email send successfully");
            set({loading: false});
        } catch (error) {
            console.error("Error sending email", error);
            toast.error("Something went wrong");
        }
    },
}));

export default useContactStore;
