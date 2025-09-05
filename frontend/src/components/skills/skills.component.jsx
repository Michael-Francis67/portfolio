import {motion} from "framer-motion";
import {Element} from "react-scroll";
import {useSkillStore} from "../../store/useSkillStore";
import {ArrowLeft, ArrowRight} from "lucide-react";
import {useEffect, useState} from "react";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner.component";
import {TrashIcon} from "@heroicons/react/24/outline";

export default function SkillsComponent() {
    const [current, setCurrent] = useState(1);
    const {skills, fetchSkills, loading, user, totalPage} = useSkillStore();

    useEffect(() => {
        fetchSkills(current);
    }, [current]);

    if (loading) return <LoadingSpinner />;

    return (
        <Element name="skills">
            <section className="bg-slate-900 text-white mt-5 py-16 px-6 md:px-12">
                <motion.div
                    initial={{opacity: 0, x: -50}}
                    whileInView={{opacity: 1, x: 0}}
                    transition={{duration: 0.8, ease: "easeOut"}}
                    viewport={{once: true}}
                    className="max-w-5xl mx-auto"
                >
                    {/* Header */}
                    <div className="flex justify-center items-center mb-8">
                        <h2 className="text-4xl font-bold">Skills</h2>
                    </div>

                    {/* Skills list */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {skills.length > 0 ? (
                            skills.map((skill) => (
                                <div
                                    key={skill._id}
                                    className="bg-slate-800 p-4 rounded-lg text-center border border-sky-400/30 hover:border-sky-400 transition-all duration-300"
                                >
                                    <h3 className="text-lg font-semibold">{skill.name}</h3>
                                    <div>
                                        {user?.username === "admin" ? (
                                            <>
                                                <TrashIcon className="w-5 h-5" />
                                            </>
                                        ) : (
                                            ""
                                        )}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-center text-xl font-semibold">No skill available</p>
                        )}
                    </div>

                    <div className="join mt-10 w-full flex justify-center items-center">
                        <button
                            onClick={() => setCurrent((prev) => Math.max(prev - 1, 1))}
                            disabled={current === 1}
                            className={current === 1 ? "btn-disabled btn join-item" : "join-item btn"}
                        >
                            <ArrowLeft />
                        </button>
                        {[...Array(totalPage)].map((_, index) => (
                            <button
                                className={index + 1 === current ? "join-item btn btn-active" : "join-item btn"}
                                key={index}
                            >
                                {index + 1}
                            </button>
                        ))}
                        <button
                            onClick={() => setCurrent((prev) => (prev < totalPage ? prev + 1 : prev))}
                            disabled={current === totalPage}
                            className={current === totalPage ? "btn join-item btn-disabled" : "join-item btn"}
                        >
                            <ArrowRight />
                        </button>
                    </div>
                </motion.div>
            </section>
        </Element>
    );
}
