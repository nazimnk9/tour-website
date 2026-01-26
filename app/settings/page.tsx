"use client"

import React from "react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { User, Bell, CreditCard, ChevronDown } from "lucide-react"

export default function SettingsPage() {
    return (
        <div className="min-h-screen bg-white text-[#051036]">
            <Navbar />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar */}
                    <div className="w-full lg:w-1/4 border border-gray-100 rounded-xl overflow-hidden self-start shadow-sm">
                        <div className="bg-[#1A2B49] p-8 text-white text-center">
                            <h2 className="text-2xl font-bold mb-1">Md. Nazim</h2>
                            <p className="text-gray-300 text-sm">Account</p>
                        </div>
                        <nav className="bg-[#F5F7FA]">
                            <button className="w-full flex items-center gap-3 p-4 bg-white border-b border-gray-100 transition-colors">
                                <User size={20} className="text-[#051036]" />
                                <span className="font-medium text-[#051036]">Personal details</span>
                            </button>
                            <button className="w-full flex items-center gap-3 p-4 hover:bg-white border-b border-gray-100 transition-colors text-gray-600">
                                <Bell size={20} />
                                <span className="font-medium">Notifications</span>
                            </button>
                            <button className="w-full flex items-center gap-3 p-4 hover:bg-white transition-colors text-gray-600">
                                <CreditCard size={20} />
                                <span className="font-medium">Saved cards</span>
                            </button>
                        </nav>
                    </div>

                    {/* Main Content */}
                    <div className="w-full lg:w-3/4">
                        <div className="space-y-10">
                            {/* Profile Details */}
                            <section>
                                <h3 className="text-xl font-bold mb-6">Profile Details</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-2">
                                    <div className="relative">
                                        <label className="absolute -top-2.5 left-3 px-1 bg-white text-xs text-gray-500 z-10">First Name</label>
                                        <input
                                            type="text"
                                            defaultValue="Md. Nazim"
                                            className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:border-[#1A2B49] outline-none transition font-medium"
                                        />
                                    </div>
                                    <div className="relative">
                                        <label className="absolute -top-2.5 left-3 px-1 bg-white text-xs text-gray-500 z-10">Last Name</label>
                                        <input
                                            type="text"
                                            defaultValue="Ahmed"
                                            className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:border-[#1A2B49] outline-none transition font-medium"
                                        />
                                    </div>
                                </div>
                            </section>

                            <div className="border-t border-gray-100 my-2"></div>

                            {/* Contact Details */}
                            <section>
                                <h3 className="text-xl font-bold mb-6">Contact Details</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="relative">
                                        <label className="absolute -top-2.5 left-3 px-1 bg-gray-100 text-xs text-gray-500 z-10">Email</label>
                                        <input
                                            type="email"
                                            disabled
                                            defaultValue="nazimahmedprovat@gmail.com"
                                            className="w-full px-4 py-4 border border-gray-300 rounded-lg bg-[#E9ECEF] text-gray-600 outline-none font-medium cursor-not-allowed"
                                        />
                                    </div>
                                    <div className="relative">
                                        <label className="absolute -top-2.5 left-3 px-1 bg-white text-xs text-gray-500 z-10">Mobile Phone</label>
                                        <input
                                            type="text"
                                            className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:border-[#1A2B49] outline-none transition"
                                        />
                                    </div>
                                </div>
                            </section>

                            <div className="border-t border-gray-100 my-2"></div>

                            {/* Date of Birth */}
                            <section>
                                <h3 className="text-xl font-bold mb-6">Date of birth</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                                    <div className="relative">
                                        <div className="relative border border-gray-300 rounded-lg flex items-center justify-between px-4 py-4 cursor-pointer hover:border-gray-400">
                                            <span className="text-gray-900 font-medium">Day</span>
                                            <ChevronDown size={20} className="text-gray-500" />
                                        </div>
                                    </div>
                                    <div className="relative">
                                        <div className="relative border border-gray-300 rounded-lg flex items-center justify-between px-4 py-4 cursor-pointer hover:border-gray-400">
                                            <span className="text-gray-900 font-medium">Month</span>
                                            <ChevronDown size={20} className="text-gray-500" />
                                        </div>
                                    </div>
                                    <div className="relative">
                                        <div className="relative border border-gray-300 rounded-lg flex items-center justify-between px-4 py-4 cursor-pointer hover:border-gray-400">
                                            <span className="text-gray-900 font-medium">Year</span>
                                            <ChevronDown size={20} className="text-gray-500" />
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {/* Save Button */}
                            <div className="pt-4">
                                <button className="bg-[#DDE2E5] text-[#1A2B49] px-10 py-3 rounded-full font-bold hover:bg-gray-300 transition-colors">
                                    Save
                                </button>
                            </div>

                            <div className="border-t border-gray-100 my-2"></div>

                            {/* Delete Account */}
                            <div className="pt-2">
                                <button className="text-red-600 font-bold hover:underline underline-offset-4 decoration-current">
                                    Delete Account
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    )
}
