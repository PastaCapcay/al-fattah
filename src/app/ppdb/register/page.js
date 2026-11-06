"use client"
import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'
import { Button } from '@/components/ui/button'
import { FaUser, FaPhone, FaEnvelope, FaLock, FaEye, FaEyeSlash, FaCircleCheck } from 'react-icons/fa6'

export default function RegisterPage() {
  const router = useRouter()
  const [fullName, setFullName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [registrationSuccess, setRegistrationSuccess] = useState(false)

  const handleRegister = async (e) => {
    e.preventDefault()
    setErrorMessage('')

    if (password.length < 6) {
      setErrorMessage('Password minimal 6 karakter.')
      return
    }

    if (password !== confirmPassword) {
      setErrorMessage('Konfirmasi password tidak cocok.')
      return
    }

    setLoading(true)

    try {
      // 1. Daftarkan akun ke Supabase Auth
      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password: password,
        options: {
          data: {
            full_name: fullName.trim(),
            phone: phone.trim(),
            role: 'parent'
          }
        }
      })

      if (error) {
        throw error
      }

      if (data?.user) {
        // 2. Simpan profil ke tabel profiles jika session ada
        if (data.session) {
          await supabase.from('profiles').upsert({
            id: data.user.id,
            full_name: fullName.trim(),
            phone: phone.trim(),
            role: 'parent'
          })
          // Arahkan langsung ke dashboard
          router.push('/ppdb/dashboard')
        } else {
          // Jika tidak ada session, berarti konfirmasi email aktif di Supabase!
          setRegistrationSuccess(true)
        }
      }
    } catch (err) {
      console.error('Registration error:', err)
      setErrorMessage(err.message || 'Gagal mendaftar. Silakan coba lagi.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container max-w-lg mx-auto px-4">
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
        <div className="text-center mb-8">
          <span className="inline-block bg-orange-100 text-primary text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-2">
            PPDB Online 2026/2027
          </span>
          <h1 className="text-2xl font-bold text-gray-900 font-jost">Buat Akun Wali Murid</h1>
          <p className="text-gray-500 text-sm mt-1">Daftarkan akun untuk mulai mengisi data pendaftaran dan mengunggah berkas calon siswa.</p>
        </div>

        {errorMessage && (
          <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">
            {errorMessage}
          </div>
        )}

        {registrationSuccess ? (
          <div className="text-center py-4 space-y-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto text-3xl shadow-sm">
              <FaCircleCheck />
            </div>
            <h2 className="text-xl font-bold text-gray-900 font-jost">Pendaftaran Akun Berhasil!</h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              Tautan konfirmasi telah kami kirimkan ke email:<br />
              <strong className="text-gray-900 font-mono text-sm">{email}</strong>
            </p>
            <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 text-xs text-orange-950 text-left leading-relaxed space-y-1">
              <p className="font-bold">📧 Langkah Selanjutnya:</p>
              <p>1. Buka kotak masuk (Inbox) atau folder Spam di email Anda.</p>
              <p>2. Klik tombol <strong>"Konfirmasi Email Saya"</strong> pada email dari Al-Fattah.</p>
              <p>3. Setelah email terverifikasi, Anda dapat langsung masuk ke portal PPDB.</p>
            </div>
            <div className="pt-2">
              <Link
                href="/ppdb/login"
                className="inline-flex items-center justify-center w-full py-3.5 bg-primary hover:bg-orange-600 text-white font-bold rounded-xl text-sm transition-all shadow-md"
              >
                Masuk ke Akun Anda
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1" htmlFor="fullName">
              Nama Lengkap Orang Tua / Wali *
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                <FaUser />
              </span>
              <input
                id="fullName"
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Contoh: Budi Santoso"
                className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm text-gray-800"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1" htmlFor="phone">
              Nomor WhatsApp Aktif *
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                <FaPhone />
              </span>
              <input
                id="phone"
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="08xxxxxxxxxx"
                className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm text-gray-800"
              />
            </div>
            <p className="text-xs text-gray-400 mt-1">Digunakan admin untuk konfirmasi pendaftaran & undangan trial class.</p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1" htmlFor="email">
              Alamat Email *
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

          <div className="grid sm:grid-cols-2 grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1" htmlFor="password">
                Password *
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                  <FaLock />
                </span>
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Min. 6 digit"
                  className="w-full pl-11 pr-10 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm text-gray-800"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1" htmlFor="confirmPassword">
                Ulangi Password *
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
                  placeholder="Ulangi password"
                  className="w-full pl-11 pr-10 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm text-gray-800"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>
          </div>

          <div className="pt-2">
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-primary hover:bg-orange-600 text-white font-semibold py-3.5 rounded-xl shadow-md transition-all duration-300"
            >
              {loading ? 'Mendaftarkan Akun...' : 'Daftar Sekarang & Mulai'}
            </Button>
          </div>
        </form>
        )}

        <div className="mt-8 pt-6 border-t border-gray-100 text-center text-sm text-gray-600">
          Sudah pernah mendaftar?{' '}
          <Link href="/ppdb/login" className="font-bold text-primary hover:underline">
            Masuk ke Akun Anda
          </Link>
        </div>
      </div>
    </div>
  )
}

