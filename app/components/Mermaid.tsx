"use client";

import { useEffect, useRef } from "react";
import mermaid from "mermaid";

mermaid.initialize({
    startOnLoad: false,
    theme: "dark",
    flowchart: {
        curve: "basis",
        padding: 20,
    },
    themeVariables: {
        primaryColor: "#3b82f6",
        primaryTextColor: "#f8fafc",
        primaryBorderColor: "#60a5fa",
        lineColor: "#60a5fa",
        secondaryColor: "#1e293b",
        tertiaryColor: "#0f172a",
        background: "#0a0f1a",
        mainBkg: "#1e293b",
        secondBkg: "#0f172a",
        border1: "#334155",
        border2: "#475569",
        fontFamily: "ui-monospace, monospace",
        fontSize: "16px",
    },
});

export default function Mermaid({ chart }: { chart: string }) {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (ref.current) {
            mermaid.run({ nodes: [ref.current] });
        }
    }, [chart]);

    return (
        <div className="my-8 flex justify-center">
            <div 
                ref={ref} 
                className="mermaid bg-[#0a0f1a] p-8 rounded-lg overflow-x-auto w-full max-w-4xl [&_svg]:w-full [&_svg]:min-h-[400px]"
            >
                {chart}
            </div>
        </div>
    );
}
