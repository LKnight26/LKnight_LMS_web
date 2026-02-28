"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FAQSection from "@/components/FAQSection";
import { planApi, subscriptionApi, Plan, PlanFeature } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";

// Plan icon component
const PlanIcon = ({ slug }: { slug: string }) => {
  const icons: Record<string, React.ReactNode> = {
    individual: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000E51" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
    "small-team": (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000E51" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    organization: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000E51" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2" />
        <path d="M16 7V5a4 4 0 0 0-8 0v2" />
        <path d="M12 14v0" />
        <circle cx="12" cy="14" r="1" fill="#000E51" />
      </svg>
    ),
    enterprise: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000E51" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
  };

  return (
    <div className="w-11 h-11 rounded-xl bg-[#000E51]/[0.06] flex items-center justify-center flex-shrink-0">
      {icons[slug] || icons.individual}
    </div>
  );
};

// Pricing card
const PricingCard = ({
  plan,
  billingCycle,
  isCurrentPlan,
  onSelect,
  isLoading,
  isRecommended,
}: {
  plan: Plan;
  billingCycle: "monthly" | "yearly";
  isCurrentPlan: boolean;
  onSelect: (plan: Plan) => void;
  isLoading: boolean;
  isRecommended: boolean;
}) => {
  const price =
    billingCycle === "monthly" && plan.monthlyPrice
      ? plan.monthlyPrice
      : plan.yearlyPrice;
  const period =
    billingCycle === "monthly" && plan.monthlyPrice ? "/mo" : "/yr";
  const showPrice = price != null;
  const features = plan.features as PlanFeature[];

  return (
    <div className="relative flex flex-col h-full group">
      {/* Badge */}
      {(isRecommended || isCurrentPlan) && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-10">
          <span
            className={`text-xs font-bold px-4 py-1.5 rounded-full shadow-sm whitespace-nowrap ${
              isCurrentPlan
                ? "bg-green-500 text-white"
                : "bg-[#FF6F00] text-white"
            }`}
          >
            {isCurrentPlan ? "Current Plan" : "Recommended"}
          </span>
        </div>
      )}

      <div
        className={`flex flex-col h-full bg-white rounded-2xl transition-all duration-300 overflow-hidden ${
          isRecommended
            ? "ring-2 ring-[#FF6F00] shadow-xl shadow-[#FF6F00]/10"
            : isCurrentPlan
            ? "ring-2 ring-green-400 shadow-lg"
            : "ring-1 ring-gray-200 shadow-sm hover:shadow-lg hover:ring-gray-300"
        }`}
      >
        {/* Top accent bar */}
        {isRecommended && (
          <div className="h-1 bg-gradient-to-r from-[#FF6F00] to-[#ff9a44]" />
        )}

        <div className="p-6 lg:p-7 flex flex-col flex-1">
          {/* Plan header */}
          <div className="flex items-center gap-3 mb-4">
            <PlanIcon slug={plan.slug} />
            <div>
              <h3 className="text-lg font-bold text-[#000E51]">{plan.name}</h3>
              {plan.tagline && (
                <p className="text-xs text-[#FF6F00] font-medium">{plan.tagline}</p>
              )}
            </div>
          </div>

          {/* Description */}
          {plan.description && (
            <p className="text-sm text-gray-500 leading-relaxed mb-5">
              {plan.description}
            </p>
          )}

          {/* Price */}
          <div className="mb-6">
            {showPrice ? (
              <div>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-[40px] font-extrabold text-[#000E51] leading-none tracking-tight">
                    ${price.toLocaleString()}
                  </span>
                  <span className="text-sm text-gray-400 font-medium">{period}</span>
                </div>
                {plan.maxUsers > 1 && (
                  <p className="text-xs text-gray-400 mt-2">
                    Up to {plan.maxUsers.toLocaleString()} users
                  </p>
                )}
                {plan.additionalUserPrice != null && (
                  <p className="text-xs text-[#FF6F00] font-medium mt-0.5">
                    +${plan.additionalUserPrice}/additional user
                  </p>
                )}
              </div>
            ) : (
              <div>
                <span className="text-[40px] font-extrabold text-[#000E51] leading-none tracking-tight">
                  Custom
                </span>
                <p className="text-xs text-gray-400 mt-2">Tailored for your organization</p>
              </div>
            )}
          </div>

          {/* CTA */}
          <button
            onClick={() => onSelect(plan)}
            disabled={isCurrentPlan || isLoading}
            className={`w-full py-3.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
              isCurrentPlan
                ? "bg-green-50 text-green-600 border border-green-200 cursor-default"
                : isRecommended
                ? "bg-[#FF6F00] hover:bg-[#e56300] text-white shadow-md shadow-[#FF6F00]/20 hover:shadow-lg hover:shadow-[#FF6F00]/30"
                : "bg-[#000E51] hover:bg-[#0a1a6e] text-white"
            } ${isLoading ? "opacity-50 cursor-wait" : ""}`}
          >
            {isCurrentPlan ? "Current Plan" : plan.ctaText}
          </button>

          {/* Close line */}
          {plan.closeLine && (
            <p className="text-[11px] text-gray-400 text-center mt-3 italic leading-snug">
              {plan.closeLine}
            </p>
          )}

          {/* Divider */}
          <div className="border-t border-gray-100 mt-6 pt-5 flex-1">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
              What&apos;s included
            </p>
            <div className="space-y-3">
              {features.map((feature, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  {feature.included ? (
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="flex-shrink-0 mt-0.5">
                      <circle cx="9" cy="9" r="9" fill="#000E51" fillOpacity="0.06" />
                      <path d="M12.5 6.5L7.5 11.5L5.5 9.5" stroke="#000E51" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="flex-shrink-0 mt-0.5">
                      <circle cx="9" cy="9" r="9" fill="#f3f4f6" />
                      <path d="M6.5 9H11.5" stroke="#d1d5db" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  )}
                  <span
                    className={`text-sm leading-snug ${
                      feature.included ? "text-gray-700" : "text-gray-400"
                    }`}
                  >
                    {feature.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Loading skeleton
const PricingCardSkeleton = () => (
  <div className="bg-white rounded-2xl p-6 lg:p-7 ring-1 ring-gray-200 animate-pulse">
    <div className="flex items-center gap-3 mb-4">
      <div className="w-11 h-11 bg-gray-100 rounded-xl" />
      <div>
        <div className="h-5 bg-gray-200 rounded w-24 mb-1" />
        <div className="h-3 bg-gray-100 rounded w-16" />
      </div>
    </div>
    <div className="h-3 bg-gray-100 rounded w-full mb-1.5" />
    <div className="h-3 bg-gray-100 rounded w-3/4 mb-5" />
    <div className="h-12 bg-gray-200 rounded w-36 mb-6" />
    <div className="h-12 bg-gray-100 rounded-xl mb-6" />
    <div className="border-t border-gray-100 pt-5 space-y-3">
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="flex items-center gap-2.5">
          <div className="w-[18px] h-[18px] bg-gray-100 rounded-full" />
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
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("yearly");
  const [currentPlanSlug, setCurrentPlanSlug] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const plansResponse = await planApi.getAll();
        if (plansResponse.success && plansResponse.data) {
          setPlans(plansResponse.data);
        }

        if (isAuthenticated) {
          try {
            const subResponse = await subscriptionApi.getMySubscription();
            if (subResponse.success && subResponse.data) {
              setCurrentPlanSlug(subResponse.data.plan.slug);
            }
          } catch {
            // No subscription
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

  const hasMonthlyOption = plans.some((p) => p.monthlyPrice != null);

  const handlePlanSelect = async (plan: Plan) => {
    setError(null);

    if (plan.ctaType === "CONTACT_SALES") {
      router.push("/contact");
      return;
    }

    if (!isAuthenticated) {
      router.push("/signin?redirect=/pricing");
      return;
    }

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

      {/* Hero */}
      <div className="bg-gradient-to-b from-[#000E51] via-[#091966] to-[#0a1a6e] pt-28 sm:pt-32 pb-44 sm:pb-52 px-4 relative overflow-hidden">
        {/* Subtle background pattern */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-1/4 w-96 h-96 bg-[#FF6F00]/5 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-white/[0.03] rounded-full blur-3xl" />
        </div>

        <div className="max-w-3xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-1.5 mb-6">
            <div className="w-1.5 h-1.5 rounded-full bg-[#FF6F00]" />
            <span className="text-xs font-medium text-white/80 tracking-wide">Pricing Plans</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-[1.15]">
            Invest in better leadership.
          </h1>
          <p className="text-white/60 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
            Choose a plan that fits your needs. Start learning today and build a culture that lasts.
          </p>

          {/* Billing Toggle */}
          {hasMonthlyOption && (
            <div className="inline-flex items-center bg-white/[0.08] backdrop-blur-sm rounded-full p-1 mt-10 ring-1 ring-white/10">
              <button
                onClick={() => setBillingCycle("monthly")}
                className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 ${
                  billingCycle === "monthly"
                    ? "bg-white text-[#000E51] shadow-lg"
                    : "text-white/60 hover:text-white"
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle("yearly")}
                className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 flex items-center gap-2 ${
                  billingCycle === "yearly"
                    ? "bg-white text-[#000E51] shadow-lg"
                    : "text-white/60 hover:text-white"
                }`}
              >
                Yearly
                <span
                  className={`text-[11px] px-2 py-0.5 rounded-full font-bold ${
                    billingCycle === "yearly"
                      ? "bg-green-100 text-green-700"
                      : "bg-white/15 text-white/80"
                  }`}
                >
                  Save 17%
                </span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-10 lg:px-16 -mt-40 mb-4 relative z-10">
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm flex items-center justify-between">
            <span>{error}</span>
            <button
              onClick={() => setError(null)}
              className="text-red-500 hover:text-red-700 ml-4 font-medium"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}

      {/* Cards */}
      <div className="relative z-10 -mt-36 sm:-mt-40 pb-12">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-10 lg:px-16">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-5 items-stretch">
              {[1, 2, 3, 4].map((i) => (
                <PricingCardSkeleton key={i} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-5 items-stretch">
              {plans.map((plan) => (
                <PricingCard
                  key={plan.id}
                  plan={plan}
                  billingCycle={billingCycle}
                  isCurrentPlan={currentPlanSlug === plan.slug}
                  onSelect={handlePlanSelect}
                  isLoading={actionLoading}
                  isRecommended={plan.isPopular || plan.slug === "organization"}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Closing CTA */}
      <div className="max-w-3xl mx-auto text-center py-20 px-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-[#000E51] mb-3">
          Ready to lead differently?
        </h2>
        <p className="text-gray-500 text-sm sm:text-base max-w-lg mx-auto mb-8 leading-relaxed">
          Join thousands of professionals and organizations transforming
          leadership from the inside out.
        </p>
        <button
          onClick={() => router.push("/courses")}
          className="bg-[#000E51] hover:bg-[#0a1a6e] text-white px-8 py-3.5 rounded-xl text-sm font-semibold transition-all duration-200 shadow-lg shadow-[#000E51]/20 hover:shadow-xl"
        >
          Explore The LKnight Learning Hub
        </button>
      </div>

      <FAQSection />
      <Footer />
    </div>
  );
}
