import React from "react";
import {motion} from "framer-motion";
import {Element} from "react-scroll";
import {useUserStore} from "../../store/useUserStore";

export default function AboutSection() {
    const {user} = useUserStore();
    return (
        <Element name="about">
            <section className="bg-slate-900 text-white py-16 px-6 md:px-12">
                <motion.div
                    initial={{opacity: 0, x: -50}}
                    whileInView={{opacity: 1, x: 0}}
                    transition={{duration: 0.8, ease: "easeOut"}}
                    viewport={{once: true}}
                    className="max-w-4xl mx-auto text-center"
                >
                    <h2 className="text-4xl font-bold mb-6">
                        About <span className="text-sky-400">Me</span>
                    </h2>

                    <p className="text-lg text-gray-300 leading-relaxed mb-6">
                        I’m a passionate developer focused on creating modern, high-performing, and visually appealing
                        digital experiences. I specialize in building full-stack applications using{" "}
                        <span className="text-sky-400 font-semibold">React</span>,{" "}
                        <span className="text-sky-400 font-semibold">Node.js</span>, and other cutting-edge web
                        technologies.
                    </p>

                    <p className="text-lg text-gray-300 leading-relaxed mb-6">{user?.bio}</p>

                    <p className="text-lg text-gray-300 leading-relaxed mb-6">
                        My work combines clean design principles with efficient, scalable code to deliver projects that
                        not only look great but also perform seamlessly. I enjoy solving complex problems, optimizing
                        performance, and creating user interfaces that feel intuitive and engaging.
                    </p>

                    <p className="text-lg text-gray-300 leading-relaxed">
                        Whether it’s building an e-commerce store, designing a portfolio, or developing a complete web
                        application, I aim to turn ideas into reality with precision, creativity, and attention to
                        detail.
                    </p>
                </motion.div>
            </section>
        </Element>
    );
}
