import React from "react";

interface AddButtonProps {
    onClick: () => void;
    label: string;
}

const AddButton: React.FC<AddButtonProps> = ({ onClick, label }) => (
    <button
        type="button"
        onClick={onClick}
        className="text-sm px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg"
    >
        ➕ {label}
    </button>
);

export default AddButton;
