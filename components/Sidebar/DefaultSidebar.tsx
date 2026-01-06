import Link from "next/link";
import { SidebarLogo } from "./components/SidebarLogo";
import { UserProfile } from "./components/UserProfile";
import { NavigationItem } from "./components/NavigationItem";

export const DefaultSidebar = () => {
    return (
        <aside className="h-full flex flex-col w-full bg-sidebar-bg border-r border-sidebar-border">
            <SidebarLogo />

            <div className="flex-1 flex flex-col gap-2 py-4">
                <Link href="/transaction">
                    <NavigationItem label="Transactions" isActive={true} />
                </Link>
            </div>

            <UserProfile />
        </aside>
    );
};
