"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getClientName } from "@/lib/portal-session";
import { PortalTopBar } from "@/components/portal/PortalTopBar";
import { PortalDock } from "@/components/portal/PortalDock";

export default function PortalDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [clientName, setClientNameState] = useState<string | null | undefined>(undefined);

  useEffect(() => {
    const name = getClientName();
    if (!name) {
      router.replace("/portal/login");
      return;
    }
    setClientNameState(name);
  }, [router]);

  if (clientName === undefined) {
    return <div className="min-h-screen bg-[#030608]" />;
  }

  if (!clientName) return null;

  return (
    <div className="min-h-screen bg-[#030608]">
      <PortalTopBar clientName={clientName} />
      <main className="max-w-6xl mx-auto px-6 sm:px-8 py-10 pb-32">{children}</main>
      <PortalDock />
    </div>
  );
}
