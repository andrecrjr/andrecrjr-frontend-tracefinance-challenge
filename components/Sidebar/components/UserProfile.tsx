import { ChevronUp } from "lucide-react";

export const UserProfile = () => {
    return (
        <div className="mt-auto px-6 py-6 border-t border-sidebar-border">
            <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-[#4FD1C5] flex items-center justify-center text-[#1A202C] font-semibold text-sm">
                    EM
                </div>
                <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-sidebar-text text-ellipsis overflow-hidden whitespace-nowrap">
                        Evandro
                    </p>
                    <p className="text-xs text-sidebar-muted text-ellipsis overflow-hidden whitespace-nowrap">
                        Trace Finance
                    </p>
                </div>
                <ChevronUp className="w-4 h-4 text-sidebar-muted" />
            </div>
        </div>
    );
};
