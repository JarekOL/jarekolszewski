import React from "react";

interface FormTextAreaProps
    extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label: string;
}

const FormTextArea: React.FC<FormTextAreaProps> = ({ label, ...props }) => (
    <label className="block">
        <span className="text-sm font-medium text-gray-700">{label}</span>
        <textarea
            {...props}
            rows={4}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
        />
    </label>
);

export default FormTextArea;
