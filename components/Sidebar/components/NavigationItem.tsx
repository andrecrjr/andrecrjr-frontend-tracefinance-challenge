import { ChevronRight, ArrowLeftRight } from "lucide-react";

interface NavigationItemProps {
    label: string;
    isActive?: boolean;
    onClick?: () => void;
}

export const NavigationItem = ({ label, isActive }: NavigationItemProps) => {
    return (
        <div className="px-4">
            <button
                className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors group relative
                ${isActive ? "bg-sidebar-active" : "hover:bg-sidebar-hover"}`}
            >
                {isActive && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 h-8 w-1 bg-primary rounded-r-sm" />
                )}
                
                <div className="flex items-center gap-3 pl-2">
                    <ArrowLeftRight className={`w-5 h-5 ${isActive ? "text-primary" : "text-sidebar-muted"}`} />
                    <span className={`text-sm font-medium ${isActive ? "text-sidebar-text" : "text-sidebar-muted"}`}>
                        {label}
                    </span>
                </div>

                <ChevronRight className={`w-4 h-4 ${isActive ? "text-sidebar-text" : "text-sidebar-muted"}`} />
            </button>
        </div>
    );
};
