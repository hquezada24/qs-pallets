"use client";
import SidebarMenu from "@/components/SidebarMenu";
import DashboardHeader from "@/components/DashboardHeader";
import { useState } from "react";
import { useSession } from "next-auth/react";

const DashboardShell = ({ children }) => {
  const { data: session, status } = useSession();
  const [isOpen, setIsOpen] = useState(true);

  if (status === "loading") return <p>Loading...</p>;

  if (!session) return <p>Not authenticated</p>;

  return (
    <div className="flex min-h-screen">
      <SidebarMenu isOpen={isOpen} setIsOpen={setIsOpen} />
      <div className="flex flex-col flex-1 min-w-0 transition-all duration-350">
        <DashboardHeader isOpen={isOpen} />
        <main className="flex-1 p-0">{children}</main>
      </div>
    </div>
  );
};

export default DashboardShell;
