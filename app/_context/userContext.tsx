import { createContext, Dispatch, SetStateAction } from 'react'

interface UserContextType {
    userData: any;
    setUserData: Dispatch<SetStateAction<any>>;
}

export const UserContext = createContext<UserContextType | null>(null)