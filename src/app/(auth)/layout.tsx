import Navbar from '@/components/common/Navbar'
import { getMe } from '@/services/getMe';
import React from 'react'

export default async function AuthLayout({children}: {children: React.ReactNode}){
      const user = await getMe();
  return (
    <div>
        <Navbar user={user}/>
        {children}
    </div>
  )
}
