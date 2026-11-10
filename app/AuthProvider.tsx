"use client"
import { api } from '@/convex/_generated/api'
import { useUser } from '@stackframe/stack'
import { useMutation } from 'convex/react'
import React, { useEffect, useRef, useState } from 'react'
import { UserContext } from './_context/userContext'

function AuthProvider({ children }: any) {

    const user = useUser()
    const CreateUser = useMutation(api.users.CreateUser)
    const [userData, setUserData] = useState<any>()
    const creatingRef = useRef(false)

    useEffect(() => {
        // Only create/fetch user when logged in
        if (!user?.primaryEmail || creatingRef.current) return
        creatingRef.current = true
        createNewUser()
    }, [user])

    const createNewUser = async () => {
        try {
            const result = await CreateUser({
                name: user?.displayName || '',
                email: user?.primaryEmail || '',
            })
            setUserData(result)
        } catch (error) {
            console.error('Error creating user:', error)
        } finally {
            creatingRef.current = false
        }
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
