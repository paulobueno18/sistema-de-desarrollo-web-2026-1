import { useState } from 'react'
import AdminPanel from './components/AdminPanel'
import Footer from './components/Footer'
import Navbar from './components/Navbar'

export default function AdminApp() {
  return (
    <div className="flex min-h-screen flex-col bg-stone-950 text-white">
      <Navbar route="admin" />
      <main className="flex-grow px-4 py-8 sm:px-6 lg:px-8">
        <AdminPanel />
      </main>
      <Footer />
    </div>
  )
}
