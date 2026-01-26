"use client"

import type React from "react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react'
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

export default function Contact() {
    const { toast } = useToast()
    const [formData, setFormData] = useState({
        name: "",
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

    // Submission logic preserved but commented as it was in the original provided file
    /*
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault()
      setIsLoading(true)
  
      const payload = {
        ...formData,
        to_email: "contactwnoor@gmail.com",
      }
  
      try {
        const response = await fetch("https://apis.venotel.com/api/v1/users/send_mail/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        })
  
        const data = await response.json()
  
        if (data.success) {
          setIsSuccessOpen(true)
          setFormData({ name: "", email: "", phone: "", subject: "", message: "" })
          toast({
            title: "Success",
            description: data.message,
            variant: "default",
            className: "bg-green-500 text-white border-none",
          })
        } else {
          let errorMessage = data.message || data.detail || "Something went wrong."
          if (data.errors && data.errors.message) {
            errorMessage = data.errors.message[0]
          }
  
          toast({
            variant: "destructive",
            title: "Error",
            description: errorMessage,
          })
        }
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to send message. Please try again later.",
        })
      } finally {
        setIsLoading(false)
      }
    }
    */

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
                            // {
                            //     icon: MapPin,
                            //     title: "Dhaka Office",
                            //     value: "House # 470, Road # 8, Level-3 DOHS Baridhara, Dhaka-1212, Bangladesh",
                            // },
                            // {
                            //     icon: MapPin,
                            //     title: "London Office",
                            //     value: "13 Elm parade Main road, Sidcup Kent, UK Da14 6nf.",
                            //     desc: "Phone: +447711048902",
                            //     des: "Email: russel@aimandesignltd.com",
                            // },
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
                                        {/* {item.desc && <p className="text-gray-500 text-sm">{item.desc}</p>} */}
                                        {/* {item.des && <p className="text-gray-500 text-sm">{item.des}</p>} */}
                                    </div>
                                </div>
                            )
                        })}
                    </div>

                    {/* Contact Form (Right) */}
                    <div className="lg:col-span-8">
                        <form className="space-y-6">
                            <div className="grid grid-cols-1 gap-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-bold text-[#051036] mb-3">
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        className="w-full px-4 py-4 rounded-xl border border-gray-100 bg-white focus:border-[#005000] outline-none transition text-gray-600 placeholder:text-gray-400 shadow-sm"
                                        placeholder="Your name"
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
                <DialogContent className="sm:max-w-md">
                    <DialogHeader className="flex flex-col items-center justify-center text-center space-y-4">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-2">
                            <CheckCircle2 className="w-8 h-8 text-green-600" />
                        </div>
                        <DialogTitle className="text-2xl">Thank You!</DialogTitle>
                        <DialogDescription className="text-lg text-center">
                            Your message has been sent successfully. We will get back to you soon.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="sm:justify-center">
                        <button
                            onClick={() => setIsSuccessOpen(false)}
                            className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-2 rounded-md transition-colors"
                        >
                            Close
                        </button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <Footer />
        </div>
    )
}
