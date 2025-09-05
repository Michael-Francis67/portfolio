import {motion} from "framer-motion";
import {Element} from "react-scroll";
import {Link} from "react-router-dom";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner.component";
import {useProjectStore} from "../../store/useProjectStore";
import {useEffect, useState} from "react";
import {ArrowLeft, ArrowRight} from "lucide-react";

const ProjectsComponent = () => {
    const [current, setCurrent] = useState(1);
    const {projects, fetchProjects, loading, totalPage} = useProjectStore();

    useEffect(() => {
        fetchProjects(current);
    }, [current]);

    if (loading) return <LoadingSpinner />;

    return (
        <motion.div
            initial={{opacity: 0, x: -50}}
            whileInView={{opacity: 1, x: 0}}
            transition={{duration: 0.8, ease: "easeOut"}}
            viewport={{once: true}}
        >
            <Element
                name="projects"
                className="bg-slate-900 text-white mt-5 py-16 px-6 w-screen sm:w-auto overflow-x-hidden"
            >
                <main className="max-w-7xl mx-auto">
                    <div className="flex justify-center items-center mb-8">
                        <h2 className="text-4xl font-bold">Projects</h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {projects.length > 0 ? (
                            projects.map((p) => (
                                <div key={p._id}>
                                    <div className="card card-compact w-auto h-full bg-base-100 shadow-xl">
                                        <figure>
                                            <img src={p.imageUrl} alt={p.title} className="object-cover h-48 w-full" />
                                        </figure>
                                        <div className="card-body">
                                            <h2 className="card-title">{p.title}</h2>
                                            <p>{p.description}</p>
                                            <div className="card-actions justify-end">
                                                <Link
                                                    target="_blank"
                                                    to={p.link}
                                                    className="btn btn-outline btn-accent"
                                                >
                                                    View Project
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-center text-xl font-semibold">No projects available</p>
                        )}
                    </div>
                </main>

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
            </Element>
        </motion.div>
    );
};

export default ProjectsComponent;
