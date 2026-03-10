'use client';

// Mocked Auth Hooks for Boilerplate Implementation
export const useAuth = () => ({
    user: {
        Nickname: 'Boilerplate Admin',
        Email: 'admin@example.com',
        AccountName: 'Admin',
        DomainAccount: 'CORP/admin',
        GAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Boilerplate'
    },
    isLoading: false
});

export const useLogout = () => ({
    mutate: () => console.log('Logout Triggered in Boilerplate')
});
