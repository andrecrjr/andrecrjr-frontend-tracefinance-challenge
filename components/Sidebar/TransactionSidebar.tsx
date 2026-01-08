'use client';

import { useTransactionContext } from "@/context/TransactionContext";
import { SidebarLogo } from "./components/SidebarLogo";
import { StepperItem } from "./components/StepperItem";

type StepStatus = 'active' | 'completed' | 'pending';

function getStepStatus(stepIndex: number, currentStep: number): StepStatus {
    if (stepIndex < currentStep) return 'completed';
    if (stepIndex === currentStep) return 'active';
    return 'pending';
}

export const TransactionSidebar = () => {
    const { currentStep } = useTransactionContext();

    return (
        <aside className="h-full flex flex-col w-full bg-sidebar-bg border-r border-sidebar-border">
            <SidebarLogo />

            <div className="flex-1 px-8 py-8">
                <div className="flex flex-col gap-0">
                    <StepperItem 
                        stepIndex={0}
                        label="Method" 
                        status={getStepStatus(0, currentStep)} 
                    />
                    <StepperItem 
                        stepIndex={1}
                        label="Information" 
                        status={getStepStatus(1, currentStep)}
                        isLast 
                    />
                </div>
            </div>
        </aside>
    );
};
