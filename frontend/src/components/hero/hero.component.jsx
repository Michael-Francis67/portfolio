import {ReactTyped} from "react-typed";
import {motion} from "framer-motion";
import {Link} from "react-scroll";

export default function Hero() {
    const handleClick = () => {};
    return (
        <section className="h-screen flex items-center bg-gray-900 text-white px-10">
            <motion.div
                initial={{opacity: 0, x: -50}}
                whileInView={{opacity: 1, x: 0}}
                transition={{duration: 0.8, ease: "easeOut"}}
                viewport={{once: true}}
            >
                {/* Welcome Text */}
                <motion.h1
                    className="text-4xl md:text-6xl font-bold mb-4 max-lg:text-2xl"
                    initial={{opacity: 0, y: -20}}
                    whileInView={{opacity: 1, y: 0}}
                    transition={{delay: 0.2, duration: 0.8}}
                >
                    Welcome to my portfolio
                </motion.h1>

                {/* Name */}
                <motion.h2
                    className="text-3xl md:text-5xl font-semibold mb-4 max-lg:text-xl"
                    initial={{opacity: 0, y: -20}}
                    whileInView={{opacity: 1, y: 0}}
                    transition={{delay: 0.4, duration: 0.8}}
                >
                    Hi, I'm <span className="text-blue-400">Michael</span>
                </motion.h2>

                {/* Typing Animation */}
                <ReactTyped
                    strings={["Full-Stack Developer", "Building Scalable Apps", "Turning Ideas into Reality"]}
                    typeSpeed={50}
                    backSpeed={30}
                    loop
                    className="text-xl md:text-2xl text-gray-300"
                />

                {/* Short Description */}
                <motion.p
                    className="mt-6 max-w-full text-gray-400"
                    initial={{opacity: 0, y: 20}}
                    whileInView={{opacity: 1, y: 0}}
                    transition={{delay: 0.6, duration: 0.8}}
                >
                    I design and develop modern, responsive, and efficient applications that bring ideas to life. Let’s
                    create something amazing together.
                </motion.p>

                {/* Call to Action Buttons */}
                <motion.div
                    className="mt-6 flex space-x-4 max-lg:flex-col max-lg:gap-2 max-lg:items-start"
                    initial={{opacity: 0, y: 20}}
                    whileInView={{opacity: 1, y: 0}}
                    transition={{delay: 0.8, duration: 0.8}}
                >
                    <div className="flex flex-col justify-center items-center gap-2 sm:flex-row">
                        <Link
                            to="projects"
                            smooth
                            offset={-70}
                            spy
                            className="bg-blue-500 px-6 py-3 rounded-lg text-white font-medium hover:bg-blue-600 transition cursor-pointer whitespace-nowrap"
                        >
                            View Projects
                        </Link>
                        <Link
                            to="contacts"
                            smooth={true}
                            duration={500}
                            spy={true}
                            offset={-70}
                            className="border border-blue-500 px-6 py-3 rounded-lg text-blue-400 font-medium hover:bg-blue-500 hover:text-white transition cursor-pointer whitespace-nowrap"
                        >
                            Contact Me
                        </Link>
                    </div>
                </motion.div>
            </motion.div>
        </section>
    );
}
