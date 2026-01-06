import Navbar from "@/components/navbar"
import HeroCarousel from "@/components/hero-carousel"
import ToursSection from "@/components/tours-section"
import Footer from "@/components/footer"
import DiscountModal from "@/components/discount-modal"

export default function Home() {
  return (
    <main className="w-full">
      <DiscountModal />
      <Navbar />
      <HeroCarousel />
      <ToursSection />
      <Footer />
    </main>
  )
}
