import { Check } from "lucide-react";

interface StepperItemProps {
    stepIndex: number; // For connecting lines logic if needed
    label: string;
    status: "active" | "completed" | "pending";
    isLast?: boolean;
}

export const StepperItem = ({ label, status, isLast }: StepperItemProps) => {
    return (
        <div className={`relative flex gap-4 h-auto after:${isLast ? "hidden" : "absolute"} after:left-[11px] 
             after:w-px after:h-full after:-mb-4 after:z-0 after:bg-primary`}>

            <div className={`relative z-10 w-6 h-6 rounded-full flex items-center justify-center border transition-colors
                ${status === "active" ? "bg-primary border-primary text-black" : ""}
                ${status === "completed" ? "bg-primary border-primary text-black" : ""}
                ${status === "pending" ? "bg-transparent border-sidebar-muted" : ""}
            `}>
                {status === "completed" && <Check className="w-3.5 h-3.5" strokeWidth={3} />}
                {status === "active" && <div className="w-2 h-2 rounded-full bg-sidebar-bg" />}
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
