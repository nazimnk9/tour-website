export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://m71db7r1-8000.asse.devtunnels.ms/api/v1";

export async function registerUser(data: any) {
    const response = await fetch(`${API_BASE_URL}/auth/register/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Registration failed");
    }

    return response.json();
}

export async function loginUser(data: any) {
    const response = await fetch(`${API_BASE_URL}/token`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Login failed");
    }


    return response.json();
}

export function setTokens(data: { access: string; refresh: string }) {
    if (typeof document !== 'undefined') {
        document.cookie = `access_token=${data.access}; path=/; max-age=86400; SameSite=Strict; Secure`;
        document.cookie = `refresh_token=${data.refresh}; path=/; max-age=604800; SameSite=Strict; Secure`;
    }
}

export function removeTokens() {
    if (typeof document !== 'undefined') {
        document.cookie = "access_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
        document.cookie = "refresh_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
}

export function isLoggedIn() {
    if (typeof document !== 'undefined') {
        return document.cookie.split(';').some((item) => item.trim().startsWith('access_token='));
    }
    return false;
}
export function getAccessToken() {
    if (typeof document !== 'undefined') {
        const cookie = document.cookie.split(';').find((item) => item.trim().startsWith('access_token='));
        return cookie ? cookie.split('=')[1] : null;
    }
    return null;
}

export async function getUserProfile() {
    const token = getAccessToken();
    if (!token) throw new Error("No access token found");

    const response = await fetch(`${API_BASE_URL}/me/`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to fetch user profile");
    }

    return response.json();
}

export async function updateUserProfile(data: any) {
    const token = getAccessToken();
    if (!token) throw new Error("No access token found");

    const response = await fetch(`${API_BASE_URL}/me/`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to update user profile");
    }

    return response.json();
}

export async function deleteUserAccount() {
    const token = getAccessToken();
    if (!token) throw new Error("No access token found");

    const response = await fetch(`${API_BASE_URL}/me/`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to delete user account");
    }
}
