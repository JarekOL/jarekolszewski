import React from "react";
import { useFieldArray, Control, UseFormRegister } from "react-hook-form";
import FormInput from "../common/FormInput";
import FormTextArea from "../common/FormTextArea";
import AddButton from "../common/AddButton";
import { FormData } from "@/types/addPages";

interface SubSectionProps {
    control: Control<FormData>;
    register: UseFormRegister<FormData>;
    nestIndex: number;
}

const SubSection: React.FC<SubSectionProps> = ({
    control,
    register,
    nestIndex,
}) => {
    const { fields, append } = useFieldArray({
        control,
        name: `sections.${nestIndex}.subSections`,
    });

    return (
        <div className="space-y-4 mt-4">
            {fields.map((field, j) => (
                <div key={field.id} className="bg-gray-100 p-4 rounded-md">
                    <FormInput
                        label={`H3 ${j + 1}`}
                        {...register(
                            `sections.${nestIndex}.subSections.${j}.h3`
                        )}
                    />
                    <FormTextArea
                        label="Treść"
                        {...register(
                            `sections.${nestIndex}.subSections.${j}.content`
                        )}
                    />
                </div>
            ))}
            <AddButton
                onClick={() => append({ h3: "", content: "" })}
                label="Dodaj podsekcję"
            />
        </div>
    );
};

export default SubSection;
