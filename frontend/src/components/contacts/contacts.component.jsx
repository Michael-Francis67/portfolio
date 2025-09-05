import {useRef} from "react";
import {motion} from "framer-motion";
import {Element} from "react-scroll";
import useContactStore from "../../store/useContactStore";
import toast from "react-hot-toast";

const ContactsComponent = () => {
    const formRef = useRef();

    const {loading, sendEmail} = useContactStore();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formRef.current.Element === "") {
            toast.error("Please fill out this field");
            formRef.current.Element.focus();
        }

        await sendEmail(formRef.current);
    };

    return (
        <motion.div
            initial={{opacity: 0, x: -50}}
            whileInView={{opacity: 1, x: 0}}
            transition={{duration: 0.8, ease: "easeOut"}}
            viewport={{once: true}}
            className="max-w-2xl mx-auto p-6 bg-slate-900 rounded-lg shadow-lg flex flex-col mt-5 justify-center items-center mb-10"
        >
            <Element name="contacts">
                <h2 className="text-3xl font-bold text-white mb-6">Contact Me</h2>
                <form onSubmit={handleSubmit} ref={formRef}>
                    <div className="flex flex-col gap-4 w-full justify-center items-center mb-6">
                        <input
                            type="text"
                            name="name"
                            placeholder="Enter name"
                            className="input input-bordered input-accent w-full max-w-full"
                            required
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter email"
                            className="input input-bordered input-accent w-full max-w-full"
                            required
                        />
                        <input
                            type="text"
                            name="subject"
                            placeholder="Enter subject"
                            className="input input-bordered input-accent w-full max-w-full"
                            required
                        />
                        <textarea
                            name="message"
                            className="textarea textarea-accent w-full h-32"
                            placeholder="Type your message here..."
                            required
                        />
                    </div>
                    <div className="card-actions justify-end">
                        <button className="btn btn-accent btn-outline" type="submit">
                            {loading ? (
                                <span className="loading text-center loading-spinner loading-sm"></span>
                            ) : (
                                "Send message"
                            )}
                        </button>
                    </div>
                </form>
            </Element>
        </motion.div>
    );
};

export default ContactsComponent;
