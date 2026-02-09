import { Metadata } from "next";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Contact Us - LKnight Learning Hub | Spring, Texas",
  description:
    "Contact LKnight Learning Hub by LKnight Productions. Call (832) 953-5517, email inquiries@lknightproductions.com, or visit us at 7312 Louetta Rd. Ste. B118-160, Spring, Texas 77379. Get help with courses, enrollments, and partnerships.",
  keywords: [
    "contact LKnight Learning Hub",
    "LKnight Productions contact",
    "lknightlearninghub contact",
    "Spring Texas education",
    "(832) 953-5517",
    "inquiries@lknightproductions.com",
    "online course support",
    "LMS customer service",
  ],
  canonical: "/contact",
});

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
