"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FAQSection from "@/components/FAQSection";
import { planApi, subscriptionApi, Plan, PlanFeature } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";

// Feature item component
const FeatureItem = ({
  text,
  included,
}: {
  text: string;
  included: boolean;
}) => (
  <div className="flex items-start gap-3 py-1.5">
    {included ? (
      <div className="w-5 h-5 rounded-full bg-[#000E51]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
        <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
          <path
            d="M11.6669 3.5L5.25023 9.91667L2.33356 7"
            stroke="#000E51"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    ) : (
      <div className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0 mt-0.5">
        <svg width="10" height="10" viewBox="0 0 14 14" fill="none">
          <path
            d="M10.5 3.5L3.5 10.5M3.5 3.5L10.5 10.5"
            stroke="#d1d5db"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    )}
    <span
      className={`text-sm leading-snug ${
        included ? "text-gray-700" : "text-gray-400"
      }`}
    >
      {text}
    </span>
  </div>
);

// Plan icon component - maps by slug
const PlanIcon = ({ slug, isHighlighted }: { slug: string; isHighlighted: boolean }) => {
  const bgColor = isHighlighted ? "rgba(255,255,255,0.2)" : "rgba(26,31,78,0.08)";
  const fillColor = isHighlighted ? "#ffffff" : "#000E51";

  return (
    <div className="w-10 h-10 flex-shrink-0">
      {slug === "individual" && (
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
          <rect width="40" height="40" rx="10" fill={bgColor} />
          <path d="M20 18C21.6569 18 23 16.6569 23 15C23 13.3431 21.6569 12 20 12C18.3431 12 17 13.3431 17 15C17 16.6569 18.3431 18 20 18Z" fill={fillColor} />
          <path d="M20 20C16.69 20 14 21.79 14 24V26H26V24C26 21.79 23.31 20 20 20Z" fill={fillColor} />
        </svg>
      )}
      {slug === "small-team" && (
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
          <rect width="40" height="40" rx="10" fill={bgColor} />
          <path d="M16 18C17.1046 18 18 17.1046 18 16C18 14.8954 17.1046 14 16 14C14.8954 14 14 14.8954 14 16C14 17.1046 14.8954 18 16 18Z" fill={fillColor} />
          <path d="M24 18C25.1046 18 26 17.1046 26 16C26 14.8954 25.1046 14 24 14C22.8954 14 22 14.8954 22 16C22 17.1046 22.8954 18 24 18Z" fill={fillColor} />
          <path d="M16 20C13.79 20 12 21.79 12 24H20C20 21.79 18.21 20 16 20Z" fill={fillColor} />
          <path d="M24 20C23.53 20 23.09 20.1 22.67 20.24C23.5 21.27 24 22.58 24 24H28C28 21.79 26.21 20 24 20Z" fill={fillColor} />
        </svg>
      )}
      {slug === "organization" && (
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
          <rect width="40" height="40" rx="10" fill={isHighlighted ? "rgba(255,111,0,0.3)" : "rgba(255,111,0,0.12)"} />
          <path d="M12 28H28V16L20 12L12 16V28ZM15 18H17V20H15V18ZM15 22H17V24H15V22ZM19 18H21V20H19V18ZM19 22H21V24H19V22ZM23 18H25V20H23V18ZM23 22H25V24H23V22Z" fill={isHighlighted ? "#ffffff" : "#FF6F00"} />
        </svg>
      )}
      {slug === "enterprise" && (
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
          <rect width="40" height="40" rx="10" fill={bgColor} />
          <path d="M20 11L21.8 16.44L27.5 16.76L23 20.28L24.28 25.82L20 22.72L15.72 25.82L17 20.28L12.5 16.76L18.2 16.44L20 11Z" fill={fillColor} />
        </svg>
      )}
      {!["individual", "small-team", "organization", "enterprise"].includes(slug) && (
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
          <rect width="40" height="40" rx="10" fill={bgColor} />
          <path d="M14 16H16V26H14V16ZM19 12H21V26H19V12ZM24 20H26V26H24V20Z" fill={fillColor} />
        </svg>
      )}
    </div>
  );
};

