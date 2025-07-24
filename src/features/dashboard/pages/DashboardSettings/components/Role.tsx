import {Label} from "@/components/ui/label";
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group";
import {Input} from "@/components/ui/input";
import {sampleRoleTableData, USER_ROLES} from "@/features/dashboard/pages/shared/constants/role-constant";
import {cn} from "@/lib/utils";
import {Button} from "@/components/ui/button";
import {Plus} from "lucide-react";
import {DataTable} from "@/components/ui/table/table";
import {roleColumns} from "@/components/ui/table/column";
import {useState} from "react";
import {RoleTableData} from "@/components/ui/table/table-types";

export default function RoleTabContent() {
    const [selectedRole, setSelectedRole] = useState<string>("superadmin");
    const [selectedTableRows, setSelectedTableRows] = useState<RoleTableData[]>([]);

    const handleTableRowSelectionChange = (rows: RoleTableData[]) => {
        setSelectedTableRows(rows);
        console.log("Selected table rows:", rows);
    };

    return (
        <>
            <div className="space-y-2 text-left">
                <h3 className="text-xl font-medium text-[#1A1A1A]">User Roles</h3>
                <p className="text-[#667085] dark:text-gray-400">
                    Update your roles details and information.
                </p>
            </div>
            <hr className="my-4"/>

            <div className="flex flex-col md:flex-row md:space-x-8">
                <div className="space-y-2 text-left w-full md:w-1/4">
                    <Label htmlFor="connected-email"
                           className="block text-sm font-medium text-[#344054]"
                           data-testid="mock-label">Connected
                        email</Label>
                    <p className="text-xs text-[#667085] dark:text-gray-400">Select role account</p>
                </div>

                <div className="space-y-2 w-full">
                    {/* RadioGroup wraps RadioGroupItems for connected email options */}
                    <RadioGroup defaultValue="olivia@untitledui.com" className="space-y-3 mt-2 w-full"
                                data-testid="email-radio-group">
                        <div>
                            <div className="flex items-start space-x-2">
                                <RadioGroupItem value="olivia@untitledui.com" id="primary-email-radio"
                                                className="data-[state=checked]:border-[var(--checked-box-colour)] data-[state=checked]:bg-white data-[state=checked]:text-[var(--checked-box-colour)]"
                                                data-testid="mock-radio-group-item"/>
                                <Label htmlFor="my-account-email"
                                       className="block text-sm font-medium text-[#344054] dark:text-gray-300"
                                       data-testid="mock-label">
                                    My account email</Label>
                            </div>
                            <Label htmlFor="primary-email-radio"
                                   className="text-sm font-normal text-[#667085] px-6"
                                   data-testid="mock-label"
                            >olivia@untitledui.com</Label>
                        </div>
                        <div className="flex items-start space-x-2 rounded-lg w-3/4">
                            <RadioGroupItem value="billing@untitledui.com" id="alternative-email-radio"
                                            className="mt-1 data-[state=checked]:border-[var(--checked-box-colour)] data-[state=checked]:bg-white data-[state=checked]:text-[var(--checked-box-colour)]"
                                            data-testid="mock-radio-group-item"
                            />
                            <div className="flex-1">
                                <Label htmlFor="alternative-email-radio"
                                       className="text-sm text-gray-900 dark:text-gray-100"
                                       data-testid="mock-label">An alternative
                                    email</Label>
                                <Input
                                    type="email"
                                    placeholder="billing@untitledui.com"
                                    className="mt-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    data-testid="mock-input"
                                />
                            </div>
                        </div>
                    </RadioGroup>
                </div>
            </div>

            <div className="space-y-5 border-t border-gray-200 pt-6 mt-6">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                    <div className="space-y-2 text-left flex-shrink-0 md:w-1/3">
                        <h3 className="text-xl font-semibold text-[#1A1A1A] dark:text-gray-100">Active Role</h3>
                        <p className="text-[#667085] dark:text-gray-400">
                            Select active role available to the user.
                        </p>
                    </div>

                    <RadioGroup
                        value={selectedRole}
                        onValueChange={setSelectedRole}
                        className="grid grid-cols-1 md:grid-cols-1 gap-4 md:flex-grow"
                        data-testid="role-radio-group"
                    >
                        {USER_ROLES.map((role) => (
                            <div
                                key={role.id}
                                className={cn(
                                    "flex justify-between items-start p-4 border rounded-lg shadow-sm transition-colors duration-200",
                                    selectedRole === role.id
                                        ? "border-[#7F56D9] bg-[rgba(214,187,251,0.5)]"
                                        : "border-gray-200 bg-white"
                                )}
                            >
                                <div>
                                    <Label
                                        htmlFor={role.id}
                                        className={cn(
                                            "font-medium text-sm flex items-top gap-2",
                                            selectedRole === role.id
                                                ? "text-[#7F56D9]"
                                                : "text-[#344054]"
                                        )}
                                        data-testid="role-radio-group"
                                    >
                                        <img src={role.icon} alt={`${role.name} icon`} className="h-9 w-12"/>
                                        <div className="mt-[-.75rem]">{role.name}</div>
                                    </Label>
                                    <div className="pl-14 mt-[-.5rem]">
                                        <p
                                            className={cn(
                                                "text-sm",
                                                selectedRole === role.id
                                                    ? "text-[#7F56D9]"
                                                    : "text-[#667085]"
                                            )}
                                        >
                                            Last active {role.lastActive}
                                        </p>
                                        <div className="text-xs mt-2 flex gap-2">
                                            <Button
                                                variant="link"
                                                size="sm"
                                                className={cn(
                                                    "p-0 h-auto",
                                                    selectedRole === role.id
                                                        ? "text-[#7F56D9]"
                                                        : "text-[#667085]"
                                                )}
                                            >
                                                Set as default
                                            </Button>
                                            <Button
                                                variant="link"
                                                size="sm"
                                                className={cn(
                                                    "p-0 h-auto",
                                                    selectedRole === role.id
                                                        ? "text-[#7F56D9]"
                                                        : "text-[#6941C6]"
                                                )}
                                            >
                                                Edit
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <RadioGroupItem
                                        value={role.id}
                                        id={role.id}
                                        className="cursor-pointer data-[state=checked]:border-[var(--checked-box-colour)] data-[state=checked]:bg-white data-[state=checked]:text-[var(--checked-box-colour)]"
                                        data-testid="mock-radio-group-item"
                                    />
                                </div>
                            </div>
                        ))}
                        <div className="flex w-full pt-2">
                            <Button variant="ghost"
                                    className="cursor-pointer text-[#667085] hover:bg-blue-50 dark:hover:bg-[var(--checked-box-colour)]"
                                    data-testid="add-role-button">
                                <Plus className="mr-2 h-4 w-4"/> Add role to user
                            </Button>
                        </div>
                    </RadioGroup>
                </div>
            </div>
            <div className="space-y-4 border-t border-gray-200 pt-6 mt-6">
                <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                    <h3 className="text-xl font-semibold text-[#1A1A1A] dark:text-gray-100">User Roles</h3>
                    <Button variant="outline"
                            className="text-[#344054] dark:text-gray-200 border-gray-300 dark:border-gray-600 hover:bg-gray-50"
                            data-testid="download-all-button">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
                             fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                             strokeLinejoin="round" className="lucide lucide-download mr-2">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                            <polyline points="7 10 12 15 17 10"/>
                            <line x1="12" x2="12" y1="15" y2="3"/>
                        </svg>
                        Download all
                    </Button>
                </div>
                <div className="mt-4 max-w-[19.2rem] sm:max-w-full">
                    <DataTable
                        columns={roleColumns}
                        data={sampleRoleTableData}
                        pagination={true}
                        hasTableTitle={false}
                        showUpAndDownArrows={false}
                        emptyTitle="No roles found"
                        emptyDescription="Adjust filters or add new roles."
                        enableRowSelection={true}
                        onRowSelectionChange={handleTableRowSelectionChange}
                        data-testid="mock-data-table"
                    />
                </div>
            </div>
        </>
    )
}
