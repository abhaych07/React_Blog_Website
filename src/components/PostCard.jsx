import React from "react";
import { Link } from "react-router-dom";
import appwriteService from "../appwrite/config";

function PostCard({ $id, title, featuredImage }) {
    return (
        <Link to={`/post/${$id}`}>
            <article className="overflow-hidden rounded-2xl bg-white shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">

                <div className="overflow-hidden">
                    <img
                        src={appwriteService.getFileView(featuredImage)}
                        alt={title}
                        className="h-56 w-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                </div>

                <div className="p-6">
                    <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-600">
                        Blog
                    </span>

                    <h2 className="mt-4 text-xl font-bold text-gray-800 line-clamp-2">
                        {title}
                    </h2>

                    <p className="mt-4 text-indigo-600 font-semibold">
                        Read More →
                    </p>
                </div>
            </article>
        </Link>
    );
}

export default PostCard;