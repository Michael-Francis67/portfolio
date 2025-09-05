import {useState} from "react";
import {Dialog, DialogPanel, PopoverGroup} from "@headlessui/react";
import {Bars3Icon, XMarkIcon} from "@heroicons/react/24/outline";
import {Link} from "react-scroll";
import {Link as LinkRouter} from "react-router-dom";
import DownloadButton from "../DownloadButton/DownloadButton.component";

export default function Navbar({user}) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <header className="bg-white z-50 w-full overflow-hidden shadow fixed top-0">
            <nav aria-label="Global" className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
                <div className="flex lg:flex-1">
                    <span className="sr-only">Your Company</span>
                    <Link
                        to="home"
                        smooth={true}
                        duration={500}
                        spy={true}
                        offset={-70}
                        className="-m-1.5 p-1.5 cursor-pointer"
                    >
                        <svg className="size-12" viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
                            {/* Background circle */}
                            <circle cx="150" cy="150" r="140" fill="#E6F4FA" stroke="#6EC1E4" strokeWidth="6" />

                            {/* "MF" letters */}
                            <text
                                x="50%"
                                y="50%"
                                textAnchor="middle"
                                dominantBaseline="middle"
                                fontFamily="Segoe UI, sans-serif"
                                fontSize="100"
                                fontWeight="bold"
                                fill="#2196F3"
                            >
                                MF
                            </text>

                            {/* Tech icon: small circuit lines */}
                            <line
                                x1="150"
                                y1="10"
                                x2="150"
                                y2="50"
                                stroke="#2196F3"
                                strokeWidth="4"
                                strokeLinecap="round"
                            />
                            <circle cx="150" cy="10" r="6" fill="#2196F3" />

                            <line
                                x1="290"
                                y1="150"
                                x2="250"
                                y2="150"
                                stroke="#2196F3"
                                strokeWidth="4"
                                strokeLinecap="round"
                            />
                            <circle cx="290" cy="150" r="6" fill="#2196F3" />

                            <line
                                x1="150"
                                y1="290"
                                x2="150"
                                y2="250"
                                stroke="#2196F3"
                                strokeWidth="4"
                                strokeLinecap="round"
                            />
                            <circle cx="150" cy="290" r="6" fill="#2196F3" />

                            <line
                                x1="10"
                                y1="150"
                                x2="50"
                                y2="150"
                                stroke="#2196F3"
                                strokeWidth="4"
                                strokeLinecap="round"
                            />
                            <circle cx="10" cy="150" r="6" fill="#2196F3" />
                        </svg>
                    </Link>
                </div>
                <div className="flex lg:hidden">
                    <button
                        type="button"
                        className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                        onClick={() => setMobileMenuOpen(true)}
                    >
                        <span className="sr-only">Open main menu</span>
                        <Bars3Icon aria-hidden="true" className="size-6" />
                    </button>
                </div>
                <PopoverGroup className="hidden lg:flex lg:gap-x-12">
                    <div className="hidden lg:flex lg:gap-x-12">
                        <Link
                            className="text-sky-400 text-sm/6 font-semibold cursor-pointer"
                            to="skills"
                            smooth={true}
                            duration={500}
                            spy={true}
                        >
                            Skills
                        </Link>
                        <Link
                            className="text-sky-400 text-sm/6 font-semibold cursor-pointer"
                            to="projects"
                            smooth={true}
                            duration={500}
                            spy={true}
                        >
                            Projects
                        </Link>
                        <Link
                            className="text-sky-400 text-sm/6 font-semibold cursor-pointer"
                            to="about"
                            smooth={true}
                            duration={500}
                            spy={true}
                        >
                            About
                        </Link>
                        <Link
                            className="text-sky-400 text-sm/6 font-semibold cursor-pointer"
                            to="contacts"
                            smooth={true}
                            duration={500}
                            spy={true}
                        >
                            Contacts
                        </Link>
                        <LinkRouter className="text-sky-400 text-sm/6 font-semibold cursor-pointer" to="/login">
                            Dashboard
                        </LinkRouter>
                    </div>
                </PopoverGroup>
                <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                    <DownloadButton />
                </div>
            </nav>
            <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
                <div className="fixed inset-0 z-50" />
                <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white p-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                    <div className="flex items-center justify-between">
                        <Link
                            to="home"
                            smooth={true}
                            duration={500}
                            spy={true}
                            offset={-70}
                            className="-m-1.5 p-1.5 cursor-pointer flex items-center"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            <span className="sr-only">Your Company</span>
                            <svg className="size-12" viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
                                {/* Background circle */}
                                <circle cx="150" cy="150" r="140" fill="#E6F4FA" stroke="#6EC1E4" strokeWidth="6" />

                                {/* "MF" letters */}
                                <text
                                    x="50%"
                                    y="50%"
                                    textAnchor="middle"
                                    dominantBaseline="middle"
                                    fontFamily="Segoe UI, sans-serif"
                                    fontSize="100"
                                    fontWeight="bold"
                                    fill="#2196F3"
                                >
                                    MF
                                </text>

                                {/* Tech icon: small circuit lines */}
                                <line
                                    x1="150"
                                    y1="10"
                                    x2="150"
                                    y2="50"
                                    stroke="#2196F3"
                                    strokeWidth="4"
                                    strokeLinecap="round"
                                />
                                <circle cx="150" cy="10" r="6" fill="#2196F3" />

                                <line
                                    x1="290"
                                    y1="150"
                                    x2="250"
                                    y2="150"
                                    stroke="#2196F3"
                                    strokeWidth="4"
                                    strokeLinecap="round"
                                />
                                <circle cx="290" cy="150" r="6" fill="#2196F3" />

                                <line
                                    x1="150"
                                    y1="290"
                                    x2="150"
                                    y2="250"
                                    stroke="#2196F3"
                                    strokeWidth="4"
                                    strokeLinecap="round"
                                />
                                <circle cx="150" cy="290" r="6" fill="#2196F3" />

                                <line
                                    x1="10"
                                    y1="150"
                                    x2="50"
                                    y2="150"
                                    stroke="#2196F3"
                                    strokeWidth="4"
                                    strokeLinecap="round"
                                />
                                <circle cx="10" cy="150" r="6" fill="#2196F3" />
                            </svg>
                        </Link>
                        <button
                            type="button"
                            onClick={() => setMobileMenuOpen(false)}
                            className="-m-2.5 rounded-md p-2.5 text-gray-700"
                        >
                            <span className="sr-only">Close menu</span>
                            <XMarkIcon aria-hidden="true" className="size-6" />
                        </button>
                    </div>
                    <div className="mt-6 flow-root">
                        <div className="-my-6 divide-y divide-gray-500/10">
                            <div className="space-y-2 py-6">
                                <div>
                                    <Link
                                        className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50 cursor-pointer"
                                        to="skills"
                                        smooth={true}
                                        duration={500}
                                        spy={true}
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        Skills
                                    </Link>
                                    <Link
                                        className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50 cursor-pointer"
                                        to="projects"
                                        smooth={true}
                                        duration={500}
                                        spy={true}
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        Projects
                                    </Link>
                                    <Link
                                        className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50 cursor-pointer"
                                        to="about"
                                        smooth={true}
                                        duration={500}
                                        spy={true}
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        About
                                    </Link>
                                    <Link
                                        className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50 cursor-pointer"
                                        to="contacts"
                                        smooth={true}
                                        duration={500}
                                        spy={true}
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        Contacts
                                    </Link>
                                    <LinkRouter
                                        className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50 cursor-pointer"
                                        to={"/login"}
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        Dashboard
                                    </LinkRouter>
                                </div>
                            </div>
                            <div
                                className="py-6 flex justify-center items-start flex-col"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                <DownloadButton />
                            </div>
                        </div>
                    </div>
                </DialogPanel>
            </Dialog>
        </header>
    );
}
