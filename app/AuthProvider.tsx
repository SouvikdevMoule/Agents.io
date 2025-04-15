"use client"
import { api } from '@/convex/_generated/api'
import { useUser } from '@stackframe/stack'
import { useMutation } from 'convex/react'
import React, { useEffect, useState } from 'react'
import { UserContext } from './_context/userContext'

function AuthProvider({ children }: any) {

    const user = useUser()
    const CreateUser = useMutation(api.users.CreateUser)
    const [userData, setUserData] = useState<any>()
    useEffect(() => {

        console.log('user', user)
        creatnewUser()
    }, [user])

    const creatnewUser = async () => {
        const result = await CreateUser({
            name: user?.displayName || '',
            email: user?.primaryEmail || '',
            
        })
        setUserData(result)
        console.log(result)
    }
        return (
            <div>
                <UserContext.Provider value={{ userData, setUserData}}>
                    {children}
                </UserContext.Provider>
                
            </div>
        )
    }

    export default AuthProvider
