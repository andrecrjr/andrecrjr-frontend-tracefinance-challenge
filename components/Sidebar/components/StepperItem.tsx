import { Check } from "lucide-react";

interface StepperItemProps {
    stepIndex: number; // For connecting lines logic if needed
    label: string;
    status: "active" | "completed" | "pending";
    isLast?: boolean;
}

export const StepperItem = ({ label, status, isLast }: StepperItemProps) => {
    return (
        <div className="relative flex gap-4">
            {!isLast && (
                <div 
                    className={`absolute left-[11px] top-6 w-px h-full -mb-4 z-0
                    ${status === "completed" ? "bg-primary" : "bg-sidebar-border"}`} 
                />
            )}

            <div className={`relative z-10 w-6 h-6 rounded-full flex items-center justify-center border transition-colors
                ${status === "active" ? "bg-primary border-primary text-black" : ""}
                ${status === "completed" ? "bg-primary border-primary text-black" : ""}
                ${status === "pending" ? "bg-transparent border-sidebar-muted" : ""}
            `}>
                {status === "completed" && <Check className="w-3.5 h-3.5" strokeWidth={3} />}
                {status === "active" && <div className="w-2 h-2 rounded-full bg-[#1A1F1C]" />}
            </div>

            <div className="pb-8 pt-0.5">
                <span className={`text-sm font-medium
                    ${status === "active" || status === "completed" ? "text-sidebar-text" : "text-sidebar-muted"}
                `}>
                    {label}
                </span>
            </div>
        </div>
    );
};
