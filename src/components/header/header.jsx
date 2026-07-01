import React from "react";
import { Container, Logo, LogoutBtn } from "../index";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Header() {
    const authStatus = useSelector((state) => state.auth.status);

    const navigate = useNavigate();

    const navItems = [
        {
            name: "Home",
            slug: "/",
            active: true,
        },
        {
            name: "Login",
            slug: "/login",
            active: !authStatus,
        },
        {
            name: "Signup",
            slug: "/signup",
            active: !authStatus,
        },
        {
            name: "All Posts",
            slug: "/all-posts",
            active: authStatus,
        },
        {
            name: "Write",
            slug: "/add-post",
            active: authStatus,
        },
    ];

    return (
        <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/90 backdrop-blur-md shadow-sm">
            <Container>
                <nav className="flex h-20 items-center justify-between">

                    <Logo />

                    <ul className="flex items-center gap-2">
                        {navItems.map(
                            (item) =>
                                item.active && (
                                    <li key={item.name}>
                                        <button
                                            onClick={() =>
                                                navigate(item.slug)
                                            }
                                            className="rounded-xl px-5 py-2 font-medium text-gray-700 transition-all duration-300 hover:bg-indigo-50 hover:text-indigo-600"
                                        >
                                            {item.name}
                                        </button>
                                    </li>
                                )
                        )}

                        {authStatus && (
                            <li>
                                <LogoutBtn />
                            </li>
                        )}
                    </ul>
                </nav>
            </Container>
        </header>
    );
}

export default Header;