"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "Can I switch plans later?",
    answer:
      "Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle, and we'll prorate any differences.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit cards, ACH bank transfers, and can arrange invoicing for enterprise customers.",
  },
  {
    question: "Is there a minimum commitment?",
    answer:
      "No, there's no minimum commitment. You can cancel your subscription at any time without any penalties or hidden fees.",
  },
  {
    question: "Can I get a refund?",
    answer:
      "Yes, we offer a 14-day money-back guarantee. If you're not satisfied with our service, contact us within 14 days for a full refund.",
  },
  {
    question: "Should I can quit anytime?",
    answer:
      "Absolutely! You have complete flexibility to cancel your subscription whenever you want. Your access will continue until the end of your billing period.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(1);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="w-full bg-white py-16 lg:py-24">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main FAQ Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left Side */}
          <div className="lg:pr-8">
            {/* Label */}
            <div className="inline-block mb-6">
              <span className="text-[#000E51] text-sm font-medium border-b-2 border-[#000E51] pb-1">
                Frequently asked questions
              </span>
            </div>

            {/* Heading */}
            <h2 className="text-3xl md:text-4xl lg:text-[42px] font-bold text-[#000E51] leading-tight mb-10">
              Got Questions? We&apos;re
              <br />
              Here to Help
            </h2>

            {/* FAQ Illustration */}
            <div className="relative w-full max-w-[320px] h-[280px] mx-auto lg:mx-0">
              <Image
                src="/icon/faq.svg"
                alt="FAQ Illustration"
                fill
                className="object-contain"
              />
            </div>
          </div>

          {/* Right Side - FAQ Accordion */}
          <div className="space-y-4">
            {faqData.map((faq, index) => (
              <div
                key={index}
                className={`rounded-lg overflow-hidden transition-all duration-300 ${
                  openIndex === index
                    ? "bg-[#000E51] shadow-lg"
                    : "bg-white border border-gray-200"
                }`}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left transition-colors duration-200"
                  aria-expanded={openIndex === index}
                >
                  <span
                    className={`text-base font-medium pr-4 transition-colors duration-200 ${
                      openIndex === index ? "text-white" : "text-[#1E293B]"
                    }`}
                  >
                    {faq.question}
                  </span>
                  <span
                    className={`flex-shrink-0 w-6 h-6 flex items-center justify-center transition-all duration-300 ${
                      openIndex === index ? "text-white" : "text-[#64748B]"
                    }`}
                  >
                    {openIndex === index ? (
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="transition-transform duration-300"
                      >
                        <path
                          d="M1 1L13 13M1 13L13 1"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    ) : (
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="transition-transform duration-300"
                      >
                        <path
                          d="M7 1V13M1 7H13"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </span>
                </button>

                {/* Answer with animation */}
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    openIndex === index
                      ? "max-h-[200px] opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="px-6 pb-5">
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Still Have Questions CTA */}
        <div className="mt-16 lg:mt-20">
          <div className="bg-[#000E51] rounded-2xl py-10 px-6 md:px-12 text-center">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
              Still Have Questions?
            </h3>
            <p className="text-gray-400 text-sm md:text-base mb-6 max-w-md mx-auto">
              Our team is here to help you find the perfect plan for your learning needs.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-[#FF6F00] hover:bg-[#E86400] text-white text-sm font-semibold px-6 py-3 rounded-full transition-all duration-200 hover:shadow-lg hover:shadow-[#FF6F00]/25"
            >
              Contact Sales
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3.33337 8H12.6667M12.6667 8L8.00004 3.33333M12.6667 8L8.00004 12.6667"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
