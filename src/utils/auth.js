import axios from "axios";
import { jwtDecode } from "jwt-decode";

const BASE = process.env.REACT_APP_API_BASE || "https://os-project-server.vercel.app";
const LOGIN_PATH = process.env.REACT_APP_LOGIN_PATH || "/api/auth/login";
const TOKEN_KEY = "authToken";

/**
 * Login user
 */
export const loginUser = async (email, password) => {
    const url = `${BASE}${LOGIN_PATH}`;
    console.log("Login request URL:", url);

    try {
        const res = await axios.post(
            url,
            { email, password },
            {
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
                timeout: 8000
            }
        );

        const token = res?.data?.token;
        if (token) {
            localStorage.setItem(TOKEN_KEY, token);
            return { success: true, data: res.data };
        }

        return {
            success: false,
            message: res?.data?.message || "Login failed: No token received"
        };
    } catch (err) {
        if (err.response) {
            return {
                success: false,
                message: err.response.data?.message || `Login failed (${err.response.status})`
            };
        }
        return { success: false, message: "Network error or server not reachable." };
    }
};

export const isAuthenticated = () => !!localStorage.getItem(TOKEN_KEY);

export const logoutUser = () => {
    localStorage.removeItem(TOKEN_KEY);
};

export const getCurrentUser = () => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) return null;

    try {
        return jwtDecode(token);
    } catch (e) {
        console.error("Failed to decode JWT:", e);
        localStorage.removeItem(TOKEN_KEY);
        return null;
    }
};
