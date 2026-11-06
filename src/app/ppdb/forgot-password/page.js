"use client"
import React, { useState } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabaseClient'
import { Button } from '@/components/ui/button'
import { FaEnvelope, FaArrowLeft, FaCircleCheck } from 'react-icons/fa6'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleResetRequest = async (e) => {
    e.preventDefault()
    setErrorMessage('')
    setLoading(true)

    try {
      const redirectUrl = typeof window !== 'undefined' 
        ? `${window.location.origin}/ppdb/reset-password`
        : 'https://tkalfattah.sch.id/ppdb/reset-password'

      const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
        redirectTo: redirectUrl,
      })

      if (error) {
        throw error
      }

      setIsSubmitted(true)
    } catch (err) {
      console.error('Reset password request error:', err)
      setErrorMessage(err.message || 'Gagal mengirim instruksi reset password. Silakan coba lagi.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container max-w-md mx-auto px-4">
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
        <div className="text-center mb-6">
          <span className="inline-block bg-orange-100 text-primary text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-2">
            Pemulihan Akun
          </span>
          <h1 className="text-2xl font-bold text-gray-900 font-jost">Lupa Password?</h1>
          <p className="text-gray-500 text-sm mt-1">
            Masukkan alamat email yang terdaftar untuk menerima tautan pemulihan kata sandi.
          </p>
        </div>

        {errorMessage && (
          <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm leading-relaxed">
            {errorMessage}
          </div>
        )}

        {isSubmitted ? (
          <div className="text-center py-4 space-y-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto text-3xl shadow-sm">
              <FaCircleCheck />
            </div>
            <h2 className="text-lg font-bold text-gray-900 font-jost">Tautan Terkirim!</h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              Kami telah mengirimkan instruksi pemulihan password ke email:
              <br />
              <strong className="text-gray-900 font-mono text-sm">{email}</strong>
            </p>
            <div className="bg-orange-50 border border-orange-200 rounded-xl p-3 text-xs text-orange-950 text-left">
              💡 <strong>Tips:</strong> Jika email belum masuk dalam 2 menit, periksa juga folder <strong>Spam / Promosi</strong> di email Anda.
            </div>

            <div className="pt-2">
              <Link
                href="/ppdb/login"
                className="inline-flex items-center justify-center gap-2 w-full py-3 bg-primary hover:bg-orange-600 text-white font-bold rounded-xl text-sm transition-all shadow-md"
              >
                <FaArrowLeft className="text-xs" /> Kembali ke Halaman Masuk
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleResetRequest} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5" htmlFor="email">
                Alamat Email Akun Anda *
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                  <FaEnvelope />
                </span>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="nama@email.com"
                  className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm text-gray-800"
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-primary hover:bg-orange-600 text-white font-semibold py-3.5 rounded-xl shadow-md transition-all duration-300"
            >
              {loading ? 'Mengirim Tautan...' : 'Kirim Tautan Reset Password'}
            </Button>

            <div className="pt-2 text-center">
              <Link
                href="/ppdb/login"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-500 hover:text-primary transition-colors"
              >
                <FaArrowLeft className="text-[10px]" /> Kembali ke Halaman Masuk
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}

