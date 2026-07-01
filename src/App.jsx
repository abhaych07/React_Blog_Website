import React, { useState, useEffect } from "react";
import "./App.css";

import { Outlet } from "react-router-dom";

import { useDispatch } from "react-redux";

import authService from "./appwrite/auth";

import { login, logout } from "./store/authSlice";

import Header from "./components/header/header";
import Footer from "./components/footer/footer";

function App() {
    const [loading, setLoading] = useState(true);

    const dispatch = useDispatch();

    useEffect(() => {
        authService
            .getCurrentuser()
            .then((userData) => {
                if (userData) {
                    dispatch(login({ userData }));
                } else {
                    dispatch(logout());
                }
            })
            .finally(() => setLoading(false));
    }, [dispatch]);

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-slate-100">
                <div className="h-12 w-12 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent"></div>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen flex-col bg-slate-50">

            <Header />

            <main className="flex-1 py-10">
                <Outlet />
            </main>

            <Footer />

        </div>
    );
}

export default App;