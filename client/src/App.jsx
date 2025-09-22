import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Hero from './components/Hero'
import Footer from './components/Footer'
import SentimentSection from "./components/SentimentSection";
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import CommentsPage from "./pages/CommentsPage";
import PostDetails from './pages/PostDetails'
import Settings from "./pages/Settings";
import Profile from './pages/Profile'


export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-100">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard/:id" element={<Dashboard />} />
          <Route path="/comments/:id" element={<CommentsPage />} />
          <Route path="/post/:id" element={<PostDetails />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />

        </Routes>
      </main>
      <SentimentSection/>
      <Footer />
    </div>
  )
}