export const USER_ROLES = [
    {
        id: "superadmin",
        name: "Superadmin",
        lastActive: "10/2022",
        icon: "https://placehold.co/40x40/aabbcc/ffffff?text=Icon"
    },
    {
        id: "developeradmin",
        name: "Developeradmin",
        lastActive: "10/2022",
        icon: "https://placehold.co/40x40/aabbcc/ffffff?text=Icon"
    },
    {
        id: "supportadmin",
        name: "Supportadmin",
        lastActive: "10/2022",
        icon: "https://placehold.co/40x40/aabbcc/ffffff?text=Icon"
    },
];

// Mock data for your "User Roles" table (from your sampleRoleTableData)
export const sampleRoleTableData = [
    {
        id: 'table_role1',
        name: 'Superadmin',
        type: 'DEFAULT',
        dateCreated: 'Jan 1, 2023',
        status: 'Active',
        roleUsers: [
            {id: 'u1', avatarUrl: 'https://randomuser.me/api/portraits/women/1.jpg'},
            {id: 'u2', avatarUrl: 'https://randomuser.me/api/portraits/men/2.jpg'},
            {id: 'u3', avatarUrl: 'https://randomuser.me/api/portraits/women/3.jpg'},
            {id: 'u4', avatarUrl: 'https://randomuser.me/api/portraits/men/4.jpg'},
            {id: 'u5', avatarUrl: 'https://randomuser.me/api/portraits/women/5.jpg'},
        ],
    },
    {
        id: 'table_role2',
        name: 'Merchantadmin',
        type: 'DEFAULT',
        dateCreated: 'Feb 1, 2023',
        status: 'Active',
        roleUsers: [
            {id: 'u6', avatarUrl: 'https://randomuser.me/api/portraits/men/6.jpg'},
            {id: 'u7', avatarUrl: 'https://randomuser.me/api/portraits/women/7.jpg'},
        ],
    },
    {
        id: 'table_role3',
        name: 'Supportadmin',
        type: 'DEFAULT',
        dateCreated: 'Feb 1, 2023',
        status: 'Active',
        roleUsers: [
            {id: 'u12', avatarUrl: 'https://randomuser.me/api/portraits/women/12.jpg'},
            {id: 'u13', avatarUrl: 'https://randomuser.me/api/portraits/men/13.jpg'},
        ],
    },
    {
        id: 'table_role4',
        name: 'sales personnel',
        type: 'CUSTOM',
        dateCreated: 'Mar 1, 2023',
        status: 'Active',
        roleUsers: [
            {id: 'u14', avatarUrl: 'https://randomuser.me/api/portraits/women/14.jpg'},
        ],
    },
    {
        id: 'table_role5',
        name: 'Deputy sales personnel',
        type: 'CUSTOM',
        dateCreated: 'Apr 1, 2023',
        status: 'In Active',
        roleUsers: [
            {id: 'u8', avatarUrl: 'https://randomuser.me/api/portraits/women/8.jpg'},
            {id: 'u9', avatarUrl: 'https://randomuser.me/api/portraits/men/9.jpg'},
            {id: 'u10', avatarUrl: 'https://randomuser.me/api/portraits/women/10.jpg'},
            {id: 'u11', avatarUrl: 'https://randomuser.me/api/portraits/men/11.jpg'},
        ],
    },
    {
        id: 'table_role6',
        name: 'Developeradmin',
        type: 'SYSTEM-CUSTOM',
        dateCreated: 'May 1, 2023',
        status: 'Active',
        roleUsers: [
            {id: 'u15', avatarUrl: 'https://randomuser.me/api/portraits/men/15.jpg'},
            {id: 'u16', avatarUrl: 'https://randomuser.me/api/portraits/women/16.jpg'},
        ],
    },
    {
        id: 'table_role7',
        name: 'Developer-basic',
        type: 'SYSTEM-CUSTOM',
        dateCreated: 'Jun 1, 2023',
        status: 'Active',
        roleUsers: [
            {id: 'u17', avatarUrl: 'https://randomuser.me/api/portraits/women/17.jpg'},
        ],
    },
];

// Combine all roles into a single array for easier management
export const allRoles = JSON.parse(JSON.stringify([...USER_ROLES, ...sampleRoleTableData]));
