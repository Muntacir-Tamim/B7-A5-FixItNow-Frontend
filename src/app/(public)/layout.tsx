import Footer from '@/components/common/Footer';
import Navbar from '@/components/common/Navbar'
import { getMe } from '@/services/getMe'
import React from 'react'

export default async function PublicLayout({children}: {children: React.ReactNode}){
    const user = await getMe();
  return (
    <div>
        <Navbar user={user}/>
        {children}
        <Footer/>
    </div>
  )
}
