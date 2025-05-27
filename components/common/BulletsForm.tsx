"use client";
import React from "react";
import { Control, UseFormRegister, useFieldArray } from "react-hook-form";
import FormInput from "../common/FormInput";
import FormTextArea from "../common/FormTextArea";
import AddButton from "../common/AddButton";
import { FormData } from "@/types/addPages";

interface BulletsFormProps {
    control: Control<FormData>;
    register: UseFormRegister<FormData>;
}

const BulletsForm: React.FC<BulletsFormProps> = ({ control, register }) => {
    const { fields, append, remove } = useFieldArray({
        control,
        name: "content.bullets.items",
    });

    return (
        <div className="space-y-4">
            <FormInput
                label="Tytuł sekcji"
                {...register("content.bullets.title")}
            />
            <FormTextArea
                label="Paragraf"
                {...register("content.bullets.paragraph")}
            />

            <div className="space-y-2">
                <label className="font-semibold">Punkty listy:</label>
                {fields.map((field, index) => (
                    <div key={field.id} className="flex gap-2">
                        <input
                            {...register(
                                `content.bullets.items.${index}.value`
                            )}
                            className="border rounded p-2 w-full"
                        />
                        <button type="button" onClick={() => remove(index)}>
                            Usuń
                        </button>
                    </div>
                ))}
                <AddButton
                    onClick={() => append({ value: "" })}
                    label="Dodaj punkt"
                />
            </div>
        </div>
    );
};

export default BulletsForm;
