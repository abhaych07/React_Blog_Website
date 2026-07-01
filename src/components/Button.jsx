import React from "react";

export default function Button({
    children,
    type = "button",
    className = "",
    ...props
}) {
    return (
        <button
            type={type}
            className={`px-5 py-2.5 rounded-xl font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg active:scale-95 ${className}`}
            {...props}
        >
            {children}
        </button>
    );
}