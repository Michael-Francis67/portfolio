import {useState, useEffect} from "react";
import {PlusIcon, TrashIcon, UserCircleIcon, CodeBracketIcon, RectangleGroupIcon} from "@heroicons/react/24/outline";
import {useSkillStore} from "../../store/useSkillStore";
import {Loader2} from "lucide-react";
import {useUserStore} from "../../store/useUserStore";
import ProjectForm from "../project-upload-form/project-upload-form.component";
import {useProjectStore} from "../../store/useProjectStore";
import AdminUpdateForm from "../admin-update-form/admin-update-form.component";
import ProfileForm from "../profile-form/profile-form.component";

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState("skills");
    const {adminSkills, createSkill, deleteSkill, loading, fetchAdminSkills} = useSkillStore();
    const {projects, fetchProjects, deleteProject, fetchAProject} = useProjectStore();
    const {user} = useUserStore();
    const [newSkill, setNewSkill] = useState("");

    useEffect(() => {
        fetchAdminSkills();
        fetchProjects();
    }, [fetchAdminSkills, fetchProjects]);

    const addSkill = async () => {
        await createSkill(newSkill);
        setNewSkill("");
    };

    const removeSkill = async (skill) => {
        await deleteSkill(skill);
    };

    const removeProject = async (idToRemove) => {
        await deleteProject(idToRemove);
    };

    const handleClickOpen = async (project) => {
        await fetchAProject(project._id);
        document.getElementById("my_modal_2").showModal();
    };

    return (
        <div className="min-h-screen bg-gray-200 p-4 md:p-6">
            <div className="max-w-6xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">Portfolio Admin Dashboard</h1>
                    <p className="text-gray-600 mt-2">Manage your portfolio content and profile information</p>
                </div>

                {/* Tab Navigation */}
                <div className="flex flex-wrap border-b border-gray-200 mb-6">
                    <button
                        className={`px-4 py-2 font-medium flex items-center ${
                            activeTab === "skills"
                                ? "text-purple-600 border-b-2 border-purple-600"
                                : "text-gray-500 hover:text-gray-700"
                        }`}
                        onClick={() => setActiveTab("skills")}
                    >
                        <CodeBracketIcon className="w-5 h-5 mr-2" />
                        Skills
                    </button>
                    <button
                        className={`px-4 py-2 font-medium flex items-center ${
                            activeTab === "projects"
                                ? "text-purple-600 border-b-2 border-purple-600"
                                : "text-gray-500 hover:text-gray-700"
                        }`}
                        onClick={() => setActiveTab("projects")}
                    >
                        <RectangleGroupIcon className="w-5 h-5 mr-2" />
                        Projects
                    </button>
                    <button
                        className={`px-4 py-2 font-medium flex items-center ${
                            activeTab === "profile"
                                ? "text-purple-600 border-b-2 border-purple-600"
                                : "text-gray-500 hover:text-gray-700"
                        }`}
                        onClick={() => setActiveTab("profile")}
                    >
                        <UserCircleIcon className="w-5 h-5 mr-2" />
                        Profile
                    </button>
                </div>

                {/* Skills Manager */}
                {activeTab === "skills" && (
                    <div className="bg-white rounded-xl shadow-sm p-6">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Manage Skills</h2>
                        <div className="flex flex-col md:flex-row gap-4 mb-6">
                            <input
                                type="text"
                                value={newSkill}
                                onChange={(e) => setNewSkill(e.target.value)}
                                placeholder="Add a new skill"
                                className="flex-grow px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            />
                            <button
                                onClick={addSkill}
                                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 flex items-center justify-center"
                                disabled={loading}
                            >
                                {loading ? (
                                    <>
                                        <Loader2 size={24} className="animate-spin" />
                                        Loading...
                                    </>
                                ) : (
                                    <>
                                        <PlusIcon className="w-5 h-5 mr-1" />
                                        Add Skill
                                    </>
                                )}
                            </button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {adminSkills.map((skill, index) => (
                                <div
                                    key={index}
                                    className="bg-gray-50 rounded-lg p-4 flex justify-between items-center"
                                >
                                    <span className="font-medium">{skill.name}</span>
                                    <button
                                        onClick={() => removeSkill(skill._id)}
                                        className="text-red-500 hover:text-red-700"
                                        disabled={loading}
                                    >
                                        {loading ? (
                                            <Loader2 className="w-5 h-5 animate-spin" />
                                        ) : (
                                            <TrashIcon className="w-5 h-5" />
                                        )}
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Projects Manager */}
                {activeTab === "projects" && (
                    <div className="bg-white rounded-xl shadow-sm p-6">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Manage Projects</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                            <ProjectForm />

                            <div>
                                <h3 className="font-medium text-gray-700 mb-2">Your Projects</h3>
                                <div className="space-y-4 max-h-96 overflow-y-auto overflow-x-hidden">
                                    {projects.map((project) => (
                                        <div key={project._id} className="bg-gray-50 rounded-lg p-4">
                                            <div className="flex justify-between items-start mb-2">
                                                <h4 className="font-medium text-gray-800">{project.title}</h4>
                                                <button
                                                    onClick={() => removeProject(project._id)}
                                                    className="text-red-500 hover:text-red-700"
                                                >
                                                    <TrashIcon className="w-5 h-5" />
                                                </button>
                                            </div>
                                            <p className="text-gray-600 text-sm mb-2">{project.description}</p>
                                            {project.link && (
                                                <>
                                                    <div className="flex justify-start items-center gap-4 mb-4">
                                                        <a
                                                            href={project.link}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="text-purple-600 text-sm hover:underline"
                                                        >
                                                            View Project
                                                        </a>
                                                        <button
                                                            className="text-purple-600 text-sm hover:underline"
                                                            onClick={() => handleClickOpen(project)}
                                                        >
                                                            Update Project
                                                        </button>
                                                    </div>
                                                    <div className="-mb-">
                                                        <img
                                                            src={project.imageUrl}
                                                            alt={project.title}
                                                            className="w-full h-32 object-cover rounded-lg text-white"
                                                        />
                                                    </div>

                                                    <AdminUpdateForm />
                                                </>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Profile Manager */}
                {activeTab === "profile" && (
                    <div className="bg-white rounded-xl shadow-sm p-6">
                        <ProfileForm />
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;
