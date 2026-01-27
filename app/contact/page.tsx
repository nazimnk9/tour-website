"use client"

import type React from "react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Mail, Phone, Send, CheckCircle2 } from 'lucide-react'
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog"
import { sendContactMessage } from "@/services/tourService"

export default function Contact() {
    const { toast } = useToast()
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
    })
    const [isLoading, setIsLoading] = useState(false)
    const [isSuccessOpen, setIsSuccessOpen] = useState(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        try {
            await sendContactMessage(formData)
            setIsSuccessOpen(true)
            setFormData({
                first_name: "",
                last_name: "",
                email: "",
                phone: "",
                subject: "",
                message: "",
            })
            toast({
                title: "Success",
                description: "Your message has been sent successfully.",
                variant: "default",
                className: "bg-green-500 text-white border-none",
            })
        } catch (error: any) {
            toast({
                variant: "destructive",
                title: "Error",
                description: error.message || "Failed to send message. Please try again later.",
            })
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-white text-[#051036]">
            <Navbar />

            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                    {/* Contact Info (Left) */}
                    <div className="lg:col-span-4 space-y-10">
                        {[
                            {
                                icon: Mail,
                                title: "Email",
                                value: "russel@aimandesignltd.com",
                                desc: "Send us an email anytime",
                            },
                            {
                                icon: Phone,
                                title: "Phone",
                                value: "+447711048902",
                            },
                        ].map((item, i) => {
                            const IconComponent = item.icon
                            return (
                                <div key={i} className="flex gap-5">
                                    <div className="flex-shrink-0 w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-white">
                                        <IconComponent size={22} />
                                    </div>
                                    <div className="space-y-1">
                                        <h3 className="font-bold text-lg text-[#051036]">{item.title}</h3>
                                        <p className="text-orange-500 font-medium text-[15px]">{item.value}</p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>

                    {/* Contact Form (Right) */}
                    <div className="lg:col-span-8">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="first_name" className="block text-sm font-bold text-[#051036] mb-3">
                                        First Name
                                    </label>
                                    <input
                                        type="text"
                                        id="first_name"
                                        name="first_name"
                                        value={formData.first_name}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-4 rounded-xl border border-gray-100 bg-white focus:border-[#005000] outline-none transition text-gray-600 placeholder:text-gray-400 shadow-sm"
                                        placeholder="First name"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="last_name" className="block text-sm font-bold text-[#051036] mb-3">
                                        Last Name
                                    </label>
                                    <input
                                        type="text"
                                        id="last_name"
                                        name="last_name"
                                        value={formData.last_name}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-4 rounded-xl border border-gray-100 bg-white focus:border-[#005000] outline-none transition text-gray-600 placeholder:text-gray-400 shadow-sm"
                                        placeholder="Last name"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="email" className="block text-sm font-bold text-[#051036] mb-3">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-4 rounded-xl border border-gray-100 bg-white focus:border-[#005000] outline-none transition text-gray-600 placeholder:text-gray-400 shadow-sm"
                                        placeholder="your@email.com"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="phone" className="block text-sm font-bold text-[#051036] mb-3">
                                        Phone
                                    </label>
                                    <input
                                        type="text"
                                        id="phone"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-4 rounded-xl border border-gray-100 bg-white focus:border-[#005000] outline-none transition text-gray-600 placeholder:text-gray-400 shadow-sm"
                                        placeholder="Enter your phone number"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="subject" className="block text-sm font-bold text-[#051036] mb-3">
                                    Subject
                                </label>
                                <input
                                    type="text"
                                    id="subject"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-4 rounded-xl border border-gray-100 bg-white focus:border-[#005000] outline-none transition text-gray-600 placeholder:text-gray-400 shadow-sm"
                                    placeholder="How can we help?"
                                />
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-sm font-bold text-[#051036] mb-3">
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows={6}
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-4 rounded-xl border border-gray-100 bg-white focus:border-[#005000] outline-none transition text-gray-600 placeholder:text-gray-400 shadow-sm resize-none"
                                    placeholder="Tell us more..."
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-orange-500 text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {isLoading ? (
                                    <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></span>
                                ) : (
                                    <>
                                        <Send size={18} />
                                        Send Message
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </section>

            <Dialog open={isSuccessOpen} onOpenChange={setIsSuccessOpen}>
                <DialogContent className="sm:max-w-[425px] border-none shadow-2xl p-0 overflow-hidden rounded-3xl">
                    <div className="relative p-10 bg-white">
                        {/* Decorative Background Elements */}
                        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-green-50 rounded-full blur-3xl opacity-50 pointer-events-none" />
                        <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-48 h-48 bg-orange-50 rounded-full blur-2xl opacity-50 pointer-events-none" />

                        <div className="relative z-10 flex flex-col items-center text-center space-y-6">
                            <div className="relative group">
                                <div className="absolute inset-0 bg-green-400 blur-xl opacity-20 animate-pulse rounded-full" />
                                <div className="w-20 h-20 bg-gradient-to-br from-green-100 to-green-50 rounded-2xl flex items-center justify-center shadow-inner transform rotate-12 transition-all duration-500 group-hover:rotate-0 group-hover:scale-110">
                                    <CheckCircle2 className="w-10 h-10 text-green-600" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <DialogTitle className="text-3xl font-extrabold text-[#051036] tracking-tight">
                                    Message Sent!
                                </DialogTitle>
                                <DialogDescription className="text-gray-500 text-lg leading-relaxed">
                                    We&apos;ve received your inquiry and our team will get back to you within 24 hours.
                                </DialogDescription>
                            </div>

                            <div className="w-full pt-4">
                                <button
                                    onClick={() => setIsSuccessOpen(false)}
                                    className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-orange-200 transition-all duration-300 transform hover:-translate-y-1 active:scale-95"
                                >
                                    Awesome, thanks!
                                </button>
                            </div>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>

            <Footer />
        </div>
    )
}
