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
  <div className="flex items-start gap-2.5 py-[6px]">
    {included ? (
      <svg
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill="none"
        className="flex-shrink-0 mt-0.5"
      >
        <path
          d="M11.6669 3.5L5.25023 9.91667L2.33356 7"
          stroke="#1a1f4e"
          strokeWidth="1.5"
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
        className="flex-shrink-0 mt-0.5"
      >
        <path
          d="M10.5 3.5L3.5 10.5M3.5 3.5L10.5 10.5"
          stroke="#d1d5db"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    )}
    <span
      className={`text-[13px] leading-tight ${
        included ? "text-gray-600" : "text-gray-400"
      }`}
    >
      {text}
    </span>
  </div>
);

// Plan icon component - maps by slug
const PlanIcon = ({ slug }: { slug: string }) => {
  return (
    <div className="w-7 h-7 flex-shrink-0">
      {slug === "individual" && (
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="28" height="28" rx="6" fill="#1a1f4e" fillOpacity="0.1" />
          <path d="M14 13C15.6569 13 17 11.6569 17 10C17 8.34315 15.6569 7 14 7C12.3431 7 11 8.34315 11 10C11 11.6569 12.3431 13 14 13Z" fill="#1a1f4e" />
          <path d="M14 15C10.69 15 8 16.79 8 19V20H20V19C20 16.79 17.31 15 14 15Z" fill="#1a1f4e" />
        </svg>
      )}
      {slug === "small-team" && (
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="28" height="28" rx="6" fill="#1a1f4e" fillOpacity="0.1" />
          <path d="M11 13C12.1046 13 13 12.1046 13 11C13 9.89543 12.1046 9 11 9C9.89543 9 9 9.89543 9 11C9 12.1046 9.89543 13 11 13Z" fill="#1a1f4e" />
          <path d="M17 13C18.1046 13 19 12.1046 19 11C19 9.89543 18.1046 9 17 9C15.8954 9 15 9.89543 15 11C15 12.1046 15.8954 13 17 13Z" fill="#1a1f4e" />
          <path d="M11 15C8.79 15 7 16.79 7 19H15C15 16.79 13.21 15 11 15Z" fill="#1a1f4e" />
          <path d="M17 15C16.53 15 16.09 15.1 15.67 15.24C16.5 16.27 17 17.58 17 19H21C21 16.79 19.21 15 17 15Z" fill="#1a1f4e" />
        </svg>
      )}
      {slug === "organization" && (
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="28" height="28" rx="6" fill="#FF6F00" fillOpacity="0.15" />
          <path d="M8 20H20V10L14 7L8 10V20ZM10 12H12V14H10V12ZM10 16H12V18H10V16ZM14 12H16V14H14V12ZM14 16H16V18H14V16Z" fill="#FF6F00" />
        </svg>
      )}
      {slug === "enterprise" && (
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="28" height="28" rx="6" fill="#1a1f4e" fillOpacity="0.1" />
          <path d="M14 7L15.545 11.91L20.5 12.18L16.59 15.36L17.82 20.18L14 17.27L10.18 20.18L11.41 15.36L7.5 12.18L12.455 11.91L14 7Z" fill="#1a1f4e" />
        </svg>
      )}
      {/* Fallback for custom plan slugs */}
      {!["individual", "small-team", "organization", "enterprise"].includes(slug) && (
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="28" height="28" rx="6" fill="#1a1f4e" fillOpacity="0.1" />
          <path d="M9 11H11V19H9V11ZM13 8H15V19H13V8ZM17 14H19V19H17V14Z" fill="#1a1f4e" />
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
    billingCycle === "monthly" && plan.monthlyPrice ? "/month" : "/year";
  const showPrice = price != null;

  return (
    <div className={`relative ${plan.isPopular ? "lg:-mt-4 lg:mb-4" : ""}`}>
      {plan.isPopular && (
        <div className="flex justify-center mb-0">
          <span className="bg-[#FF6F00] text-white text-[11px] font-medium px-4 py-1.5 rounded-t-lg">
            Most Popular
          </span>
        </div>
      )}

      {isCurrentPlan && !plan.isPopular && (
        <div className="flex justify-center mb-0">
          <span className="bg-green-600 text-white text-[11px] font-medium px-4 py-1.5 rounded-t-lg">
            Current Plan
          </span>
        </div>
      )}

      <div
        className={`bg-white rounded-[10px] p-5 lg:p-6 h-full ${
          plan.isPopular
            ? "shadow-[0_4px_30px_rgba(0,0,0,0.1)] border-l-[3px] border-l-[#FF6F00] border-t border-r border-b border-t-gray-100 border-r-gray-100 border-b-gray-100"
            : isCurrentPlan
            ? "shadow-[0_4px_30px_rgba(0,0,0,0.1)] border-l-[3px] border-l-green-500 border-t border-r border-b border-t-gray-100 border-r-gray-100 border-b-gray-100"
            : "shadow-[0_2px_15px_rgba(0,0,0,0.04)] border border-gray-100 hover:shadow-[0_4px_20px_rgba(0,0,0,0.08)] transition-shadow"
        }`}
      >
        {/* Header */}
        <div className="mb-5">
          <div className="flex items-center gap-2.5 mb-1.5">
            <PlanIcon slug={plan.slug} />
            <h3 className="text-[15px] font-semibold text-gray-900">
              {plan.name}
            </h3>
          </div>
          {plan.tagline && (
            <p className="text-[11px] text-[#FF6F00] font-medium pl-[38px] mb-1">
              {plan.tagline}
            </p>
          )}
          <p className="text-[12px] text-gray-500 leading-relaxed pl-[38px]">
            {plan.description}
          </p>
        </div>

        {/* Price */}
        <div className="mb-5">
          {showPrice ? (
            <>
              <div className="flex items-baseline">
                <span className="text-[32px] font-bold text-gray-900 leading-none">
                  ${price.toLocaleString()}
                </span>
                <span className="text-gray-400 text-[13px] ml-0.5">
                  {period}
                </span>
              </div>
              {plan.maxUsers > 1 && (
                <p className="text-gray-400 text-[12px] mt-1">
                  up to {plan.maxUsers.toLocaleString()} employees
                </p>
              )}
              {plan.additionalUserPrice && (
                <p className="text-[#FF6F00] text-[12px] mt-0.5">
                  ${plan.additionalUserPrice} per additional user
                </p>
              )}
            </>
          ) : (
            <div className="flex items-baseline">
              <span className="text-[32px] font-bold text-gray-900 leading-none">
                Custom
              </span>
            </div>
          )}
        </div>

        {/* CTA Button */}
        <button
          onClick={() => onSelect(plan)}
          disabled={isCurrentPlan || isLoading}
          className={`w-full py-2.5 px-4 rounded-[6px] text-[13px] font-medium transition-all mb-5 ${
            isCurrentPlan
              ? "bg-green-100 text-green-700 cursor-default"
              : plan.isPopular || plan.slug === "organization"
              ? "bg-[#000E51] hover:bg-[#FF6F00] text-white shadow-sm"
              : "border border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300"
          } ${isLoading ? "opacity-50 cursor-wait" : ""}`}
        >
          {isCurrentPlan ? "Current Plan" : plan.ctaText}
        </button>

        {/* Close Line */}
        {plan.closeLine && (
          <p className="text-[11px] text-gray-400 leading-relaxed mb-4 italic">
            {plan.closeLine}
          </p>
        )}

        {/* Divider */}
        <div className="border-t border-gray-100 pt-4 mb-1">
          <p className="text-[11px] font-semibold text-gray-500 uppercase tracking-wide mb-2">
            Includes:
          </p>
        </div>

        {/* Features */}
        <div className="space-y-0">
          {(plan.features as PlanFeature[]).map(
            (feature: PlanFeature, index: number) => (
              <FeatureItem
                key={index}
                text={feature.text}
                included={feature.included}
              />
            )
          )}
        </div>
      </div>
    </div>
  );
};

// Loading skeleton
const PricingCardSkeleton = () => (
  <div className="bg-white rounded-[10px] p-5 lg:p-6 shadow-[0_2px_15px_rgba(0,0,0,0.04)] border border-gray-100 animate-pulse">
    <div className="mb-5">
      <div className="flex items-center gap-2.5 mb-3">
        <div className="w-7 h-7 bg-gray-200 rounded-md" />
        <div className="h-4 bg-gray-200 rounded w-24" />
      </div>
      <div className="h-3 bg-gray-100 rounded w-full ml-[38px]" />
    </div>
    <div className="mb-5">
      <div className="h-8 bg-gray-200 rounded w-28" />
    </div>
    <div className="h-10 bg-gray-100 rounded-[6px] mb-5" />
    <div className="space-y-2">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="h-3 bg-gray-100 rounded w-full" />
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
      <div className="bg-[#1a1f4e] pt-20 pb-36 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-[28px] md:text-[36px] lg:text-[42px] font-bold text-white mb-3 leading-tight">
            Pricing
          </h1>
          <p className="text-gray-300 text-[15px] md:text-[17px] max-w-2xl mx-auto mb-2">
            Invest in better leadership.
          </p>
          <p className="text-gray-400 text-[13px] md:text-[14px] max-w-xl mx-auto">
            Start learning today and build a culture that lasts — one leader,
            one conversation, one lesson at a time.
          </p>

          {/* Billing Toggle */}
          {hasMonthlyOption && (
            <div className="flex items-center justify-center gap-3 mt-6">
              <span
                className={`text-[13px] cursor-pointer ${
                  billingCycle === "monthly"
                    ? "text-white font-medium"
                    : "text-gray-400"
                }`}
                onClick={() => setBillingCycle("monthly")}
              >
                Monthly
              </span>
              <button
                onClick={() =>
                  setBillingCycle((c) =>
                    c === "monthly" ? "yearly" : "monthly"
                  )
                }
                className="relative w-11 h-6 bg-[#FF6F00] rounded-full transition-colors"
              >
                <span
                  className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                    billingCycle === "yearly"
                      ? "translate-x-5.5"
                      : "translate-x-0.5"
                  }`}
                />
              </button>
              <span
                className={`text-[13px] cursor-pointer ${
                  billingCycle === "yearly"
                    ? "text-white font-medium"
                    : "text-gray-400"
                }`}
                onClick={() => setBillingCycle("yearly")}
              >
                Yearly
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16 -mt-28 mb-4">
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
            {error}
          </div>
        </div>
      )}

      {/* Pricing Cards Section */}
      <div className="relative">
        <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16 -mt-24">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-4 items-start">
              {[1, 2, 3, 4].map((i) => (
                <PricingCardSkeleton key={i} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-4 items-start">
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
      <div className="max-w-4xl mx-auto text-center py-16 px-4">
        <h2 className="text-[24px] md:text-[30px] font-bold text-gray-900 mb-3">
          Ready to lead differently?
        </h2>
        <p className="text-gray-500 text-[14px] md:text-[15px] max-w-lg mx-auto mb-6">
          Join thousands of professionals and organizations transforming
          leadership from the inside out.
        </p>
        <button
          onClick={() => router.push("/courses")}
          className="bg-[#000E51] hover:bg-[#FF6F00] text-white px-8 py-3 rounded-lg text-[14px] font-medium transition-colors"
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
