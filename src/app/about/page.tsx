import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <div className="bg-[#1a1f4e] pt-20 pb-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            About Us
          </h1>
          <p className="text-gray-300 text-base md:text-lg max-w-2xl mx-auto">
            Empowering learners worldwide with quality education and innovative learning experiences.
          </p>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Our Mission
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              We believe that quality education should be accessible to everyone. Our platform is designed to provide
              learners with the tools and resources they need to succeed in their personal and professional development.
            </p>
            <p className="text-gray-600 leading-relaxed">
              With a focus on leadership development and skill-building, we offer courses that are designed by
              industry experts and tailored to meet the needs of modern learners.
            </p>
          </div>
          <div className="bg-gray-100 rounded-2xl p-8">
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-[#FF6F00]">50K+</div>
                <div className="text-sm text-gray-600 mt-1">Active Learners</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#FF6F00]">500+</div>
                <div className="text-sm text-gray-600 mt-1">Courses</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#FF6F00]">100+</div>
                <div className="text-sm text-gray-600 mt-1">Expert Instructors</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#FF6F00]">98%</div>
                <div className="text-sm text-gray-600 mt-1">Satisfaction Rate</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
