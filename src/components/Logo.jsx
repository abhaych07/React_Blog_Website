import React from "react";
import { Link } from "react-router-dom";

function Logo() {
    return (
        <Link to="/" className="flex items-center gap-3">
            <div className="h-11 w-11 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-500 flex items-center justify-center text-white text-xl font-bold shadow-md">
                B
            </div>

            <div>
                <h1 className="text-xl font-bold text-gray-900">
                    BlogSpace
                </h1>

                <p className="text-xs text-gray-500 -mt-1">
                    Share Your Ideas
                </p>
            </div>
        </Link>
    );
}

export default Logo;