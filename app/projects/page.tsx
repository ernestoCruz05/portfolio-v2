"use client";

import dynamic from "next/dynamic";

const TerminalShowcase = dynamic(
    () => import("../components/TerminalShowcase"),
    { ssr: false }
);

export default function ProjectsPage() {
    return (
        <main className="min-h-screen pt-20 font-sans bg-[#060a12] flex flex-col">
            {/* Terminal fills the remaining space */}
            <div className="flex-1 flex items-center justify-center p-4 md:p-8">
                <TerminalShowcase />
            </div>
        </main>
    );
}