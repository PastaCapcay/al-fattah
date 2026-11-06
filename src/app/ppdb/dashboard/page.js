"use client"
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase, uploadPPDBFile } from '@/lib/supabaseClient'
import { Button } from '@/components/ui/button'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import { 
  FaUserCheck, 
  FaFilePdf, 
  FaCloudArrowUp, 
  FaRightFromBracket, 
  FaCircleCheck, 
  FaClock, 
  FaCircleExclamation, 
  FaFileLines, 
  FaWhatsapp,
  FaCalendarDays,
  FaBullhorn,
  FaListCheck,
  FaClockRotateLeft,
  FaChevronDown,
  FaChevronUp,
  FaCircleDot
} from 'react-icons/fa6'

export default function ParentDashboard() {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(null)
  const [registration, setRegistration] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [activeStep, setActiveStep] = useState(1)
  const [message, setMessage] = useState({ type: '', text: '' })
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)

  // Form State
  const [program, setProgram] = useState('KB')
  const [childName, setChildName] = useState('')
  const [nickname, setNickname] = useState('')
  const [gender, setGender] = useState('L')
  const [birthPlace, setBirthPlace] = useState('')
  const [birthDate, setBirthDate] = useState('')
  const [religion, setReligion] = useState('Islam')
  const [childOrder, setChildOrder] = useState('1')
  const [totalSiblings, setTotalSiblings] = useState('1')
  const [bloodType, setBloodType] = useState('A')
  const [medicalHistory, setMedicalHistory] = useState('')
  const [address, setAddress] = useState('')

  // Data Orang Tua
  const [fatherName, setFatherName] = useState('')
  const [fatherJob, setFatherJob] = useState('')
  const [motherName, setMotherName] = useState('')
  const [motherJob, setMotherJob] = useState('')
  const [phoneWa, setPhoneWa] = useState('')
  const [email, setEmail] = useState('')
  const [parentAddress, setParentAddress] = useState('')
  const [guardianName, setGuardianName] = useState('')

  // URLs Dokumen
  const [photoUrl, setPhotoUrl] = useState('')
  const [familyCardUrl, setFamilyCardUrl] = useState('')
  const [fatherIdUrl, setFatherIdUrl] = useState('')
  const [motherIdUrl, setMotherIdUrl] = useState('')
  const [birthCertUrl, setBirthCertUrl] = useState('')
  const [uploadingDoc, setUploadingDoc] = useState('')
  const [announcements, setAnnouncements] = useState([])
  const [showLogTimeline, setShowLogTimeline] = useState(false)

  useEffect(() => {
    loadUserData()
    loadAnnouncements()
  }, [])

  const loadUserData = async () => {
    try {
      setLoading(true)
      const { data: { session } } = await supabase.auth.getSession()

      if (!session) {
        router.push('/ppdb/login')
        return
      }

      setUser(session.user)

      // Ambil Profil
      const { data: prof } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .maybeSingle()

      if (prof) {
        setProfile(prof)
        setPhoneWa(prof.phone || '')
        setEmail(session.user.email || '')
      }

      // Ambil Data Pendaftaran
      const { data: reg, error: regError } = await supabase
        .from('registrations')
        .select('*')
        .eq('user_id', session.user.id)
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle()

      if (reg) {
        setRegistration(reg)
        setProgram(reg.program || 'KB')
        setChildName(reg.child_name || '')
        setNickname(reg.nickname || '')
        setGender(reg.gender || 'L')
        setBirthPlace(reg.birth_place || '')
        setBirthDate(reg.birth_date ? reg.birth_date.split('T')[0] : '')
        setReligion(reg.religion || 'Islam')
        setChildOrder(reg.child_order?.toString() || '1')
        setTotalSiblings(reg.total_siblings?.toString() || '1')
        setBloodType(reg.blood_type || 'A')
        setMedicalHistory(reg.medical_history || '')
        setAddress(reg.address || '')

        setFatherName(reg.father_name || '')
        setFatherJob(reg.father_job || '')
        setMotherName(reg.mother_name || '')
        setMotherJob(reg.mother_job || '')
        setPhoneWa(reg.phone_wa || prof?.phone || '')
        setEmail(reg.email || session.user.email || '')
        setParentAddress(reg.parent_address || '')
        setGuardianName(reg.guardian_name || '')

        setPhotoUrl(reg.photo_url || '')
        setFamilyCardUrl(reg.family_card_url || '')
        setFatherIdUrl(reg.father_id_url || '')
        setMotherIdUrl(reg.mother_id_url || '')
        setBirthCertUrl(reg.birth_cert_url || '')
      }
    } catch (err) {
      console.error('Error loading PPDB dashboard data:', err)
    } finally {
      setLoading(false)
    }
  }

  const loadAnnouncements = async () => {
    try {
      const { data, error } = await supabase
        .from('announcements')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false })
      if (!error && data) {
        setAnnouncements(data)
      }
    } catch (err) {
      console.error('Error fetching announcements:', err)
    }
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/ppdb/login')
  }

  const handleFileUpload = async (e, type, setter) => {
    const file = e.target.files[0]
    if (!file) return

    if (file.size > 5 * 1024 * 1024) {
      alert('Ukuran file maksimal 5 MB.')
      return
    }

    setUploadingDoc(type)
    try {
      const url = await uploadPPDBFile(file, `user_${user.id}_${type}`)
      setter(url)
      setMessage({ type: 'success', text: `Berkas ${type} berhasil diunggah.` })
    } catch (err) {
      console.error('Upload failed:', err)
      setMessage({ type: 'error', text: 'Gagal mengunggah berkas. Coba lagi.' })
    } finally {
      setUploadingDoc('')
    }
  }

  const handleSaveRegistration = async (isFinalSubmit = false) => {
    if (isFinalSubmit) {
      if (!childName || !birthPlace || !birthDate || !address || !fatherName || !motherName || !phoneWa) {
        setMessage({ type: 'error', text: 'Harap lengkapi semua data wajib bertanda bintang (*) sebelum mengirim.' })
        return
      }
    }

    setSaving(true)
    setMessage({ type: '', text: '' })

    try {
      const regNumber = registration?.reg_number || `ALF-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`
      const payload = {
        user_id: user.id,
        reg_number: regNumber,
        program,
        status: isFinalSubmit ? 'submitted' : (registration?.status || 'draft'),
        child_name: childName,
        nickname,
        gender,
        birth_place: birthPlace,
        birth_date: birthDate || null,
        religion,
        child_order: parseInt(childOrder) || 1,
        total_siblings: parseInt(totalSiblings) || 1,
        blood_type: bloodType,
        medical_history: medicalHistory,
        address,
        father_name: fatherName,
        father_job: fatherJob,
        mother_name: motherName,
        mother_job: motherJob,
        phone_wa: phoneWa,
        email,
        parent_address: parentAddress,
        guardian_name: guardianName,
        photo_url: photoUrl,
        family_card_url: familyCardUrl,
        father_id_url: fatherIdUrl,
        mother_id_url: motherIdUrl,
        birth_cert_url: birthCertUrl,
        updated_at: new Date().toISOString()
      }

      if (registration?.id) {
        const { data, error } = await supabase
          .from('registrations')
          .update(payload)
          .eq('id', registration.id)
          .select()
          .single()

        if (error) throw error
        setRegistration(data)
      } else {
        const { data, error } = await supabase
          .from('registrations')
          .insert({ ...payload, created_at: new Date().toISOString() })
          .select()
          .single()

        if (error) throw error
        setRegistration(data)
      }

      setMessage({
        type: 'success',
        text: isFinalSubmit 
          ? 'Formulir pendaftaran berhasil dikirim! Pihak sekolah akan segera memverifikasi data Anda.'
          : 'Draf pendaftaran berhasil disimpan.'
      })
    } catch (err) {
      console.error('Error saving registration:', err)
      setMessage({ type: 'error', text: err.message || 'Gagal menyimpan pendaftaran.' })
    } finally {
      setSaving(false)
    }
  }

  const handleDownloadBuktiPDF = () => {
    if (!registration) return

    const doc = new jsPDF()
    const primaryColor = [247, 148, 30] // Orange Al-Fattah
    const darkColor = [30, 41, 59]

    // Header Kartu Bukti
    doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2])
    doc.rect(0, 0, 210, 36, 'F')

    doc.setTextColor(255, 255, 255)
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(16)
    doc.text('BUKTI PENDAFTARAN PESERTA DIDIK BARU', 105, 16, { align: 'center' })
    doc.setFontSize(11)
    doc.setFont('helvetica', 'normal')
    doc.text('TK, KB, DAN DAYCARE AL-FATTAH — YAYASAN WIRA MAHARDHIKA WICAKSANA', 105, 25, { align: 'center' })

    // No Registrasi Box
    doc.setFillColor(241, 245, 249)
    doc.roundedRect(15, 44, 180, 22, 3, 3, 'F')
    doc.setTextColor(darkColor[0], darkColor[1], darkColor[2])
    doc.setFontSize(10)
    doc.text('NOMOR REGISTRASI:', 22, 53)
    doc.setFontSize(14)
    doc.setFont('helvetica', 'bold')
    doc.text(registration.reg_number || '-', 22, 61)

    doc.setFontSize(10)
    doc.setFont('helvetica', 'normal')
    doc.text('PROGRAM PILIHAN:', 120, 53)
    doc.setFontSize(14)
    doc.setFont('helvetica', 'bold')
    doc.text(`Program ${registration.program}`, 120, 61)

    // Data Pendaftar Table
    const dataTable = [
      ['Nama Lengkap Calon Siswa', registration.child_name || '-'],
      ['Nama Panggilan', registration.nickname || '-'],
      ['Jenis Kelamin', registration.gender === 'L' ? 'Laki-laki' : 'Perempuan'],
      ['Tempat, Tanggal Lahir', `${registration.birth_place || '-'}, ${registration.birth_date ? new Date(registration.birth_date).toLocaleDateString('id-ID') : '-'}`],
      ['Alamat Tempat Tinggal', registration.address || '-'],
      ['Nama Orang Tua (Ayah / Ibu)', `${registration.father_name || '-'} / ${registration.mother_name || '-'}`],
      ['No. WhatsApp Wali Murid', registration.phone_wa || '-'],
      ['Status Berkas Saat Ini', registration.status?.toUpperCase() || 'TERKIRIM'],
      ['Tanggal Pendaftaran', new Date(registration.created_at).toLocaleDateString('id-ID', { dateStyle: 'full' })]
    ]

    autoTable(doc, {
      startY: 74,
      body: dataTable,
      theme: 'grid',
      headStyles: { fillColor: primaryColor },
      bodyStyles: { fontSize: 9.5, cellPadding: 3.5 },
      columnStyles: {
        0: { cellWidth: 65, fontStyle: 'bold', fillColor: [248, 250, 252] },
        1: { cellWidth: 115 }
      },
      margin: { left: 15, right: 15 }
    })

    const finalY = doc.lastAutoTable.finalY + 12
    doc.setFontSize(9)
    doc.setFont('helvetica', 'bold')
    doc.text('CATATAN PENTING:', 15, finalY)
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(8.5)
    doc.text('1. Simpan lembar bukti pendaftaran ini sebagai arsip calon wali murid.', 15, finalY + 6)
    doc.text('2. Petugas sekolah akan menghubungi nomor WhatsApp terdaftar untuk jadwal observasi/trial class.', 15, finalY + 12)
    doc.text('3. Layanan informasi & konfirmasi: WhatsApp 0812-9846-5771.', 15, finalY + 18)

    doc.save(`Bukti_PPDB_${registration.reg_number}_${(registration.child_name || 'AlFattah').replace(/\s+/g, '_')}.pdf`)
  }

  const handleDownloadKartu = () => {
    if (!registration) return
    const doc = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a5' })
    const primaryColor = [247, 148, 30] // Orange Al-Fattah
    const accentGreen = [16, 185, 129] // Emerald

    // Background border frame
    doc.setDrawColor(primaryColor[0], primaryColor[1], primaryColor[2])
    doc.setLineWidth(1.2)
    doc.roundedRect(6, 6, 198, 136, 4, 4, 'S')

    // Header Background
    doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2])
    doc.rect(7, 7, 196, 26, 'F')

    // Judul Kop
    doc.setTextColor(255, 255, 255)
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(15)
    doc.text('KARTU PESERTA PPDB 2026/2027', 105, 17, { align: 'center' })
    doc.setFontSize(10)
    doc.setFont('helvetica', 'normal')
    doc.text('TK, KB, DAN DAYCARE AL-FATTAH', 105, 24, { align: 'center' })

    // Badge DITERIMA
    doc.setFillColor(accentGreen[0], accentGreen[1], accentGreen[2])
    doc.roundedRect(148, 38, 48, 12, 3, 3, 'F')
    doc.setTextColor(255, 255, 255)
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(10)
    doc.text('DITERIMA RESMI', 172, 45.5, { align: 'center' })

    // Box No. Registrasi
    doc.setFillColor(254, 243, 199)
    doc.roundedRect(15, 38, 128, 16, 2, 2, 'F')
    doc.setTextColor(180, 83, 9)
    doc.setFontSize(8)
    doc.setFont('helvetica', 'bold')
    doc.text('NOMOR REGISTRASI RESMI:', 20, 44)
    doc.setFontSize(14)
    doc.setTextColor(247, 148, 30)
    doc.text(registration.reg_number || '-', 20, 51)

    // Data Pendaftar
    const info = [
      ['Nama Calon Siswa', `: ${registration.child_name || '-'}`],
      ['Nama Panggilan', `: ${registration.nickname || '-'}`],
      ['Program Diterima', `: ${registration.program} (${registration.program === 'KB' ? 'Kelompok Bermain' : registration.program === 'TK' ? 'Taman Kanak-Kanak' : 'Daycare'})`],
      ['Jenis Kelamin', `: ${registration.gender === 'L' ? 'Laki-laki' : 'Perempuan'}`],
      ['Tempat, Tanggal Lahir', `: ${registration.birth_place || '-'}, ${registration.birth_date ? new Date(registration.birth_date).toLocaleDateString('id-ID') : '-'}`],
      ['Nama Orang Tua / Wali', `: ${registration.father_name || registration.mother_name || '-'}`],
      ['No. WhatsApp Terdaftar', `: ${registration.phone_wa || '-'}`],
    ]

    let yPos = 62
    doc.setFontSize(9.5)
    info.forEach(([label, val]) => {
      doc.setTextColor(100, 116, 139)
      doc.setFont('helvetica', 'bold')
      doc.text(label, 20, yPos)
      doc.setTextColor(15, 23, 42)
      doc.setFont('helvetica', 'normal')
      doc.text(val, 70, yPos)
      yPos += 7.5
    })

    // Pasfoto Box di kanan
    doc.setDrawColor(203, 213, 225)
    doc.setLineWidth(0.5)
    doc.rect(156, 56, 30, 40)
    doc.setFontSize(8)
    doc.setTextColor(148, 163, 184)
    doc.text('PASFOTO', 171, 74, { align: 'center' })
    doc.text('3 x 4', 171, 79, { align: 'center' })

    // Catatan dan Tanda Pengesahan
    doc.setDrawColor(226, 232, 240)
    doc.line(15, 118, 195, 118)

    doc.setFontSize(7.5)
    doc.setTextColor(100, 116, 139)
    doc.setFont('helvetica', 'italic')
    doc.text('* Kartu ini merupakan bukti sah bahwa calon peserta didik telah diterima di Al-Fattah.', 15, 124)
    doc.text('* Harap tunjukkan kartu ini pada saat daftar ulang / penyerahan berkas fisik.', 15, 129)

    doc.setFont('helvetica', 'normal')
    doc.text(`Dicetak pada: ${new Date().toLocaleDateString('id-ID')} ${new Date().toLocaleTimeString('id-ID')}`, 195, 129, { align: 'right' })

    doc.save(`Kartu_Peserta_${registration.reg_number}_${(registration.child_name || 'AlFattah').replace(/\s+/g, '_')}.pdf`)
  }

  if (loading) {
    return (
      <div className="container max-w-4xl mx-auto py-16 text-center">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-500 font-medium">Memuat portal pendaftaran...</p>
      </div>
    )
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case 'accepted':
        return (
          <span className="inline-flex items-center gap-1.5 bg-emerald-100 text-emerald-800 font-bold px-3 py-1 rounded-full text-xs">
            <FaCircleCheck /> DITERIMA DI AL-FATTAH
          </span>
        )
      case 'perbaikan':
        return (
          <span className="inline-flex items-center gap-1.5 bg-rose-100 text-rose-800 font-bold px-3 py-1 rounded-full text-xs">
            <FaCircleExclamation /> PERLU PERBAIKAN BERKAS
          </span>
        )
      case 'submitted':
        return (
          <span className="inline-flex items-center gap-1.5 bg-amber-100 text-amber-800 font-bold px-3 py-1 rounded-full text-xs">
            <FaClock /> MENUNGGU VERIFIKASI ADMIN
          </span>
        )
      default:
        return (
          <span className="inline-flex items-center gap-1.5 bg-gray-100 text-gray-700 font-bold px-3 py-1 rounded-full text-xs">
            <FaFileLines /> DRAF BELUM DIKIRIM
          </span>
        )
    }
  }

  const isAccepted = registration?.status === 'accepted'

  // Hitung Progress Kelengkapan Data & Berkas
  const childFieldsCount = [
    childName, nickname, gender, birthPlace, birthDate, address
  ].filter(Boolean).length

  const parentFieldsCount = [
    fatherName, fatherJob, motherName, motherJob, phoneWa, parentAddress
  ].filter(Boolean).length

  const docFieldsCount = [
    photoUrl, familyCardUrl, fatherIdUrl, motherIdUrl, birthCertUrl
  ].filter(Boolean).length

  const totalFilled = childFieldsCount + parentFieldsCount + docFieldsCount
  const totalRequired = 17
  const progressPercentage = Math.min(100, Math.round((totalFilled / totalRequired) * 100))

  return (
    <div className="container max-w-4xl mx-auto px-4">
      {/* Header Profile User */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <span className="text-xs uppercase font-bold text-gray-400 tracking-wider">Dashboard Orang Tua</span>
          <h1 className="text-2xl font-bold text-gray-900 font-jost mt-0.5">
            Selamat Datang, {profile?.full_name || user?.email}
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Pantau status pendaftaran dan kelengkapan dokumen calon siswa di sini.
          </p>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <Button
            onClick={() => setShowLogoutConfirm(true)}
            variant="outline"
            className="flex items-center gap-2 text-sm text-red-600 border-red-200 hover:bg-red-50 w-full sm:w-auto justify-center"
          >
            <FaRightFromBracket /> Keluar
          </Button>
        </div>
      </div>

      {/* Pengumuman Sekolah */}
      {announcements && announcements.length > 0 && (
        <div className="mb-6 space-y-3">
          <div className="flex items-center gap-2 text-primary font-bold text-sm">
            <FaBullhorn /> Pengumuman Resmi Sekolah
          </div>
          <div className="space-y-3">
            {announcements.map((ann) => (
              <div key={ann.id} className="bg-orange-50/90 border border-orange-200 rounded-2xl p-4 shadow-sm">
                <div className="flex items-start justify-between gap-2">
                  <h4 className="font-bold text-gray-900 text-sm">{ann.title}</h4>
                  <span className="text-[11px] text-gray-500 whitespace-nowrap">
                    {new Date(ann.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </span>
                </div>
                <p className="text-xs text-gray-700 mt-1.5 whitespace-pre-line leading-relaxed">{ann.content}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Status Pendaftaran Banner */}
      {registration && (
        <div className="bg-gradient-to-br from-white to-orange-50/50 rounded-2xl shadow-sm border border-orange-100 p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-gray-100">
            <div>
              <div className="flex items-center gap-3">
                <span className="text-sm font-semibold text-gray-500">No. Registrasi:</span>
                <span className="text-lg font-black text-primary font-mono">{registration.reg_number}</span>
              </div>
              <h2 className="text-xl font-bold text-gray-900 mt-1">
                Calon Siswa: {registration.child_name || 'Belum diisi'} ({registration.program})
              </h2>
            </div>
            <div>{getStatusBadge(registration.status)}</div>
          </div>

          {registration.admin_notes && (
            <div className="mt-4 p-4 rounded-xl bg-orange-100/70 border border-orange-200 text-sm text-orange-950">
              <span className="font-bold flex items-center gap-1.5 mb-1">
                <FaCircleExclamation /> Catatan dari Admin Sekolah:
              </span>
              <p>{registration.admin_notes}</p>
            </div>
          )}

          <div className="mt-5 flex flex-wrap gap-3">
            {registration.status === 'accepted' && (
              <Button
                onClick={handleDownloadKartu}
                className="bg-emerald-600 hover:bg-emerald-700 text-white text-sm flex items-center gap-2 rounded-xl shadow-sm"
              >
                <FaCircleCheck /> Cetak Kartu Peserta (PDF)
              </Button>
            )}
            <Button
              onClick={handleDownloadBuktiPDF}
              className="bg-primary hover:bg-orange-600 text-white text-sm flex items-center gap-2 rounded-xl"
            >
              <FaFilePdf /> Unduh Bukti Pendaftaran (PDF)
            </Button>
            <a
              href={`https://wa.me/6281298465771?text=Halo%20Admin%20Al-Fattah%2C%20saya%20sudah%20mengisi%20PPDB%20dengan%20No%20Reg%3A%20${registration.reg_number}%20atas%20nama%20${encodeURIComponent(registration.child_name || '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold px-4 py-2.5 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 transition-colors shadow-sm"
            >
              <FaWhatsapp /> Konfirmasi ke WA Admin
            </a>
          </div>
        </div>
      )}

      {/* 1. Progress Bar Kelengkapan Form & Berkas */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-orange-100 text-primary flex items-center justify-center text-sm font-bold">
              <FaListCheck />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-sm sm:text-base">Kelengkapan Berkas & Data Formulir</h3>
              <p className="text-xs text-gray-500">Persentase kelengkapan data sebelum ditinjau panitia</p>
            </div>
          </div>
          <span className={`text-xs font-extrabold px-3 py-1 rounded-full w-fit ${
            progressPercentage === 100 
              ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' 
              : 'bg-amber-100 text-amber-800 border border-amber-200'
          }`}>
            {progressPercentage}% Selesai
          </span>
        </div>

        {/* Bar */}
        <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden p-0.5">
          <div 
            className={`h-full rounded-full transition-all duration-700 ${
              progressPercentage === 100 
                ? 'bg-emerald-500' 
                : 'bg-gradient-to-r from-amber-500 via-orange-500 to-emerald-500'
            }`}
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>

        {/* Mini Badges Breakdown */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4 pt-4 border-t border-gray-100 text-xs">
          <div className="flex items-center justify-between p-2.5 rounded-xl bg-gray-50 border border-gray-100">
            <span className="text-gray-600 font-medium">🧒 Data Calon Siswa</span>
            <span className={`font-bold font-mono px-2 py-0.5 rounded-md ${
              childFieldsCount === 6 ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-200 text-gray-700'
            }`}>
              {childFieldsCount}/6 {childFieldsCount === 6 && '✓'}
            </span>
          </div>

          <div className="flex items-center justify-between p-2.5 rounded-xl bg-gray-50 border border-gray-100">
            <span className="text-gray-600 font-medium">👨‍👩‍👧 Data Orang Tua</span>
            <span className={`font-bold font-mono px-2 py-0.5 rounded-md ${
              parentFieldsCount === 6 ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-200 text-gray-700'
            }`}>
              {parentFieldsCount}/6 {parentFieldsCount === 6 && '✓'}
            </span>
          </div>

          <div className="flex items-center justify-between p-2.5 rounded-xl bg-gray-50 border border-gray-100">
            <span className="text-gray-600 font-medium">📁 Dokumen Berkas</span>
            <span className={`font-bold font-mono px-2 py-0.5 rounded-md ${
              docFieldsCount === 5 ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-800 font-bold'
            }`}>
              {docFieldsCount}/5 {docFieldsCount === 5 && '✓'}
            </span>
          </div>
        </div>

        {progressPercentage < 100 ? (
          <p className="text-[11px] text-amber-700 bg-amber-50/70 border border-amber-200/60 rounded-xl p-2.5 mt-3 flex items-center gap-1.5">
            <FaCircleExclamation className="flex-shrink-0" />
            Terdapat {totalRequired - totalFilled} data/dokumen yang masih kosong. Lengkapi tab formulir di bawah agar pendaftaran dapat segera disetujui.
          </p>
        ) : (
          <p className="text-[11px] text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-xl p-2.5 mt-3 flex items-center gap-1.5">
            <FaCircleCheck className="flex-shrink-0" />
            Luar biasa! Seluruh formulir dan 5 berkas persyaratan digital telah lengkap 100%.
          </p>
        )}
      </div>

      {/* 2. Riwayat Log / Status Timeline */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-6">
        <div 
          onClick={() => setShowLogTimeline(!showLogTimeline)}
          className="flex items-center justify-between cursor-pointer select-none"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-orange-100 text-primary flex items-center justify-center text-sm font-bold">
              <FaClockRotateLeft />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-sm sm:text-base">Riwayat & Log Status Pendaftaran</h3>
              <p className="text-xs text-gray-500">Kronologi tahapan pendaftaran calon peserta didik (Klik untuk melihat)</p>
            </div>
          </div>
          <button 
            type="button" 
            className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
          >
            {showLogTimeline ? <FaChevronUp /> : <FaChevronDown />}
          </button>
        </div>

        {/* Timeline Content */}
        {showLogTimeline && (
          <div className="mt-6 pt-5 border-t border-gray-100 relative pl-4 sm:pl-6 border-l-2 border-orange-200 ml-4 space-y-6">
            {/* Event 1: Akun Dibuat */}
            <div className="relative">
              <div className="absolute -left-[23px] sm:-left-[31px] top-0.5 w-4 h-4 rounded-full bg-emerald-500 ring-4 ring-emerald-100"></div>
              <div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <h4 className="text-xs sm:text-sm font-bold text-gray-900">1. Registrasi Akun Pendaftar</h4>
                  <span className="text-[11px] text-gray-400 font-mono">
                    {user?.created_at ? new Date(user.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : '-'}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Akun wali murid berhasil dibuat dengan email {user?.email || '-'}.
                </p>
              </div>
            </div>

            {/* Event 2: Pengisian Formulir */}
            <div className="relative">
              <div className={`absolute -left-[23px] sm:-left-[31px] top-0.5 w-4 h-4 rounded-full ${
                registration ? 'bg-emerald-500 ring-4 ring-emerald-100' : 'bg-gray-300 ring-4 ring-gray-100'
              }`}></div>
              <div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <h4 className="text-xs sm:text-sm font-bold text-gray-900">2. Penyimpanan Formulir Biodata</h4>
                  <span className="text-[11px] text-gray-400 font-mono">
                    {registration?.created_at ? new Date(registration.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : 'Menunggu Simpan'}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {registration ? `Data pendaftaran ${registration.child_name || 'calon siswa'} berhasil disimpan dengan No. Registrasi: ${registration.reg_number}` : 'Formulir belum disimpan. Silakan lengkapi formulir di bawah.'}
                </p>
              </div>
            </div>

            {/* Event 3: Peninjauan Dokumen */}
            <div className="relative">
              <div className={`absolute -left-[23px] sm:-left-[31px] top-0.5 w-4 h-4 rounded-full ${
                registration?.status === 'accepted' ? 'bg-emerald-500 ring-4 ring-emerald-100' :
                registration?.status === 'perbaikan' ? 'bg-rose-500 ring-4 ring-rose-100' :
                registration?.status === 'submitted' ? 'bg-amber-500 ring-4 ring-amber-100' :
                'bg-gray-300 ring-4 ring-gray-100'
              }`}></div>
              <div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <h4 className="text-xs sm:text-sm font-bold text-gray-900">3. Verifikasi Berkas Administrasi</h4>
                  <span className="text-[11px] text-gray-400 font-mono">
                    {registration?.updated_at ? new Date(registration.updated_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : '-'}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {registration?.status === 'accepted' && 'Dokumen dinyatakan LENGKAP dan VALID oleh tim verifikator panitia PPDB.'}
                  {registration?.status === 'perbaikan' && `Perlu Perbaikan Dokumen: "${registration?.admin_notes || 'Silakan cek kembali berkas yang kurang jelas'}"`}
                  {registration?.status === 'submitted' && 'Formulir dan berkas telah masuk dalam antrean verifikasi panitia.'}
                  {(!registration?.status || registration?.status === 'draft') && 'Menunggu pengisian lengkap dan pengajuan formulir.'}
                </p>
              </div>
            </div>

            {/* Event 4: Keputusan Akhir */}
            <div className="relative">
              <div className={`absolute -left-[23px] sm:-left-[31px] top-0.5 w-4 h-4 rounded-full ${
                registration?.status === 'accepted' ? 'bg-emerald-600 ring-4 ring-emerald-200' : 'bg-gray-300 ring-4 ring-gray-100'
              }`}></div>
              <div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <h4 className="text-xs sm:text-sm font-bold text-gray-900">4. Penerbitan Kartu & Hasil PPDB</h4>
                  <span className="text-[11px] text-gray-400 font-mono">
                    {registration?.status === 'accepted' ? 'Resmi Diterima' : 'Menunggu'}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {registration?.status === 'accepted' 
                    ? 'Selamat! Calon siswa telah resmi diterima. Anda dapat mengunduh Kartu Tanda Peserta (PDF) untuk daftar ulang.' 
                    : 'Hasil seleksi akhir akan diumumkan setelah seluruh berkas diverifikasi oleh pihak sekolah.'}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Notification Banner */}
      {message.text && (
        <div className={`p-4 rounded-xl text-sm mb-6 ${message.type === 'success' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-rose-50 text-rose-800 border border-rose-200'}`}>
          {message.text}
        </div>
      )}

      {/* Formulir Pendaftaran Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Lock Banner ketika sudah diterima */}
        {registration?.status === 'accepted' && (
          <div className="bg-emerald-50 border-b border-emerald-200 px-6 py-4 flex items-center gap-3">
            <FaCircleCheck className="text-emerald-600 text-lg flex-shrink-0" />
            <div>
              <p className="text-sm font-bold text-emerald-800">Data Pendaftaran Telah Dikunci</p>
              <p className="text-xs text-emerald-700 mt-0.5">Selamat! Pendaftaran anak Anda telah diterima. Data tidak dapat diubah lagi. Hubungi admin jika ada koreksi.</p>
            </div>
          </div>
        )}
        {/* Step Navigation Tabs */}
        <div className="border-b border-gray-200 bg-gray-50/70 flex overflow-x-auto text-sm font-semibold">
          {[
            { step: 1, label: '1. Program & Data Anak' },
            { step: 2, label: '2. Orang Tua / Wali' },
            { step: 3, label: '3. Riwayat Kesehatan' },
            { step: 4, label: '4. Upload Berkas' },
          ].map((item) => (
            <button
              key={item.step}
              onClick={() => setActiveStep(item.step)}
              className={`py-4 px-6 border-b-2 whitespace-nowrap transition-all flex items-center gap-2 ${
                activeStep === item.step
                  ? 'border-primary text-primary bg-white'
                  : 'border-transparent text-gray-500 hover:text-gray-800'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="p-6 sm:p-8">
          <fieldset disabled={isAccepted} className={isAccepted ? 'opacity-60 pointer-events-none select-none' : ''}>
          {/* STEP 1: DATA ANAK */}
          {activeStep === 1 && (
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-gray-900 border-b pb-3">Pilihan Program & Biodata Calon Siswa</h3>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Pilih Program Pendidikan *</label>
                <div className="grid sm:grid-cols-3 grid-cols-1 gap-3">
                  {[
                    { id: 'KB', label: 'KB (Kelompok Bermain)', desc: 'Usia 2–4 tahun' },
                    { id: 'TK', label: 'TK (Taman Kanak-Kanak)', desc: 'Usia 4–6 tahun' },
                    { id: 'Daycare', label: 'Daycare (Penitipan Anak)', desc: 'Usia 2–6 tahun' },
                  ].map((p) => (
                    <div
                      key={p.id}
                      onClick={() => setProgram(p.id)}
                      className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                        program === p.id ? 'border-primary bg-orange-50/50' : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <span className="font-bold block text-gray-900">{p.label}</span>
                      <span className="text-xs text-gray-500 mt-1 block">{p.desc}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid sm:grid-cols-2 grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Nama Lengkap Calon Siswa *</label>
                  <input
                    type="text"
                    required
                    value={childName}
                    onChange={(e) => setChildName(e.target.value)}
                    placeholder="Sesuai akta kelahiran"
                    className="w-full p-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Nama Panggilan</label>
                  <input
                    type="text"
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                    placeholder="Nama panggilan sehari-hari"
                    className="w-full p-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-3 grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Jenis Kelamin *</label>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="w-full p-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary focus:outline-none"
                  >
                    <option value="L">Laki-laki</option>
                    <option value="P">Perempuan</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Tempat Lahir *</label>
                  <input
                    type="text"
                    required
                    value={birthPlace}
                    onChange={(e) => setBirthPlace(e.target.value)}
                    placeholder="Contoh: Bekasi"
                    className="w-full p-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Tanggal Lahir *</label>
                  <input
                    type="date"
                    required
                    value={birthDate}
                    onChange={(e) => setBirthDate(e.target.value)}
                    className="w-full p-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-3 grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Anak Ke-</label>
                  <input
                    type="number"
                    min="1"
                    value={childOrder}
                    onChange={(e) => setChildOrder(e.target.value)}
                    className="w-full p-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Dari ... Bersaudara</label>
                  <input
                    type="number"
                    min="1"
                    value={totalSiblings}
                    onChange={(e) => setTotalSiblings(e.target.value)}
                    className="w-full p-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Golongan Darah</label>
                  <select
                    value={bloodType}
                    onChange={(e) => setBloodType(e.target.value)}
                    className="w-full p-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary focus:outline-none"
                  >
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="AB">AB</option>
                    <option value="O">O</option>
                    <option value="-">Tidak Tahu</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Alamat Domisili Anak *</label>
                <textarea
                  rows="3"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Jalan, No. Rumah, RT/RW, Perumahan/Desa"
                  className="w-full p-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary focus:outline-none"
                ></textarea>
              </div>

              <div className="flex justify-end pt-4">
                <Button onClick={() => setActiveStep(2)} className="bg-primary text-white">
                  Lanjut ke Data Orang Tua →
                </Button>
              </div>
            </div>
          )}

          {/* STEP 2: DATA ORANG TUA */}
          {activeStep === 2 && (
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-gray-900 border-b pb-3">Data Orang Tua / Wali</h3>

              <div className="grid sm:grid-cols-2 grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Nama Lengkap Ayah *</label>
                  <input
                    type="text"
                    required
                    value={fatherName}
                    onChange={(e) => setFatherName(e.target.value)}
                    placeholder="Nama lengkap ayah kandung"
                    className="w-full p-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Pekerjaan Ayah</label>
                  <input
                    type="text"
                    value={fatherJob}
                    onChange={(e) => setFatherJob(e.target.value)}
                    placeholder="Contoh: Karyawan Swasta"
                    className="w-full p-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Nama Lengkap Ibu *</label>
                  <input
                    type="text"
                    required
                    value={motherName}
                    onChange={(e) => setMotherName(e.target.value)}
                    placeholder="Nama lengkap ibu kandung"
                    className="w-full p-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Pekerjaan Ibu</label>
                  <input
                    type="text"
                    value={motherJob}
                    onChange={(e) => setMotherJob(e.target.value)}
                    placeholder="Contoh: Ibu Rumah Tangga / Karyawan"
                    className="w-full p-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">No. WhatsApp Aktif *</label>
                  <input
                    type="tel"
                    required
                    value={phoneWa}
                    onChange={(e) => setPhoneWa(e.target.value)}
                    placeholder="08xxxxxxxx"
                    className="w-full p-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="nama@email.com"
                    className="w-full p-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Alamat Orang Tua</label>
                <input
                  type="text"
                  value={parentAddress}
                  onChange={(e) => setParentAddress(e.target.value)}
                  placeholder="Kosongkan jika sama dengan alamat domisili anak"
                  className="w-full p-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Nama Wali (Jika selain orang tua kandung)</label>
                <input
                  type="text"
                  value={guardianName}
                  onChange={(e) => setGuardianName(e.target.value)}
                  placeholder="Nama wali anak"
                  className="w-full p-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary focus:outline-none"
                />
              </div>

              <div className="flex justify-between pt-4">
                <Button onClick={() => setActiveStep(1)} variant="outline">
                  ← Kembali ke Data Anak
                </Button>
                <Button onClick={() => setActiveStep(3)} className="bg-primary text-white">
                  Lanjut ke Riwayat Kesehatan →
                </Button>
              </div>
            </div>
          )}

          {/* STEP 3: RIWAYAT KESEHATAN */}
          {activeStep === 3 && (
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-gray-900 border-b pb-3">Riwayat Kesehatan & Kebutuhan Khusus</h3>
              <p className="text-sm text-gray-500">
                Informasi ini sangat penting bagi guru & pengasuh Al-Fattah untuk menjaga keamanan dan kenyamanan anak Anda.
              </p>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Riwayat Alergi, Penyakit yang Pernah Diderita, atau Catatan Khusus
                </label>
                <textarea
                  rows="4"
                  value={medicalHistory}
                  onChange={(e) => setMedicalHistory(e.target.value)}
                  placeholder="Contoh: Alergi makanan laut, asma saat dingin, atau catatan makanan pantangan..."
                  className="w-full p-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary focus:outline-none"
                ></textarea>
              </div>

              <div className="flex justify-between pt-4">
                <Button onClick={() => setActiveStep(2)} variant="outline">
                  ← Kembali ke Data Ortu
                </Button>
                <Button onClick={() => setActiveStep(4)} className="bg-primary text-white">
                  Lanjut ke Upload Berkas →
                </Button>
              </div>
            </div>
          )}

          {/* STEP 4: UPLOAD BERKAS */}
          {activeStep === 4 && (
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-gray-900 border-b pb-3">Unggah Dokumen Persyaratan (Supabase Storage)</h3>
              <p className="text-sm text-gray-500">
                Format file yang diperbolehkan: JPG, PNG, atau PDF (maks. 5 MB per file).
              </p>

              <div className="grid sm:grid-cols-2 grid-cols-1 gap-6">
                {/* 1. Pasfoto */}
                <div className="border border-dashed border-gray-300 rounded-xl p-4 bg-gray-50/50">
                  <span className="font-bold text-sm block mb-1">1. Pasfoto Anak (3x4)</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileUpload(e, 'pasfoto', setPhotoUrl)}
                    className="text-xs text-gray-600 w-full mb-2"
                  />
                  {uploadingDoc === 'pasfoto' && <span className="text-xs text-primary animate-pulse">Mengunggah...</span>}
                  {photoUrl && (
                    <div className="flex items-center gap-2 text-xs text-emerald-700 font-medium">
                      <FaCircleCheck /> Berkas terunggah: <a href={photoUrl} target="_blank" rel="noreferrer" className="underline">Lihat</a>
                    </div>
                  )}
                </div>

                {/* 2. Kartu Keluarga */}
                <div className="border border-dashed border-gray-300 rounded-xl p-4 bg-gray-50/50">
                  <span className="font-bold text-sm block mb-1">2. Kartu Keluarga (KK)</span>
                  <input
                    type="file"
                    accept="image/*,application/pdf"
                    onChange={(e) => handleFileUpload(e, 'kk', setFamilyCardUrl)}
                    className="text-xs text-gray-600 w-full mb-2"
                  />
                  {uploadingDoc === 'kk' && <span className="text-xs text-primary animate-pulse">Mengunggah...</span>}
                  {familyCardUrl && (
                    <div className="flex items-center gap-2 text-xs text-emerald-700 font-medium">
                      <FaCircleCheck /> Berkas terunggah: <a href={familyCardUrl} target="_blank" rel="noreferrer" className="underline">Lihat</a>
                    </div>
                  )}
                </div>

                {/* 3. KTP Ayah */}
                <div className="border border-dashed border-gray-300 rounded-xl p-4 bg-gray-50/50">
                  <span className="font-bold text-sm block mb-1">3. KTP Ayah</span>
                  <input
                    type="file"
                    accept="image/*,application/pdf"
                    onChange={(e) => handleFileUpload(e, 'ktp_ayah', setFatherIdUrl)}
                    className="text-xs text-gray-600 w-full mb-2"
                  />
                  {uploadingDoc === 'ktp_ayah' && <span className="text-xs text-primary animate-pulse">Mengunggah...</span>}
                  {fatherIdUrl && (
                    <div className="flex items-center gap-2 text-xs text-emerald-700 font-medium">
                      <FaCircleCheck /> Berkas terunggah: <a href={fatherIdUrl} target="_blank" rel="noreferrer" className="underline">Lihat</a>
                    </div>
                  )}
                </div>

                {/* 4. KTP Ibu */}
                <div className="border border-dashed border-gray-300 rounded-xl p-4 bg-gray-50/50">
                  <span className="font-bold text-sm block mb-1">4. KTP Ibu</span>
                  <input
                    type="file"
                    accept="image/*,application/pdf"
                    onChange={(e) => handleFileUpload(e, 'ktp_ibu', setMotherIdUrl)}
                    className="text-xs text-gray-600 w-full mb-2"
                  />
                  {uploadingDoc === 'ktp_ibu' && <span className="text-xs text-primary animate-pulse">Mengunggah...</span>}
                  {motherIdUrl && (
                    <div className="flex items-center gap-2 text-xs text-emerald-700 font-medium">
                      <FaCircleCheck /> Berkas terunggah: <a href={motherIdUrl} target="_blank" rel="noreferrer" className="underline">Lihat</a>
                    </div>
                  )}
                </div>

                {/* 5. Akta Kelahiran */}
                <div className="border border-dashed border-gray-300 rounded-xl p-4 bg-gray-50/50 sm:col-span-2">
                  <span className="font-bold text-sm block mb-1">5. Akta Kelahiran Anak</span>
                  <input
                    type="file"
                    accept="image/*,application/pdf"
                    onChange={(e) => handleFileUpload(e, 'akta', setBirthCertUrl)}
                    className="text-xs text-gray-600 w-full mb-2"
                  />
                  {uploadingDoc === 'akta' && <span className="text-xs text-primary animate-pulse">Mengunggah...</span>}
                  {birthCertUrl && (
                    <div className="flex items-center gap-2 text-xs text-emerald-700 font-medium">
                      <FaCircleCheck /> Berkas terunggah: <a href={birthCertUrl} target="_blank" rel="noreferrer" className="underline">Lihat</a>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row justify-between gap-3 pt-6 border-t">
                <Button onClick={() => setActiveStep(3)} variant="outline">
                  ← Kembali ke Riwayat Kesehatan
                </Button>
                <div className="flex gap-3">
                  <Button
                    onClick={() => handleSaveRegistration(false)}
                    disabled={saving}
                    variant="outline"
                  >
                    {saving ? 'Menyimpan...' : 'Simpan Draf'}
                  </Button>
                  <Button
                    onClick={() => handleSaveRegistration(true)}
                    disabled={saving}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold"
                  >
                    {saving ? 'Mengirim...' : 'Kirim Pendaftaran Final'}
                  </Button>
                </div>
              </div>
            </div>
          )}
          </fieldset>
        </div>
      </div>

      {/* Modal Konfirmasi Logout */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-gray-100 text-center animate-in fade-in zoom-in-95">
            <div className="w-14 h-14 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
              <FaRightFromBracket />
            </div>
            <h3 className="text-lg font-bold text-gray-900 font-jost">Konfirmasi Keluar</h3>
            <p className="text-xs sm:text-sm text-gray-600 mt-2 mb-6 leading-relaxed">
              Apakah Anda yakin ingin keluar dari portal PPDB Al-Fattah?
            </p>
            <div className="flex gap-3 justify-center">
              <Button
                variant="outline"
                onClick={() => setShowLogoutConfirm(false)}
                className="w-1/2 text-xs sm:text-sm rounded-xl"
              >
                Batal
              </Button>
              <Button
                onClick={handleLogout}
                className="w-1/2 bg-red-600 hover:bg-red-700 text-white font-bold text-xs sm:text-sm rounded-xl"
              >
                Ya, Keluar
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
