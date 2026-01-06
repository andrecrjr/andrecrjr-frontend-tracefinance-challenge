"use client";

import { usePathname } from "next/navigation";
import { DefaultSidebar } from "./DefaultSidebar";
import { TransactionSidebar } from "./TransactionSidebar";

export const Sidebar = () => {
    const pathname = usePathname();
    const isTransactionPage = pathname === "/transaction";

    return (
        <div className="w-full md:max-w-[26%] md:min-h-screen bg-sidebar-bg">
            {isTransactionPage ? <TransactionSidebar /> : <DefaultSidebar />}
        </div>
    );
};