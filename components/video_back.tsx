export default function VideoBackgroundPage() {
  return (
    <main className="relative w-full min-h-screen overflow-hidden">
      {/* Video background */}
      <video
        className="absolute inset-0 w-full h-full object-cover brightness-50"
        src="/s_tour.mp4"
        autoPlay
        muted
        loop
        playsInline
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Content */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 text-center gap-4">
        <img
          src="/images/logo_city_roam_tickets-transparent.png"   // <- put your logo file in /public/images/logo.png
          alt="City Rome Tickets"
          className="h-10 w-auto sm:h-30"
        />
        <h1 className="text-white text-4xl sm:text-6xl md:text-7xl font-bold text-balance">
            City Rome Tickets
        </h1>

        <div className="mt-2">
            <h2 className="text-white/90 text-lg sm:text-xl md:text-3xl font-medium">
            Book the Past,
            </h2>
            <h2 className="text-white/90 text-lg sm:text-xl md:text-3xl font-medium">
            Experience the Eternal.
            </h2>
        </div>
      </div>

    </main>
  )
}
