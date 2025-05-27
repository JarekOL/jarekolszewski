import React from "react";

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
}

const FormInput: React.FC<FormInputProps> = ({ label, ...props }) => (
    <label className="block">
        <span className="text-sm font-medium text-gray-700">{label}</span>
        <input
            {...props}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
        />
    </label>
);

export default FormInput;
