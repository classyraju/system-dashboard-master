 
export const UsersColumns = () => [
    {
        title: 'Name',
        field: 'fullname',

    },
    {
        title: 'Email',
        field: 'email',

    },
    {
        title: 'User Inbuilt Status',
        field:'UserInbuiltStatus',
        render: (rowData) => (rowData.status) ? 'Active' : 'In Active',
    },
    {
        title: 'User Overall Status',
        field:'OverallStatus',
        render: (rowData) => (rowData.isDelete) ? 'Removed From Subscription' : 'Has Active Subscription',
    },
    {
        title: 'Role',
        field:'role.name',
        render: (rowData) => (rowData.role.name) ? rowData.role.name : '-',
    },

];