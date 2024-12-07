'use client'

import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function Hero() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: ''
  })
  const [error, setError] = useState('')

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return regex.test(email)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!validateEmail(formData.email)) {
      setError('Please enter a valid email address')
      return
    }

    try {
      const response = await fetch('/api/submit-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error('Submission failed')
      }

      // Reset form on success
      setFormData({ firstName: '', lastName: '', email: '' })
      alert('Thank you for subscribing!')
    } catch (err) {
      setError('Failed to submit. Please try again.')
    }
  }

  return (
    <section className="relative h-screen flex items-center justify-center">
      <div 
        className="absolute inset-0 bg-cover bg-center z-0" 
        style={{backgroundImage: "url('/splashbackground.png')"}}
      />
      <div className="relative z-10 text-center text-white">
        <h1 className="text-5xl font-bold mb-4">What the Tech, Bend?</h1>
        <p className="text-xl mb-8">Join our local tech community in Bend, Oregon!</p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-2 items-center max-w-md mx-auto">
          <div className="flex gap-2 w-full">
            <Input
              type="text"
              placeholder="First Name"
              value={formData.firstName}
              onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
              className="bg-white/10 backdrop-blur-sm text-white placeholder:text-white/70"
              required
            />
            <Input
              type="text"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
              className="bg-white/10 backdrop-blur-sm text-white placeholder:text-white/70"
              required
            />
          </div>
          <Input
            type="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
            className="w-full bg-white/10 backdrop-blur-sm text-white placeholder:text-white/70"
            required
          />
          {error && <p className="text-red-400 text-sm">{error}</p>}
          <Button type="submit" className="w-full">Subscribe</Button>
        </form>
      </div>
    </section>
  )
}

