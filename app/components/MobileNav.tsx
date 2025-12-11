"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function MobileNav() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="md:hidden">
            {/* Hamburger Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="relative w-10 h-10 flex flex-col justify-center items-center gap-1.5"
                aria-label="Toggle menu"
            >
                <span className={`w-6 h-0.5 bg-gray-800 block transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-2' : ''}`} />
                <span className={`w-6 h-0.5 bg-gray-800 block transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`} />
                <span className={`w-6 h-0.5 bg-gray-800 block transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </button>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
                        />
                        
                        {/* Menu Panel - Full screen overlay */}
                        <motion.nav
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.2 }}
                            className="fixed inset-x-4 top-4 bg-white rounded-2xl z-[101] shadow-2xl overflow-hidden"
                        >
                            {/* Header with close button */}
                            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                                <span className="font-mono text-sm text-gray-500">menu</span>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
                                    aria-label="Close menu"
                                >
                                    <svg className="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            <div className="p-6">
                                {/* Navigation Links */}
                                <div className="space-y-1">
                                    <Link
                                        href="/"
                                        onClick={() => setIsOpen(false)}
                                        className="flex items-center gap-3 py-3 px-4 text-lg font-medium text-gray-800 hover:bg-blue-50 hover:text-blue-700 rounded-xl transition-colors"
                                    >
                                        <span className="text-gray-400">01</span>
                                        Home
                                    </Link>
                                    <Link
                                        href="/projects"
                                        onClick={() => setIsOpen(false)}
                                        className="flex items-center gap-3 py-3 px-4 text-lg font-medium text-gray-800 hover:bg-blue-50 hover:text-blue-700 rounded-xl transition-colors"
                                    >
                                        <span className="text-gray-400">02</span>
                                        Deployments
                                    </Link>
                                    <Link
                                        href="/blog"
                                        onClick={() => setIsOpen(false)}
                                        className="flex items-center gap-3 py-3 px-4 text-lg font-medium text-gray-800 hover:bg-blue-50 hover:text-blue-700 rounded-xl transition-colors"
                                    >
                                        <span className="text-gray-400">03</span>
                                        Blog
                                    </Link>
                                    <Link
                                        href="/#contact"
                                        onClick={() => setIsOpen(false)}
                                        className="flex items-center gap-3 py-3 px-4 text-lg font-medium text-gray-800 hover:bg-blue-50 hover:text-blue-700 rounded-xl transition-colors"
                                    >
                                        <span className="text-gray-400">04</span>
                                        Uplink
                                    </Link>
                                </div>

                                {/* Divider */}
                                <div className="my-5 border-t border-gray-100" />

                                {/* CV Download */}
                                <a
                                    href="/assets/CV_Faky.pdf"
                                    target="_blank"
                                    className="flex items-center justify-center gap-2 py-3.5 px-4 bg-gray-900 text-white rounded-xl font-semibold text-sm hover:bg-gray-800 transition-colors"
                                >
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                    Download CV
                                </a>

                                {/* Social Links */}
                                <div className="mt-6 pt-5 border-t border-gray-100 flex justify-center gap-4">
                                    <a
                                        href="https://github.com/ernestoCruz05"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-11 h-11 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900 transition-colors"
                                    >
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                            <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                                        </svg>
                                    </a>
                                    <a
                                        href="https://linkedin.com/in/ernestoCruz05"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-11 h-11 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900 transition-colors"
                                    >
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </motion.nav>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}