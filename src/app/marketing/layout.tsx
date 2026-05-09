import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Renegade — Professional Video Editing",
  description: "I transform ordinary content into extraordinary visual experiences. VSLs, YouTube, Shorts, and more.",
};

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
