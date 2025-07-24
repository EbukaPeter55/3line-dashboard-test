import * as React from "react";
import {cn} from "@/lib/utils";

interface CustomTabsContextType {
    activeTab: string;
    setActiveTab: (value: string) => void;
}

const CustomTabsContext = React.createContext<CustomTabsContextType | undefined>(undefined);

const useTabs = () => {
    const context = React.useContext(CustomTabsContext);
    if (!context) {
        throw new Error("useTabs must be used within a CustomTabsProvider");
    }
    return context;
};

interface CustomTabsProps extends React.HTMLAttributes<HTMLDivElement> {
    defaultValue: string;
}

const CustomTabs = React.forwardRef<HTMLDivElement, CustomTabsProps>(
    ({className, defaultValue, children, ...props}, ref) => {
        const [activeTab, setActiveTab] = React.useState(defaultValue);
        const contextValue = React.useMemo(() => ({activeTab, setActiveTab}), [activeTab]);

        return (
            <CustomTabsContext.Provider value={contextValue}>
                <div ref={ref} className={cn("flex flex-col gap-2", className)} {...props}>
                    {children}
                </div>
            </CustomTabsContext.Provider>
        );
    }
);
CustomTabs.displayName = "CustomTabs";

interface CustomTabsListProps extends React.HTMLAttributes<HTMLDivElement> {
}

const CustomTabsList = React.forwardRef<HTMLDivElement, CustomTabsListProps>(
    ({className, children, ...props}, ref) => {
        return (
            <div
                ref={ref}
                role="tablist"
                aria-orientation="horizontal"
                className={cn(
                    "flex items-center overflow-x-auto whitespace-nowrap scroll-smooth no-scrollbar w-full max-w-full",
                    className
                )}
                {...props}
            >
                {children}
            </div>
        );
    }
);
CustomTabsList.displayName = "CustomTabsList";

interface CustomTabTriggerProps extends React.HTMLAttributes<HTMLButtonElement> {
    value: string;
}

const CustomTabTrigger = React.forwardRef<HTMLButtonElement, CustomTabTriggerProps>(
    ({className, value, children, ...props}, ref) => {
        const {activeTab, setActiveTab} = useTabs();
        const isActive = activeTab === value;

        return (
            <button
                ref={ref}
                type="button"
                role="tab"
                aria-selected={isActive}
                data-state={isActive ? "active" : "inactive"}
                onClick={() => setActiveTab(value)}
                className={cn(
                    "flex-none px-4 py-2 text-sm font-medium transition-colors whitespace-nowrap",
                    "border border-transparent rounded-none border-y border-r border-gray-200 text-[#667085]",
                    "data-[state=active]:text-[#1A1A1A] data-[state=active]:border-blue-600 data-[state=active]:bg-white",
                    "dark:text-gray-400 dark:data-[state=active]:text-white dark:data-[state=active]:border-blue-400",
                    className
                )}
                {...props}
            >
                {children}
            </button>
        );
    }
);
CustomTabTrigger.displayName = "CustomTabTrigger";

interface CustomTabContentProps extends React.HTMLAttributes<HTMLDivElement> {
    value: string;
}

const CustomTabContent = React.forwardRef<HTMLDivElement, CustomTabContentProps>(
    ({className, value, children, ...props}, ref) => {
        const {activeTab} = useTabs();
        const isActive = activeTab === value;

        return isActive ? (
            <div
                ref={ref}
                role="tabpanel"
                data-state={isActive ? "active" : "inactive"}
                className={cn("flex-1 w-full outline-none", className)}
                {...props}
            >
                {children}
            </div>
        ) : null;
    }
);
CustomTabContent.displayName = "CustomTabContent";

export {CustomTabs, CustomTabsList, CustomTabTrigger, CustomTabContent};
