import {cn} from "@/lib/utils";
import {CustomTabs, CustomTabsList, CustomTabTrigger, CustomTabContent} from "@/components/ui/custom-tabs";
import RoleTabContent from "@/features/dashboard/pages/DashboardSettings/components/Role";
import {useEffect, useState} from "react";

export default function DashboardSettingsPage() {
    const allTabs = [
        "My details",
        "Profile",
        "Password",
        "Team",
        "Plan",
        "Roles",
        "Notifications",
        "Integrations",
        "API",
    ];

    const mobileTabs = [
        "My details",
        "Profile",
        "Password",
        "Roles",
    ];
    const [visibleTabs, setVisibleTabs] = useState(allTabs);
    useEffect(() => {
        const updateTabs = () => {
            if (window.innerWidth < 840) {
                setVisibleTabs(mobileTabs);
            } else {
                setVisibleTabs(allTabs);
            }
        };

        updateTabs();
        window.addEventListener("resize", updateTabs);
        return () => window.removeEventListener("resize", updateTabs);
    }, []);


    return (
        <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-medium tracking-tight text-[#1A1A1A]">Settings</h2>
            </div>

            <p className="text-left text-[#667085]">
                Manage your team and preferences here.
            </p>
            <CustomTabs defaultValue="roles" className="space-y-6">
                <div className=" overflow-x-auto no-scrollbar w-full min-w-0">
                    <CustomTabsList
                        className="flex w-max justify-start bg-transparent p-0 h-auto rounded-none"
                        data-testid="mock-tabs-list-small-screen"
                    >
                        {visibleTabs.map((tab, index, arr) => {
                            const isFirst = index === 0;
                            const isLast = index === arr.length - 1;

                            return (
                                <CustomTabTrigger
                                    key={tab}
                                    value={tab.toLowerCase().replace(/\s/g, '-')}
                                    className={cn(
                                        "rounded-none whitespace-nowrap px-4 py-2 text-sm font-semibold border-y border-r border-gray-200 text-[#667085] data-[state=active]:text-[#1A1A1A] data-[state=active]:border-blue-600 data-[state=active]:bg-white dark:text-gray-400 dark:data-[state=active]:text-white dark:data-[state=active]:border-blue-400",
                                        isFirst && "border-l rounded-l-md",
                                        isLast && "rounded-r-md"
                                    )}
                                    data-testid={`mock-tab-trigger-${tab.toLowerCase().replace(/\s/g, '-')}`}
                                >
                                    {tab}
                                </CustomTabTrigger>
                            );
                        })}
                    </CustomTabsList>
                </div>

                {/* Tab Contents */}
                <CustomTabContent value="my-details">
                    <p className="text-gray-600">Content for My details.</p>
                </CustomTabContent>
                <CustomTabContent value="profile">
                    <p className="text-gray-600">Content for Profile.</p>
                </CustomTabContent>
                <CustomTabContent value="password">
                    <p className="text-gray-600">Content for Password.</p>
                </CustomTabContent>
                <CustomTabContent value="team">
                    <p className="text-gray-600">Content for Team.</p>
                </CustomTabContent>
                <CustomTabContent value="plan">
                    <p className="text-gray-600">Content for Plan.</p>
                </CustomTabContent>
                <CustomTabContent value="roles">
                    {/* User Roles Section */}
                    <RoleTabContent/>
                </CustomTabContent>
                <CustomTabContent value="notifications">
                    <p className="text-gray-600">Content for Notifications.</p>
                </CustomTabContent>
                <CustomTabContent value="integrations">
                    <p className="text-gray-600">Content for Integrations.</p>
                </CustomTabContent>
                <CustomTabContent value="api">
                    <p className="text-gray-600">Content for API.</p>
                </CustomTabContent>
            </CustomTabs>
        </div>
    );
}
