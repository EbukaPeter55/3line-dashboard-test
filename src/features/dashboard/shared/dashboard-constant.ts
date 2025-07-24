import {Settings, Home, BarChart} from "lucide-react";
import projectIcon from "../../../assets/dashboard/projects.png";
import taskIcon from "../../../assets/dashboard/task.png";
import reportingIcon from "../../../assets/dashboard/reporting.png";
import userIcon from "../../../assets/dashboard/users.png";
import supportIcon from "../../../assets/dashboard/support.png";
import {
    NavItem,
} from "./dashboard-types";

export const navItems: NavItem[] = [
    {
        href: "/dashboard",
        label: "Home",
        icon: Home,
    },
    {
        href: "",
        label: "Dashboard",
        icon: BarChart,
    },
    {
        href: "",
        label: "Projects",
        count: 10,
        image: {default: projectIcon, active: projectIcon}
    },
    {
        href: "",
        label: "Tasks",
        image: {default: taskIcon, active: taskIcon}
    },
    {
        href: "",
        label: "Reporting",
        image: {default: reportingIcon, active: reportingIcon}
    },
    {
        href: "",
        label: "Users",
        image: {default: userIcon, active: userIcon}
    },
    {
        href: "",
        label: "Support",
        image: {default: supportIcon, active: supportIcon}
    },

    {href: "/dashboard/settings", label: "Settings", icon: Settings},
    {type: "divider"},
];
