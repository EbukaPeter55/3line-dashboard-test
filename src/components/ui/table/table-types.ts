export type UserAvatar = {
    id: string;
    avatarUrl: string;
};

export type RoleTableData = {
    id: string;
    name: string;
    type: string;
    dateCreated: string;
    status: 'Active' | 'In Active';
    roleUsers: UserAvatar[];
};
