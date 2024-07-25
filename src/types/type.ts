export interface userType{
    uid: string;
    email: string;
    emailVerified: boolean;
    isAnonymous: boolean;
    providerData: [
        {
            providerId: string,
            uid: string,
            displayName: string,
            email: string,
            phoneNumber: any,
            photoURL: string
        }
    ],
    stsTokenManager: {
        refreshToken: string;
        accessToken: string;
        expirationTime: number
    },
    createdAt: number;
    lastLoginAt: number;
    apiKey: string;
}
