"use client"
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'
import { Button } from '@/components/ui/button'
import { FaLock, FaEye, FaEyeSlash, FaCircleCheck, FaCircleExclamation } from 'react-icons/fa6'

export default function ResetPasswordPage() {
  const router = useRouter()
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [isRecoveryReady, setIsRecoveryReady] = useState(false)

  useEffect(() => {
    // Listener untuk mendeteksi event PASSWORD_RECOVERY dari Supabase
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'PASSWORD_RECOVERY' || session) {
        setIsRecoveryReady(true)
      }
    })

    // Cek juga session saat halaman dimuat
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setIsRecoveryReady(true)
      }
    })

    return () => {
      subscription?.unsubscribe()
    }
  }, [])

  const handleUpdatePassword = async (e) => {
    e.preventDefault()
    setErrorMessage('')

    if (newPassword.length < 6) {
      setErrorMessage('Password baru minimal 6 karakter.')
      return
    }

    if (newPassword !== confirmPassword) {
      setErrorMessage('Konfirmasi password tidak cocok. Silakan periksa kembali.')
      return
    }

    setLoading(true)

    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      })

      if (error) {
        throw error
      }

      setIsSuccess(true)
      setTimeout(() => {
        router.push('/ppdb/login')
      }, 3000)
    } catch (err) {
      console.error('Update password error:', err)
      setErrorMessage(err.message || 'Gagal memperbarui password. Tautan pemulihan mungkin sudah kedaluwarsa.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container max-w-md mx-auto px-4">
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
        <div className="text-center mb-6">
          <span className="inline-block bg-orange-100 text-primary text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-2">
            Keamanan Akun
          </span>
          <h1 className="text-2xl font-bold text-gray-900 font-jost">Buat Password Baru</h1>
          <p className="text-gray-500 text-sm mt-1">
            Masukkan kata sandi baru untuk akun pendaftaran PPDB Anda.
          </p>
        </div>

        {errorMessage && (
          <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm leading-relaxed flex items-start gap-2">
            <FaCircleExclamation className="text-base flex-shrink-0 mt-0.5" />
            <span>{errorMessage}</span>
          </div>
        )}

        {isSuccess ? (
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto text-3xl shadow-sm">
              <FaCircleCheck />
            </div>
            <h2 className="text-lg font-bold text-gray-900 font-jost">Password Berhasil Diperbarui!</h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              Kata sandi baru Anda telah aktif. Anda akan otomatis dialihkan ke halaman masuk dalam 3 detik...
            </p>
            <div className="pt-2">
              <Link
                href="/ppdb/login"
                className="inline-block w-full py-3 bg-primary hover:bg-orange-600 text-white font-bold rounded-xl text-sm transition-all shadow-md text-center"
              >
                Masuk Sekarang
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleUpdatePassword} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5" htmlFor="newPassword">
                Password Baru *
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                  <FaLock />
                </span>
                <input
                  id="newPassword"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Minimal 6 karakter"
                  className="w-full pl-11 pr-11 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm text-gray-800"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5" htmlFor="confirmPassword">
                Ulangi Password Baru *
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                  <FaLock />
                </span>
                <input
                  id="confirmPassword"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Ketik ulang password baru"
                  className="w-full pl-11 pr-11 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm text-gray-800"
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-primary hover:bg-orange-600 text-white font-semibold py-3.5 rounded-xl shadow-md transition-all duration-300 mt-2"
            >
              {loading ? 'Menyimpan...' : 'Simpan Password Baru'}
            </Button>

            <div className="pt-2 text-center">
              <Link
                href="/ppdb/login"
                className="text-xs font-bold text-gray-500 hover:text-primary transition-colors"
              >
                Batal & Kembali ke Halaman Masuk
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}

