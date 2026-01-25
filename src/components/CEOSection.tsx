import Image from "next/image";

export default function CEOSection() {
  return (
    <section className="w-full relative min-h-[600px] lg:min-h-[700px]">
      {/* Gradient Background - White at top, Dark blue at bottom */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(180deg, #FFFFFF 0%, #FFFFFF 20%, #000E51 60%, #000E51 100%)",
        }}
      />

      {/* Content Container */}
      <div className="relative max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 py-16 lg:py-20 flex  justify-center items-center min-h-[600px] lg:min-h-[700px]">
        {/* Card - Left aligned */}
        <div className="bg-white rounded-xl lg:rounded-2xl shadow-[0_4px_30px_rgba(0,0,0,0.1)] border border-gray-200 overflow-hidden w-full max-w-[950px]">
          <div className="flex flex-col lg:flex-row">
            {/* CEO Image Container - With padding */}
            <div className="lg:w-[42%] p-4 sm:p-5 lg:p-6">
              <div className="relative aspect-[4/5] rounded-lg lg:rounded-xl overflow-hidden">
                <Image
                  src="/icon/ceo.png"
                  alt="Max Tyson - CEO of LKnight"
                  fill
                  className="object-cover object-top"
                  priority
                />
              </div>
            </div>

            {/* Content */}
            <div className="lg:w-[58%] p-5 sm:p-6 lg:py-8 lg:pr-10 lg:pl-2 flex flex-col justify-center">
              {/* Label */}
              <span className="text-[#FF6F00] text-xs sm:text-sm font-medium tracking-wider mb-2">
                Meet Our CEO
              </span>

              {/* Name */}
              <h2 className="text-[#000E51] text-2xl sm:text-3xl lg:text-[38px] font-bold leading-tight mb-2">
                Max Tyson
              </h2>

              {/* Tagline with underline */}
              <p className="text-[#FF6F00] text-sm lg:text-[15px] italic border-b border-[#FF6F00] inline-block self-start pb-0.5 mb-5 lg:mb-6">
                Driving Vision. Building Excellence.
              </p>

              {/* Description */}
              <div className="space-y-3 lg:space-y-4 text-[#64748B] text-[13px] lg:text-[14px] leading-[1.75]">
                <p>
                  Founder & CEO of LKnight, leads the company with a clear vision — to build
                  powerful, reliable, and future-ready digital solutions. With a strong focus on
                  innovation, quality, and long-term impact, he believes great products are created
                  when strategy meets thoughtful execution.
                </p>
                <p>
                  With years of experience in leadership and digital growth, Max Tyson has worked
                  closely with teams and clients to transform ideas into scalable solutions. His
                  approach combines creativity, discipline, and a deep understanding of modern
                  technology.
                </p>
                <p>
                  Under his leadership, LKnight continues to grow as a trusted partner for
                  businesses looking to innovate, scale, and succeed in the digital world.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