// Pricing card component
const PricingCard = ({
  plan,
  billingCycle,
  isCurrentPlan,
  onSelect,
  isLoading,
}: {
  plan: Plan;
  billingCycle: "monthly" | "yearly";
  isCurrentPlan: boolean;
  onSelect: (plan: Plan) => void;
  isLoading: boolean;
}) => {
  const price =
    billingCycle === "monthly" && plan.monthlyPrice
      ? plan.monthlyPrice
      : plan.yearlyPrice;
  const period =
    billingCycle === "monthly" && plan.monthlyPrice ? "/mo" : "/yr";
  const showPrice = price != null;
  const isHighlighted = plan.isPopular || plan.slug === "organization";

  return (
    <div className={`relative flex flex-col ${isHighlighted ? "lg:-mt-4" : ""}`}>
      {/* Top badge */}
      {plan.isPopular && (
        <div className="flex justify-center">
          <span className="bg-[#FF6F00] text-white text-xs font-semibold px-5 py-1.5 rounded-t-xl">
            Most Popular
          </span>
        </div>
      )}
      {isCurrentPlan && !plan.isPopular && (
        <div className="flex justify-center">
          <span className="bg-green-500 text-white text-xs font-semibold px-5 py-1.5 rounded-t-xl">
            Current Plan
          </span>
        </div>
      )}

      <div
        className={`flex flex-col h-full rounded-2xl overflow-hidden transition-all duration-300 ${
          isHighlighted
            ? "bg-[#000E51] text-white shadow-2xl shadow-[#000E51]/20 ring-1 ring-[#000E51]"
            : isCurrentPlan
            ? "bg-white shadow-xl ring-2 ring-green-400"
            : "bg-white shadow-lg shadow-gray-200/60 ring-1 ring-gray-100 hover:shadow-xl hover:ring-gray-200"
        }`}
      >
        {/* Card Body */}
        <div className="p-6 lg:p-7 flex-1 flex flex-col">
          {/* Header */}
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-2">
              <PlanIcon slug={plan.slug} isHighlighted={isHighlighted} />
              <div>
                <h3 className={`text-lg font-bold ${isHighlighted ? "text-white" : "text-gray-900"}`}>
                  {plan.name}
                </h3>
                {plan.tagline && (
                  <p className={`text-xs font-medium ${isHighlighted ? "text-[#FF6F00]" : "text-[#FF6F00]"}`}>
                    {plan.tagline}
                  </p>
                )}
              </div>
            </div>
            {plan.description && (
              <p className={`text-sm leading-relaxed mt-2 ${isHighlighted ? "text-white/70" : "text-gray-500"}`}>
                {plan.description}
              </p>
            )}
          </div>

          {/* Price */}
          <div className="mb-6">
            {showPrice ? (
              <>
                <div className="flex items-baseline gap-1">
                  <span className={`text-4xl font-extrabold tracking-tight ${isHighlighted ? "text-white" : "text-gray-900"}`}>
                    ${price.toLocaleString()}
                  </span>
                  <span className={`text-sm font-medium ${isHighlighted ? "text-white/50" : "text-gray-400"}`}>
                    {period}
                  </span>
                </div>
                {plan.maxUsers > 1 && (
                  <p className={`text-xs mt-1.5 ${isHighlighted ? "text-white/50" : "text-gray-400"}`}>
                    up to {plan.maxUsers.toLocaleString()} users included
                  </p>
                )}
                {plan.additionalUserPrice && (
                  <p className={`text-xs mt-0.5 font-medium ${isHighlighted ? "text-[#FF6F00]" : "text-[#FF6F00]"}`}>
                    +${plan.additionalUserPrice}/additional user
                  </p>
                )}
              </>
            ) : (
              <div>
                <span className={`text-4xl font-extrabold tracking-tight ${isHighlighted ? "text-white" : "text-gray-900"}`}>
                  Custom
                </span>
                <p className={`text-xs mt-1.5 ${isHighlighted ? "text-white/50" : "text-gray-400"}`}>
                  Tailored to your organization
                </p>
              </div>
            )}
          </div>

          {/* CTA Button */}
          <button
            onClick={() => onSelect(plan)}
            disabled={isCurrentPlan || isLoading}
            className={`w-full py-3 px-5 rounded-xl text-sm font-semibold transition-all duration-200 mb-6 ${
              isCurrentPlan
                ? "bg-green-100 text-green-700 cursor-default"
                : isHighlighted
                ? "bg-[#FF6F00] hover:bg-[#E86400] text-white shadow-lg shadow-[#FF6F00]/25"
                : "bg-[#000E51] hover:bg-[#001a7a] text-white"
            } ${isLoading ? "opacity-50 cursor-wait" : ""}`}
          >
            {isCurrentPlan ? "Current Plan" : plan.ctaText}
          </button>

          {/* Close Line */}
          {plan.closeLine && (
            <p className={`text-xs leading-relaxed mb-5 italic ${isHighlighted ? "text-white/40" : "text-gray-400"}`}>
              {plan.closeLine}
            </p>
          )}

          {/* Divider + Features */}
          <div className={`border-t pt-5 flex-1 ${isHighlighted ? "border-white/10" : "border-gray-100"}`}>
            <p className={`text-xs font-semibold uppercase tracking-wider mb-3 ${isHighlighted ? "text-white/40" : "text-gray-400"}`}>
              What&apos;s included
            </p>
            <div className="space-y-0.5">
              {(plan.features as PlanFeature[]).map(
                (feature: PlanFeature, index: number) => (
                  <div key={index} className="flex items-start gap-3 py-1.5">
                    {feature.included ? (
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${isHighlighted ? "bg-white/15" : "bg-[#000E51]/8"}`}>
                        <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                          <path
                            d="M11.6669 3.5L5.25023 9.91667L2.33356 7"
                            stroke={isHighlighted ? "#ffffff" : "#000E51"}
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    ) : (
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${isHighlighted ? "bg-white/10" : "bg-gray-100"}`}>
                        <svg width="10" height="10" viewBox="0 0 14 14" fill="none">
                          <path
                            d="M10.5 3.5L3.5 10.5M3.5 3.5L10.5 10.5"
                            stroke={isHighlighted ? "rgba(255,255,255,0.3)" : "#d1d5db"}
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    )}
                    <span
                      className={`text-sm leading-snug ${
                        feature.included
                          ? isHighlighted ? "text-white/80" : "text-gray-700"
                          : isHighlighted ? "text-white/30" : "text-gray-400"
                      }`}
                    >
                      {feature.text}
                    </span>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Loading skeleton
const PricingCardSkeleton = () => (
  <div className="bg-white rounded-2xl p-6 lg:p-7 shadow-lg shadow-gray-200/60 ring-1 ring-gray-100 animate-pulse">
    <div className="mb-6">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 bg-gray-200 rounded-xl" />
        <div className="h-5 bg-gray-200 rounded w-28" />
      </div>
      <div className="h-3 bg-gray-100 rounded w-full mt-2" />
      <div className="h-3 bg-gray-100 rounded w-3/4 mt-1.5" />
    </div>
    <div className="mb-6">
      <div className="h-10 bg-gray-200 rounded w-32" />
    </div>
    <div className="h-12 bg-gray-100 rounded-xl mb-6" />
    <div className="border-t border-gray-100 pt-5 space-y-3">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="flex items-center gap-3">
          <div className="w-5 h-5 bg-gray-100 rounded-full" />
          <div className="h-3 bg-gray-100 rounded flex-1" />
        </div>
      ))}
    </div>
  </div>
);

export default function PricingPage() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">(
    "yearly"
  );
  const [currentPlanSlug, setCurrentPlanSlug] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Fetch plans and current subscription
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const plansResponse = await planApi.getAll();
        if (plansResponse.success && plansResponse.data) {
          setPlans(plansResponse.data);
        }

        // Check current subscription if authenticated
        if (isAuthenticated) {
          try {
            const subResponse = await subscriptionApi.getMySubscription();
            if (subResponse.success && subResponse.data) {
              setCurrentPlanSlug(subResponse.data.plan.slug);
            }
          } catch {
            // No subscription - that's fine
          }
        }
      } catch (err) {
        console.error("Failed to fetch plans:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [isAuthenticated]);

  // Check if any plan has monthly pricing
  const hasMonthlyOption = plans.some((p) => p.monthlyPrice != null);

  const handlePlanSelect = async (plan: Plan) => {
    setError(null);

    // Enterprise / Contact Sales
    if (plan.ctaType === "CONTACT_SALES") {
      router.push("/contact");
      return;
    }

    // Require authentication
    if (!isAuthenticated) {
      router.push("/signin?redirect=/pricing");
      return;
    }

    // Create checkout session
    try {
      setActionLoading(true);
      const response = await subscriptionApi.createCheckoutSession({
        planId: plan.id,
        billingCycle: billingCycle === "monthly" ? "MONTHLY" : "YEARLY",
      });

      if (response.success && response.data?.sessionUrl) {
        window.location.href = response.data.sessionUrl;
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to start checkout. Please try again."
      );
      setActionLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f9fc]">
      <Navbar />

      {/* Header Section */}
      <div className="bg-gradient-to-b from-[#000E51] to-[#0a1a6e] pt-24 pb-40 px-4 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-[0.04]">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="grid" width="8" height="8" patternUnits="userSpaceOnUse">
                <path d="M 8 0 L 0 0 0 8" fill="none" stroke="white" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#grid)" />
          </svg>
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <p className="text-[#FF6F00] text-sm font-semibold tracking-wide uppercase mb-3">
            Pricing Plans
          </p>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
            Invest in better leadership.
          </h1>
          <p className="text-gray-300 text-base md:text-lg max-w-2xl mx-auto mb-2">
            Start learning today and build a culture that lasts — one leader,
            one conversation, one lesson at a time.
          </p>

          {/* Billing Toggle - Industry Standard Pill */}
          {hasMonthlyOption && (
            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm rounded-full p-1 mt-8">
              <button
                onClick={() => setBillingCycle("monthly")}
                className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 ${
                  billingCycle === "monthly"
                    ? "bg-white text-[#000E51] shadow-md"
                    : "text-white/70 hover:text-white"
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle("yearly")}
                className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 flex items-center gap-2 ${
                  billingCycle === "yearly"
                    ? "bg-white text-[#000E51] shadow-md"
                    : "text-white/70 hover:text-white"
                }`}
              >
                Yearly
                <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
                  billingCycle === "yearly"
                    ? "bg-green-100 text-green-700"
                    : "bg-white/20 text-white"
                }`}>
                  Save 17%
                </span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16 -mt-32 mb-4 relative z-10">
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm flex items-center justify-between">
            <span>{error}</span>
            <button onClick={() => setError(null)} className="text-red-500 hover:text-red-700 ml-4 font-medium">
              Dismiss
            </button>
          </div>
        </div>
      )}

      {/* Pricing Cards Section */}
      <div className="relative z-10">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-10 lg:px-16 -mt-28">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-5 items-start">
              {[1, 2, 3, 4].map((i) => (
                <PricingCardSkeleton key={i} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-5 items-start">
              {plans.map((plan) => (
                <PricingCard
                  key={plan.id}
                  plan={plan}
                  billingCycle={billingCycle}
                  isCurrentPlan={currentPlanSlug === plan.slug}
                  onSelect={handlePlanSelect}
                  isLoading={actionLoading}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Closing Section */}
      <div className="max-w-4xl mx-auto text-center py-20 px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
          Ready to lead differently?
        </h2>
        <p className="text-gray-500 text-sm md:text-base max-w-lg mx-auto mb-8">
          Join thousands of professionals and organizations transforming
          leadership from the inside out.
        </p>
        <button
          onClick={() => router.push("/courses")}
          className="bg-[#000E51] hover:bg-[#FF6F00] text-white px-8 py-3.5 rounded-xl text-sm font-semibold transition-colors shadow-lg"
        >
          Explore The LKnight Learning Hub
        </button>
      </div>

      {/* FAQ Section */}
      <FAQSection />

      <Footer />
    </div>
  );
}
