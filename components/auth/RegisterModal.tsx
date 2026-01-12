"use client"

import { useState } from "react"
import { X, Loader2 } from "lucide-react"
import { registerUser } from "@/services/authService"

interface RegisterModalProps {
    isOpen: boolean
    onClose: () => void
    onSwitchToLogin: () => void
}

export function RegisterModal({ isOpen, onClose, onSwitchToLogin }: RegisterModalProps) {
    const [isLoading, setIsLoading] = useState(false)
    const [formData, setFormData] = useState({
        email: "",
        phone: "",
        first_name: "",
        last_name: "",
        password: "",
    })

    // Basic "close on click outside" or just return null if not open
    if (!isOpen) return null

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        try {
            await registerUser(formData)
            // On success, switch to login
            onSwitchToLogin()
            // Requirement: "hide registration modal"
            onClose()
            // alert("Registration successful! Please log in.")
        } catch (error: any) {
            alert(error.message || "Registration failed")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="relative w-full max-w-md bg-white rounded-2xl shadow-xl p-8 animate-in zoom-in-95 duration-200">
                <button
                    onClick={onClose}
                    className="absolute right-4 top-4 p-2 text-gray-400 hover:text-gray-600 transition-colors rounded-full hover:bg-gray-100"
                >
                    <X size={20} />
                </button>

                <div className="mb-8 text-center">
                    <h2 className="text-2xl font-bold text-[#051036]">Create an account</h2>
                    <p className="text-gray-500 mt-2">Join us to explore the world</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <label className="text-sm font-medium text-[#051036]">First Name</label>
                            <input
                                name="first_name"
                                required
                                value={formData.first_name}
                                onChange={handleChange}
                                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-100 outline-none transition-all placeholder:text-gray-400"
                                placeholder="John"
                            />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-sm font-medium text-[#051036]">Last Name</label>
                            <input
                                name="last_name"
                                required
                                value={formData.last_name}
                                onChange={handleChange}
                                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-100 outline-none transition-all placeholder:text-gray-400"
                                placeholder="Doe"
                            />
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-sm font-medium text-[#051036]">Email</label>
                        <input
                            name="email"
                            type="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-100 outline-none transition-all placeholder:text-gray-400"
                            placeholder="name@example.com"
                        />
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-sm font-medium text-[#051036]">Phone</label>
                        <input
                            name="phone"
                            type="tel"
                            required
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-100 outline-none transition-all placeholder:text-gray-400"
                            placeholder="+1 234 567 890"
                        />
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-sm font-medium text-[#051036]">Password</label>
                        <input
                            name="password"
                            type="password"
                            required
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-100 outline-none transition-all placeholder:text-gray-400"
                            placeholder="••••••••"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-orange-500/20 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-6"
                    >
                        {isLoading ? <Loader2 className="animate-spin" size={20} /> : "Register"}
                    </button>
                </form>

                <div className="mt-8 text-center">
                    <p className="text-gray-600 text-sm">
                        Already have an account?{" "}
                        <button
                            onClick={onSwitchToLogin}
                            className="text-orange-500 font-bold hover:underline"
                        >
                            Log In
                        </button>
                    </p>
                </div>
            </div>
        </div>
    )
}
