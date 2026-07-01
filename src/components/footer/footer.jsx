import React from "react";
import { Link } from "react-router-dom";
import Logo from "../Logo";

function Footer() {
    return (
        <footer className="border-t bg-white mt-16">

            <div className="mx-auto max-w-7xl px-6 py-10">

                <div className="flex flex-col items-center justify-between gap-8 md:flex-row">

                    <Logo />

                    <div className="flex gap-8 text-gray-600">

                        <Link
                            to="/"
                            className="hover:text-indigo-600 transition"
                        >
                            Home
                        </Link>

                        <Link
                            to="/all-posts"
                            className="hover:text-indigo-600 transition"
                        >
                            Blogs
                        </Link>

                        <Link
                            to="/add-post"
                            className="hover:text-indigo-600 transition"
                        >
                            Write
                        </Link>

                    </div>

                </div>

                <div className="mt-8 border-t pt-6 text-center text-sm text-gray-500">
                    © {new Date().getFullYear()} BlogSpace. Built with React +
                    Appwrite.
                </div>

            </div>

        </footer>
    );
}

export default Footer;