import React from "react";

interface SectionCardProps {
    title: string;
    children: React.ReactNode;
}

const SectionCard: React.FC<SectionCardProps> = ({ title, children }) => (
    <section className="border border-gray-200 rounded-lg shadow-sm p-6 bg-white space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
        {children}
    </section>
);

export default SectionCard;
