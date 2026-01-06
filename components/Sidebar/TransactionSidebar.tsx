import { SidebarLogo } from "./components/SidebarLogo";
import { StepperItem } from "./components/StepperItem";

export const TransactionSidebar = () => {
    return (
        <aside className="h-full flex flex-col w-full bg-sidebar-bg border-r border-sidebar-border">
            <SidebarLogo />

            <div className="flex-1 px-8 py-8">
                <div className="flex flex-col gap-0">
                    <StepperItem 
                        stepIndex={0}
                        label="Method" 
                        status="active" 
                    />
                    <StepperItem 
                        stepIndex={1}
                        label="Information" 
                        status="pending"
                        isLast 
                    />
                </div>
            </div>
        </aside>
    );
};
