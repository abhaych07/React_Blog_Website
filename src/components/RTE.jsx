import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Controller } from "react-hook-form";

export default function RTE({
    name,
    control,
    label,
    defaultValue = "",
}) {
    return (
        <div className="w-full">
            {label && (
                <label className="inline-block mb-1 pl-1">
                    {label}
                </label>
            )}

            <Controller
                name={name || "content"}
                control={control}
                render={({ field: { onChange, value } }) => (
                    <Editor
                        apiKey={import.meta.env.VITE_TINYMCE_API_KEY}
                        value={value}
                        initialValue={defaultValue}
                        init={{
                            height: 500,
                            menubar: true,

                            plugins: [
                                "advlist",
                                "anchor",
                                "autolink",
                                "charmap",
                                "code",
                                "fullscreen",
                                "help",
                                "image",
                                "insertdatetime",
                                "link",
                                "lists",
                                "media",
                                "preview",
                                "searchreplace",
                                "table",
                                "visualblocks",
                                "wordcount",
                            ],

                            toolbar:
                                "undo redo | blocks | bold italic underline | forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist | link image media table | removeformat | code fullscreen | help",

                            content_style:
                                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                        }}
                        onEditorChange={onChange}
                    />
                )}
            />
        </div>
    );
}