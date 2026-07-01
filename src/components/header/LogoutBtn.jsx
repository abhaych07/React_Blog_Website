import React from "react";
import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth";
import { logout } from "../../store/authSlice";

function LogoutBtn() {
    const dispatch = useDispatch();

    const logoutHandler = () => {
        authService.logout().then(() => {
            dispatch(logout());
        });
    };

    return (
        <button
            onClick={logoutHandler}
            className="rounded-xl bg-red-500 px-5 py-2 text-white transition-all duration-300 hover:bg-red-600 hover:shadow-lg"
        >
            Logout
        </button>
    );
}

export default LogoutBtn;