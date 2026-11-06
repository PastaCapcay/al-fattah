"use client"
import React, { useState, useEffect, useMemo } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'
import { Button } from '@/components/ui/button'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import { 
  FaUserGraduate, 
  FaMagnifyingGlass, 
  FaFilter, 
  FaDownload, 
  FaWhatsapp, 
  FaCircleCheck, 
  FaCircleExclamation, 
  FaClock, 
  FaRightFromBracket,
  FaFileLines,
  FaEye,
  FaXmark,
  FaPhone,
  FaBullhorn,
  FaChartPie,
  FaCalendarDays,
  FaTrashCan,
  FaPenToSquare,
  FaRotateRight,
  FaPlus,
  FaFilePdf,
  FaEnvelope
} from 'react-icons/fa6'

export default function AdminDashboard() {
  const router = useRouter()
  const [adminUser, setAdminUser] = useState(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('pendaftar') // 'pendaftar' | 'statistik' | 'pengumuman'

  // Data Pendaftar
  const [registrations, setRegistrations] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [programFilter, setProgramFilter] = useState('ALL')
  const [statusFilter, setStatusFilter] = useState('ALL')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

  // Modal Detail & Edit Pendaftar
  const [selectedStudent, setSelectedStudent] = useState(null)
  const [isEditMode, setIsEditMode] = useState(false)
  const [editFormData, setEditFormData] = useState({})
  const [modalStatus, setModalStatus] = useState('')
  const [modalNotes, setModalNotes] = useState('')
  const [autoOpenWa, setAutoOpenWa] = useState(true)
  const [updating, setUpdating] = useState(false)
  const [toastMessage, setToastMessage] = useState('')

  // Inline Document Preview State
  const [previewDoc, setPreviewDoc] = useState(null) // { url: string, label: string }

  // Data Pengumuman
  const [announcements, setAnnouncements] = useState([])
  const [annTitle, setAnnTitle] = useState('')
  const [annContent, setAnnContent] = useState('')
  const [savingAnn, setSavingAnn] = useState(false)

  // Dialog Konfirmasi Hapus & Logout
  const [deleteConfirm, setDeleteConfirm] = useState(null) // { type: 'registration' | 'announcement', id: string, name: string }
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)

  useEffect(() => {
    checkAdminAuth()
  }, [])

  const checkAdminAuth = async () => {
    try {
      setLoading(true)
      const { data: { session } } = await supabase.auth.getSession()

      if (!session) {
        router.push('/ppdb/login')
        return
      }

      setAdminUser(session.user)

      // Cek apakah user adalah admin
      const { data: prof } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .single()

      if (prof?.role === 'admin' || session.user.app_metadata?.role === 'admin') {
        setIsAdmin(true)
        loadAllRegistrations()
        loadAnnouncements()
      } else {
        setIsAdmin(false)
      }
    } catch (err) {
      console.error('Error verifying admin:', err)
      setIsAdmin(false)
    } finally {
      setLoading(false)
    }
  }

  const loadAllRegistrations = async () => {
    try {
      const { data, error } = await supabase
        .from('registrations')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setRegistrations(data || [])
    } catch (err) {
      console.error('Error fetching registrations:', err)
    }
  }

  const loadAnnouncements = async () => {
    try {
      const { data, error } = await supabase
        .from('announcements')
        .select('*')
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

  // Buka detail pendaftar
  const openStudentDetail = (student) => {
    setSelectedStudent(student)
    setIsEditMode(false)
    setModalStatus(student.status || 'submitted')
    setModalNotes(student.admin_notes || '')
    setEditFormData({ ...student })
    setToastMessage('')
  }

  // Template Pesan WhatsApp
  const getWhatsAppMessage = (student, status, notes) => {
    const childName = student.child_name || 'Putra/Putri Bapak/Ibu'
    let statusText = 'sedang dalam proses verifikasi berkas'
    if (status === 'accepted') {
      statusText = '🎉 DINYATAKAN DITERIMA RESMI di Al-Fattah'
    } else if (status === 'perbaikan') {
      statusText = '⚠️ MEMERLUKAN PERBAIKAN / KELENGKAPAN BERKAS'
    }

    let msg = `Assalamu'alaikum Warahmatullahi Wabarakatuh,\n\n`
    msg += `Yth. Orang Tua / Wali dari ananda *${childName}*,\n`
    msg += `Panitia PPDB TK, KB, dan Daycare Al-Fattah memberitahukan bahwa berkas pendaftaran dengan No. Registrasi *${student.reg_number || '-'}* saat ini:\n\n`
    msg += `👉 *Status:* ${statusText}\n\n`

    if (notes && notes.trim()) {
      msg += `📌 *Catatan Admin:* \n"${notes.trim()}"\n\n`
    }

    if (status === 'accepted') {
      msg += `Selamat atas diterimanya ananda di Al-Fattah! Silakan unduh *Kartu Peserta Resmi* melalui portal akun wali murid di https://tkalfattah.sch.id/ppdb/login untuk keperluan daftar ulang.\n\n`
    } else if (status === 'perbaikan') {
      msg += `Mohon segera masuk ke portal https://tkalfattah.sch.id/ppdb/login untuk melengkapi atau merevisi berkas yang diperlukan.\n\n`
    }

    msg += `Jika ada pertanyaan lebih lanjut, silakan balas pesan ini. Terima kasih.\n\n`
    msg += `*Panitia PPDB Al-Fattah*\n`
    msg += `Yayasan Wira Mahardhika Wicaksana`
    return msg
  }

  const getWhatsAppLink = (student, customStatus, customNotes) => {
    if (!student?.phone_wa) return '#'
    const rawPhone = student.phone_wa.replace(/\D/g, '')
    const phone = rawPhone.startsWith('62') ? rawPhone : (rawPhone.startsWith('0') ? '62' + rawPhone.slice(1) : '62' + rawPhone)
    const status = customStatus || student.status
    const notes = customNotes !== undefined ? customNotes : student.admin_notes
    const text = getWhatsAppMessage(student, status, notes)
    return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`
  }

  // Kirim WhatsApp Otomatis ke browser
  const triggerAutoWhatsApp = (student, status, notes) => {
    const waUrl = getWhatsAppLink(student, status, notes)
    if (waUrl && waUrl !== '#') {
      window.open(waUrl, '_blank')
    }
  }

  // Update Status & Catatan
  const handleUpdateStatus = async () => {
    if (!selectedStudent) return
    setUpdating(true)
    setToastMessage('')

    try {
      const payload = {
        status: modalStatus,
        admin_notes: modalNotes,
        updated_at: new Date().toISOString()
      }

      // Jika dalam mode edit form, simpan juga field yang diedit
      if (isEditMode) {
        Object.assign(payload, {
          child_name: editFormData.child_name,
          nickname: editFormData.nickname,
          gender: editFormData.gender,
          birth_place: editFormData.birth_place,
          birth_date: editFormData.birth_date || null,
          program: editFormData.program,
          religion: editFormData.religion,
          blood_type: editFormData.blood_type,
          address: editFormData.address,
          medical_history: editFormData.medical_history,
          father_name: editFormData.father_name,
          father_job: editFormData.father_job,
          mother_name: editFormData.mother_name,
          mother_job: editFormData.mother_job,
          phone_wa: editFormData.phone_wa,
          email: editFormData.email,
          parent_address: editFormData.parent_address,
          guardian_name: editFormData.guardian_name
        })
      }

      const { data, error } = await supabase
        .from('registrations')
        .update(payload)
        .eq('id', selectedStudent.id)
        .select()
        .single()

      if (error) throw error

      setToastMessage('Data dan status pendaftaran berhasil disimpan!')
      loadAllRegistrations()

      const updated = data || { ...selectedStudent, ...payload }
      setSelectedStudent(updated)
      setIsEditMode(false)

      // Notifikasi WA Otomatis jika status berubah ke accepted atau perbaikan
      if (autoOpenWa && (modalStatus === 'accepted' || modalStatus === 'perbaikan')) {
        triggerAutoWhatsApp(updated, modalStatus, modalNotes)
      }
    } catch (err) {
      console.error('Error updating status:', err)
      alert('Gagal mengupdate data: ' + err.message)
    } finally {
      setUpdating(false)
    }
  }

  // Eksekusi Hapus Data Pendaftar
  const executeDeleteRegistration = async (id) => {
    try {
      const { error } = await supabase
        .from('registrations')
        .delete()
        .eq('id', id)

      if (error) throw error

      setRegistrations(prev => prev.filter(r => r.id !== id))
      if (selectedStudent?.id === id) {
        setSelectedStudent(null)
      }
      setDeleteConfirm(null)
      alert('Data pendaftaran berhasil dihapus!')
    } catch (err) {
      console.error('Error deleting registration:', err)
      alert('Gagal menghapus: ' + err.message)
    }
  }

  // Tambah Pengumuman Baru
  const handleAddAnnouncement = async (e) => {
    e.preventDefault()
    if (!annTitle.trim() || !annContent.trim()) return

    setSavingAnn(true)
    try {
      const { error } = await supabase
        .from('announcements')
        .insert({
          title: annTitle.trim(),
          content: annContent.trim(),
          created_by: adminUser?.id || null,
          is_active: true,
          created_at: new Date().toISOString()
        })

      if (error) throw error

      setAnnTitle('')
      setAnnContent('')
      loadAnnouncements()
      alert('Pengumuman berhasil dipublikasikan ke portal wali murid!')
    } catch (err) {
      console.error('Error adding announcement:', err)
      alert('Gagal membuat pengumuman: ' + err.message)
    } finally {
      setSavingAnn(false)
    }
  }

  // Toggle Status Aktif Pengumuman
  const handleToggleAnnouncement = async (ann) => {
    try {
      const { error } = await supabase
        .from('announcements')
        .update({ is_active: !ann.is_active })
        .eq('id', ann.id)

      if (error) throw error
      setAnnouncements(prev => prev.map(item => item.id === ann.id ? { ...item, is_active: !ann.is_active } : item))
    } catch (err) {
      console.error('Error toggling announcement:', err)
    }
  }

  // Hapus Pengumuman
  const executeDeleteAnnouncement = async (id) => {
    try {
      const { error } = await supabase
        .from('announcements')
        .delete()
        .eq('id', id)

      if (error) throw error
      setAnnouncements(prev => prev.filter(a => a.id !== id))
      setDeleteConfirm(null)
    } catch (err) {
      console.error('Error deleting announcement:', err)
      alert('Gagal menghapus pengumuman: ' + err.message)
    }
  }

  // Filter Data Siswa
  const filteredRegistrations = useMemo(() => {
    return registrations.filter(item => {
      const q = searchQuery.toLowerCase()
      const matchesSearch = 
        (item.child_name || '').toLowerCase().includes(q) ||
        (item.father_name || '').toLowerCase().includes(q) ||
        (item.mother_name || '').toLowerCase().includes(q) ||
        (item.reg_number || '').toLowerCase().includes(q) ||
        (item.phone_wa || '').includes(q)

      const matchesProgram = programFilter === 'ALL' || item.program === programFilter
      const matchesStatus = statusFilter === 'ALL' || item.status === statusFilter

      let matchesDate = true
      if (startDate) {
        const itemDate = new Date(item.created_at).setHours(0, 0, 0, 0)
        const filterStart = new Date(startDate).setHours(0, 0, 0, 0)
        if (itemDate < filterStart) matchesDate = false
      }
      if (endDate) {
        const itemDate = new Date(item.created_at).setHours(23, 59, 59, 999)
        const filterEnd = new Date(endDate).setHours(23, 59, 59, 999)
        if (itemDate > filterEnd) matchesDate = false
      }

      return matchesSearch && matchesProgram && matchesStatus && matchesDate
    })
  }, [registrations, searchQuery, programFilter, statusFilter, startDate, endDate])

  // Data Statistik
  const stats = useMemo(() => {
    const total = registrations.length
    const submitted = registrations.filter(r => r.status === 'submitted').length
    const accepted = registrations.filter(r => r.status === 'accepted').length
    const perbaikan = registrations.filter(r => r.status === 'perbaikan').length

    const kbCount = registrations.filter(r => r.program === 'KB').length
    const tkCount = registrations.filter(r => r.program === 'TK').length
    const daycareCount = registrations.filter(r => r.program === 'Daycare').length

    // Kelompok per bulan (6 bulan terakhir)
    const monthMap = {}
    const now = new Date()
    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1)
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
      const label = d.toLocaleDateString('id-ID', { month: 'short', year: '2-digit' })
      monthMap[key] = { label, count: 0 }
    }

    registrations.forEach(r => {
      if (r.created_at) {
        const d = new Date(r.created_at)
        const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
        if (monthMap[key]) {
          monthMap[key].count += 1
        }
      }
    })

    const monthlyData = Object.values(monthMap)
    const maxMonthly = Math.max(...monthlyData.map(m => m.count), 1)

    return {
      total,
      submitted,
      accepted,
      perbaikan,
      kbCount,
      tkCount,
      daycareCount,
      monthlyData,
      maxMonthly
    }
  }, [registrations])

  // Export Data ke CSV
  const handleExportCSV = () => {
    if (filteredRegistrations.length === 0) {
      alert('Belum ada data pendaftar yang cocok untuk diekspor.')
      return
    }

    const headers = [
      'No Registrasi',
      'Program',
      'Status',
      'Nama Anak',
      'Nama Panggilan',
      'Jenis Kelamin',
      'Tempat Lahir',
      'Tanggal Lahir',
      'Agama',
      'Golongan Darah',
      'Nama Ayah',
      'Pekerjaan Ayah',
      'Nama Ibu',
      'Pekerjaan Ibu',
      'No WA',
      'Email',
      'Alamat',
      'Riwayat Medis',
      'Tanggal Daftar',
      'Catatan Admin'
    ]

    const rows = filteredRegistrations.map(r => [
      `"${r.reg_number || ''}"`,
      `"${r.program || ''}"`,
      `"${r.status || ''}"`,
      `"${r.child_name || ''}"`,
      `"${r.nickname || ''}"`,
      `"${r.gender === 'L' ? 'Laki-laki' : 'Perempuan'}"`,
      `"${r.birth_place || ''}"`,
      `"${r.birth_date || ''}"`,
      `"${r.religion || ''}"`,
      `"${r.blood_type || ''}"`,
      `"${r.father_name || ''}"`,
      `"${r.father_job || ''}"`,
      `"${r.mother_name || ''}"`,
      `"${r.mother_job || ''}"`,
      `"${r.phone_wa || ''}"`,
      `"${r.email || ''}"`,
      `"${(r.address || '').replace(/"/g, '""')}"`,
      `"${(r.medical_history || '').replace(/"/g, '""')}"`,
      `"${r.created_at ? new Date(r.created_at).toLocaleDateString('id-ID') : ''}"`,
      `"${(r.admin_notes || '').replace(/"/g, '""')}"`
    ])

    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n')
    const encodedUri = encodeURI(csvContent)
    const link = document.createElement('a')
    link.setAttribute('href', encodedUri)
    link.setAttribute('download', `Rekap_PPDB_AlFattah_${new Date().toISOString().split('T')[0]}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  // Cetak Rekap Keseluruhan Pendaftar ke PDF (Landscape A4)
  const handlePrintRekapPDF = () => {
    if (filteredRegistrations.length === 0) {
      alert('Belum ada data pendaftar yang cocok untuk dicetak.')
      return
    }

    const doc = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' })
    const primaryColor = [247, 148, 30] // Orange Al-Fattah

    // Kop Surat
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(14)
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2])
    doc.text('YAYASAN WIRA MAHARDHIKA WICAKSANA', 148.5, 12, { align: 'center' })
    
    doc.setFontSize(16)
    doc.setTextColor(30, 41, 59)
    doc.text('TK, KB, DAN DAYCARE AL-FATTAH', 148.5, 18, { align: 'center' })

    doc.setFont('helvetica', 'normal')
    doc.setFontSize(8.5)
    doc.setTextColor(100, 116, 139)
    doc.text('Jl. Pasir Randu RT. 010/004, Kadu, Kec. Curug, Kab. Tangerang, Banten 15810', 148.5, 23, { align: 'center' })
    doc.text('WhatsApp: 0812-9846-5771 | Email: tkalfattah01@gmail.com | Website: tkalfattah.sch.id', 148.5, 27, { align: 'center' })

    // Garis Kop
    doc.setDrawColor(primaryColor[0], primaryColor[1], primaryColor[2])
    doc.setLineWidth(0.8)
    doc.line(14, 30, 283, 30)
    doc.setDrawColor(150, 150, 150)
    doc.setLineWidth(0.3)
    doc.line(14, 31, 283, 31)

    // Judul Dokumen
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(12)
    doc.setTextColor(15, 23, 42)
    doc.text('REKAPITULASI DATA PENDAFTARAN PESERTA DIDIK BARU (PPDB)', 148.5, 38, { align: 'center' })
    doc.setFontSize(9)
    doc.setFont('helvetica', 'normal')
    doc.text(`Tahun Ajaran 2026/2027 • Tanggal Cetak: ${new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}`, 148.5, 43, { align: 'center' })

    // Info Ringkasan & Filter
    doc.setFontSize(8.5)
    doc.setTextColor(71, 85, 105)
    const progText = programFilter === 'ALL' ? 'Semua Program' : programFilter
    const statText = statusFilter === 'ALL' ? 'Semua Status' : statusFilter
    const acceptedCount = filteredRegistrations.filter(r => r.status === 'accepted').length
    const submittedCount = filteredRegistrations.filter(r => r.status === 'submitted').length
    const perbaikanCount = filteredRegistrations.filter(r => r.status === 'perbaikan').length

    doc.text(`Filter: Program [${progText}] | Status [${statText}]`, 14, 49)
    doc.text(`Total Pendaftar: ${filteredRegistrations.length} Siswa (Diterima: ${acceptedCount} | Menunggu: ${submittedCount} | Perbaikan: ${perbaikanCount})`, 283, 49, { align: 'right' })

    // Tabel Rekap
    const tableColumns = [
      { header: 'No', dataKey: 'no' },
      { header: 'No. Reg', dataKey: 'reg_number' },
      { header: 'Nama Calon Siswa', dataKey: 'child_name' },
      { header: 'L/P', dataKey: 'gender' },
      { header: 'Program', dataKey: 'program' },
      { header: 'Nama Orang Tua / Wali', dataKey: 'parent_name' },
      { header: 'No. WhatsApp', dataKey: 'phone_wa' },
      { header: 'Status PPDB', dataKey: 'status' },
      { header: 'Tgl Daftar', dataKey: 'created_at' }
    ]

    const tableRows = filteredRegistrations.map((r, index) => {
      let statusLabel = 'Menunggu'
      if (r.status === 'accepted') statusLabel = 'Diterima'
      else if (r.status === 'perbaikan') statusLabel = 'Perbaikan'

      return {
        no: index + 1,
        reg_number: r.reg_number || '-',
        child_name: r.child_name || '-',
        gender: r.gender === 'L' ? 'L' : 'P',
        program: r.program || '-',
        parent_name: r.father_name || r.mother_name || r.guardian_name || '-',
        phone_wa: r.phone_wa || '-',
        status: statusLabel,
        created_at: r.created_at ? new Date(r.created_at).toLocaleDateString('id-ID') : '-'
      }
    })

    autoTable(doc, {
      columns: tableColumns,
      body: tableRows,
      startY: 52,
      theme: 'grid',
      headStyles: {
        fillColor: primaryColor,
        textColor: [255, 255, 255],
        fontSize: 8.5,
        fontStyle: 'bold',
        halign: 'center'
      },
      styles: {
        fontSize: 8,
        cellPadding: 2,
        textColor: [30, 41, 59],
        overflow: 'linebreak'
      },
      columnStyles: {
        no: { halign: 'center', cellWidth: 10 },
        reg_number: { halign: 'center', cellWidth: 26, fontStyle: 'bold' },
        child_name: { cellWidth: 54 },
        gender: { halign: 'center', cellWidth: 12 },
        program: { halign: 'center', cellWidth: 22 },
        parent_name: { cellWidth: 48 },
        phone_wa: { halign: 'center', cellWidth: 32 },
        status: { halign: 'center', cellWidth: 26 },
        created_at: { halign: 'center', cellWidth: 26 }
      },
      margin: { left: 14, right: 14 }
    })

    // Bagian Tanda Tangan
    const finalY = (doc.lastAutoTable?.finalY || 52) + 10
    const pageHeight = doc.internal.pageSize.height

    let signY = finalY
    if (signY + 35 > pageHeight) {
      doc.addPage()
      signY = 20
    }

    doc.setFontSize(8.5)
    doc.setTextColor(30, 41, 59)
    doc.text(`Tangerang, ${new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}`, 240, signY, { align: 'center' })
    doc.text('Panitia Penerimaan Peserta Didik Baru', 240, signY + 5, { align: 'center' })
    doc.text('TK, KB, dan Daycare Al-Fattah', 240, signY + 10, { align: 'center' })

    doc.setFont('helvetica', 'bold')
    doc.text('( .................................................... )', 240, signY + 28, { align: 'center' })

    doc.save(`Rekap_PPDB_AlFattah_${new Date().toISOString().split('T')[0]}.pdf`)
  }

  // Cetak Formulir Biodata Lengkap Perorangan ke PDF (Portrait A4)
  const handlePrintStudentBiodata = (student) => {
    if (!student) return
    const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' })
    const primaryColor = [247, 148, 30]

    // Kop Surat
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(12)
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2])
    doc.text('YAYASAN WIRA MAHARDHIKA WICAKSANA', 105, 12, { align: 'center' })

    doc.setFontSize(14)
    doc.setTextColor(30, 41, 59)
    doc.text('TK, KB, DAN DAYCARE AL-FATTAH', 105, 18, { align: 'center' })

    doc.setFont('helvetica', 'normal')
    doc.setFontSize(8)
    doc.setTextColor(100, 116, 139)
    doc.text('Jl. Pasir Randu RT. 010/004, Kadu, Curug, Kab. Tangerang, Banten 15810', 105, 23, { align: 'center' })
    doc.text('WhatsApp: 0812-9846-5771 | Email: tkalfattah01@gmail.com', 105, 27, { align: 'center' })

    // Garis Kop
    doc.setDrawColor(primaryColor[0], primaryColor[1], primaryColor[2])
    doc.setLineWidth(0.8)
    doc.line(15, 30, 195, 30)
    doc.setDrawColor(150, 150, 150)
    doc.setLineWidth(0.2)
    doc.line(15, 31, 195, 31)

    // Judul Lembar
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(12)
    doc.setTextColor(15, 23, 42)
    doc.text('FORMULIR BIODATA PENDAFTARAN PESERTA DIDIK BARU', 105, 38, { align: 'center' })
    doc.setFontSize(9)
    doc.setFont('helvetica', 'normal')
    doc.text(`Tahun Ajaran 2026/2027 • Program: ${student.program || '-'}`, 105, 43, { align: 'center' })

    // Box No. Registrasi
    doc.setFillColor(254, 243, 199)
    doc.roundedRect(15, 48, 125, 12, 2, 2, 'F')
    doc.setTextColor(180, 83, 9)
    doc.setFontSize(8)
    doc.setFont('helvetica', 'bold')
    doc.text('NO. REGISTRASI:', 20, 53)
    doc.setFontSize(12)
    doc.setTextColor(247, 148, 30)
    doc.text(student.reg_number || '-', 20, 58)

    // Box Pasfoto di Kanan
    doc.setDrawColor(203, 213, 225)
    doc.rect(155, 46, 28, 36)
    doc.setFontSize(7.5)
    doc.setTextColor(148, 163, 184)
    doc.text('PASFOTO', 169, 62, { align: 'center' })
    doc.text('3 x 4', 169, 67, { align: 'center' })

    // Bagian A: Data Calon Siswa
    autoTable(doc, {
      startY: 64,
      head: [['A. DATA CALON PESERTA DIDIK', '']],
      body: [
        ['Nama Lengkap', `: ${student.child_name || '-'}`],
        ['Nama Panggilan', `: ${student.nickname || '-'}`],
        ['Jenis Kelamin', `: ${student.gender === 'L' ? 'Laki-laki (L)' : 'Perempuan (P)'}`],
        ['Tempat, Tanggal Lahir', `: ${student.birth_place || '-'}, ${student.birth_date ? new Date(student.birth_date).toLocaleDateString('id-ID') : '-'}`],
        ['Agama', `: ${student.religion || '-'}`],
        ['Anak Ke- / Jumlah Saudara', `: Anak ke-${student.child_order || '1'} dari ${student.total_siblings || '1'} bersaudara`],
        ['Golongan Darah', `: ${student.blood_type || '-'}`],
        ['Alamat Tempat Tinggal', `: ${student.address || '-'}`],
        ['Riwayat Penyakit / Alergi', `: ${student.medical_history || 'Tidak ada riwayat khusus'}`],
      ],
      theme: 'plain',
      styles: { fontSize: 8.5, cellPadding: 1.8, textColor: [30, 41, 59] },
      headStyles: { fontStyle: 'bold', textColor: primaryColor, fontSize: 9.5, cellPadding: { bottom: 2 } },
      columnStyles: { 0: { cellWidth: 50, fontStyle: 'bold' }, 1: { cellWidth: 100 } },
      margin: { left: 15, right: 45 }
    })

    // Bagian B: Data Orang Tua / Wali
    autoTable(doc, {
      startY: (doc.lastAutoTable?.finalY || 120) + 4,
      head: [['B. DATA ORANG TUA / WALI', '']],
      body: [
        ['Nama Ayah Kandung', `: ${student.father_name || '-'}`],
        ['Pekerjaan Ayah', `: ${student.father_job || '-'}`],
        ['Nama Ibu Kandung', `: ${student.mother_name || '-'}`],
        ['Pekerjaan Ibu', `: ${student.mother_job || '-'}`],
        ['Nomor WhatsApp Aktif', `: ${student.phone_wa || '-'}`],
        ['Alamat Email', `: ${student.email || '-'}`],
        ['Alamat Orang Tua', `: ${student.parent_address || student.address || '-'}`],
        ['Nama Wali (Jika Ada)', `: ${student.guardian_name || '-'}`],
      ],
      theme: 'plain',
      styles: { fontSize: 8.5, cellPadding: 1.8, textColor: [30, 41, 59] },
      headStyles: { fontStyle: 'bold', textColor: primaryColor, fontSize: 9.5, cellPadding: { bottom: 2 } },
      columnStyles: { 0: { cellWidth: 50, fontStyle: 'bold' }, 1: { cellWidth: 130 } },
      margin: { left: 15, right: 15 }
    })

    // Bagian C: Status Dokumen
    const docStatus = [
      ['Pasfoto Anak 3x4', student.photo_url ? '[✓] Ada (Digital)' : '[ ] Belum Ada'],
      ['Kartu Keluarga (KK)', student.family_card_url ? '[✓] Ada (Digital)' : '[ ] Belum Ada'],
      ['KTP Ayah & Ibu', (student.father_id_url || student.mother_id_url) ? '[✓] Ada (Digital)' : '[ ] Belum Ada'],
      ['Akta Kelahiran', student.birth_cert_url ? '[✓] Ada (Digital)' : '[ ] Belum Ada'],
    ]

    autoTable(doc, {
      startY: (doc.lastAutoTable?.finalY || 180) + 4,
      head: [['C. STATUS KELENGKAPAN BERKAS PERSYARATAN', '']],
      body: docStatus,
      theme: 'plain',
      styles: { fontSize: 8.5, cellPadding: 1.8, textColor: [30, 41, 59] },
      headStyles: { fontStyle: 'bold', textColor: primaryColor, fontSize: 9.5, cellPadding: { bottom: 2 } },
      columnStyles: { 0: { cellWidth: 50, fontStyle: 'bold' }, 1: { cellWidth: 130 } },
      margin: { left: 15, right: 15 }
    })

    // Bagian D: Catatan dan Tanda Tangan
    const bottomY = (doc.lastAutoTable?.finalY || 225) + 6
    doc.setFontSize(8.5)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(30, 41, 59)
    doc.text('D. KEPUTUSAN STATUS PENDAFTARAN:', 15, bottomY)
    doc.setFont('helvetica', 'normal')
    doc.text(`Status: ${student.status === 'accepted' ? 'DITERIMA RESMI' : student.status === 'perbaikan' ? 'PERLU PERBAIKAN' : 'MENUNGGU VERIFIKASI'}`, 15, bottomY + 5)
    doc.text(`Catatan: ${student.admin_notes || 'Tidak ada catatan tambahan.'}`, 15, bottomY + 10)

    // Tanda Tangan
    const signY = bottomY + 18
    doc.text('Orang Tua / Wali Murid', 45, signY, { align: 'center' })
    doc.text('( .................................................. )', 45, signY + 22, { align: 'center' })

    doc.text(`Tangerang, ${new Date().toLocaleDateString('id-ID')}`, 155, signY - 4, { align: 'center' })
    doc.text('Petugas Verifikator PPDB', 155, signY, { align: 'center' })
    doc.text('( .................................................. )', 155, signY + 22, { align: 'center' })

    doc.save(`Biodata_PPDB_${student.reg_number}_${(student.child_name || 'AlFattah').replace(/\s+/g, '_')}.pdf`)
  }

  // Cek apakah url adalah gambar
  const isImageUrl = (url) => {
    if (!url) return false
    return /\.(jpg|jpeg|png|webp|gif)($|\?)/i.test(url)
  }

  if (loading) {
    return (
      <div className="container max-w-4xl mx-auto py-24 text-center font-nunito">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-500 font-medium">Memeriksa hak akses admin...</p>
      </div>
    )
  }

  if (!isAdmin) {
    return (
      <div className="container max-w-lg mx-auto py-16 px-4 font-nunito">
        <div className="bg-white rounded-2xl border border-red-200 p-8 text-center shadow-lg">
          <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
            <FaCircleExclamation />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 font-jost">Akses Terbatas Admin</h2>
          <p className="text-gray-600 text-sm mt-2 mb-6">
            Akun Anda ({adminUser?.email}) tidak memiliki hak akses sebagai Administrator PPDB Al-Fattah.
          </p>
          <div className="space-y-3">
            <Link href="/ppdb/dashboard" className="block w-full py-3 bg-primary text-white rounded-xl font-bold text-sm">
              Buka Dashboard Orang Tua
            </Link>
            <Button onClick={handleLogout} variant="outline" className="w-full text-sm">
              Keluar & Login dengan Akun Lain
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 font-nunito pb-20">
      {/* Top Navbar */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-sm">
        <div className="container py-3.5 flex flex-wrap justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary text-white rounded-xl flex items-center justify-center font-bold text-lg shadow-sm">
              AF
            </div>
            <div>
              <h1 className="font-bold text-gray-900 leading-tight">Admin Portal PPDB</h1>
              <span className="text-xs text-gray-500">TK, KB, & Daycare Al-Fattah</span>
            </div>
          </div>

          {/* Tab Navigation Pill */}
          <div className="flex bg-gray-100 p-1 rounded-xl text-xs sm:text-sm font-semibold">
            <button
              onClick={() => setActiveTab('pendaftar')}
              className={`px-3.5 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                activeTab === 'pendaftar' ? 'bg-white text-primary shadow-sm font-bold' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <FaFileLines /> Data Pendaftar ({registrations.length})
            </button>
            <button
              onClick={() => setActiveTab('statistik')}
              className={`px-3.5 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                activeTab === 'statistik' ? 'bg-white text-primary shadow-sm font-bold' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <FaChartPie /> Statistik
            </button>
            <button
              onClick={() => setActiveTab('pengumuman')}
              className={`px-3.5 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                activeTab === 'pengumuman' ? 'bg-white text-primary shadow-sm font-bold' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <FaBullhorn /> Pengumuman ({announcements.length})
            </button>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden md:inline-block text-xs font-semibold px-2.5 py-1 bg-emerald-50 text-emerald-700 rounded-full border border-emerald-200">
              ● {adminUser?.email}
            </span>
            <Button
              onClick={() => setShowLogoutConfirm(true)}
              variant="outline"
              size="sm"
              className="text-xs text-red-600 border-red-200 hover:bg-red-50 flex items-center gap-1.5 rounded-xl font-bold"
            >
              <FaRightFromBracket /> Keluar
            </Button>
          </div>
        </div>
      </nav>

      <div className="container mt-6">
        {/* ================= TAB 1: DATA PENDAFTAR ================= */}
        {activeTab === 'pendaftar' && (
          <div>
            {/* KPI Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Total Pendaftar</span>
                <h3 className="text-3xl font-black text-gray-900 mt-1">{stats.total}</h3>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
                <span className="text-xs font-bold text-amber-500 uppercase tracking-wider">Menunggu Verifikasi</span>
                <h3 className="text-3xl font-black text-amber-600 mt-1">{stats.submitted}</h3>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
                <span className="text-xs font-bold text-rose-500 uppercase tracking-wider">Perlu Perbaikan</span>
                <h3 className="text-3xl font-black text-rose-600 mt-1">{stats.perbaikan}</h3>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
                <span className="text-xs font-bold text-emerald-500 uppercase tracking-wider">Diterima Resmi</span>
                <h3 className="text-3xl font-black text-emerald-600 mt-1">{stats.accepted}</h3>
              </div>
            </div>

            {/* Filter, Search & Date Range */}
            <div className="bg-white p-4 sm:p-5 rounded-2xl border border-gray-200 shadow-sm mb-6 space-y-4">
              <div className="flex flex-col lg:flex-row gap-3 justify-between items-stretch lg:items-center">
                {/* Search */}
                <div className="relative flex-1">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
                    <FaMagnifyingGlass />
                  </span>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Cari nama anak, nama orang tua, no registrasi, no WA..."
                    className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white"
                  />
                </div>

                {/* Filter Program & Status */}
                <div className="flex flex-wrap gap-2.5">
                  <select
                    value={programFilter}
                    onChange={(e) => setProgramFilter(e.target.value)}
                    className="px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm font-semibold text-gray-700 focus:outline-none"
                  >
                    <option value="ALL">Semua Program</option>
                    <option value="KB">Kelompok Bermain (KB)</option>
                    <option value="TK">Taman Kanak-Kanak (TK)</option>
                    <option value="Daycare">Daycare</option>
                  </select>

                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm font-semibold text-gray-700 focus:outline-none"
                  >
                    <option value="ALL">Semua Status</option>
                    <option value="submitted">Menunggu Verifikasi</option>
                    <option value="perbaikan">Perlu Perbaikan</option>
                    <option value="accepted">Diterima</option>
                  </select>

                  <Button
                    onClick={handleExportCSV}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm flex items-center gap-1.5 rounded-xl px-3.5 shadow-sm"
                  >
                    <FaDownload /> Ekspor CSV
                  </Button>

                  <Button
                    onClick={handlePrintRekapPDF}
                    className="bg-primary hover:bg-orange-600 text-white text-xs sm:text-sm flex items-center gap-1.5 rounded-xl px-3.5 shadow-sm"
                  >
                    <FaFilePdf /> Cetak Rekap (PDF)
                  </Button>
                </div>
              </div>

              {/* Filter Tanggal Pendaftaran */}
              <div className="pt-3 border-t border-gray-100 flex flex-wrap items-center gap-3 text-xs sm:text-sm text-gray-600">
                <span className="font-bold flex items-center gap-1.5 text-gray-700">
                  <FaCalendarDays className="text-primary" /> Filter Tanggal Daftar:
                </span>
                <div className="flex items-center gap-2">
                  <label className="text-xs text-gray-400">Dari:</label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="px-2.5 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-xs focus:ring-1 focus:ring-primary outline-none"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <label className="text-xs text-gray-400">Sampai:</label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="px-2.5 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-xs focus:ring-1 focus:ring-primary outline-none"
                  />
                </div>
                {(startDate || endDate) && (
                  <button
                    onClick={() => { setStartDate(''); setEndDate('') }}
                    className="text-xs text-primary underline hover:text-orange-700 ml-1"
                  >
                    Reset Tanggal
                  </button>
                )}
                <span className="ml-auto text-xs text-gray-400 font-medium">
                  Menampilkan {filteredRegistrations.length} dari {registrations.length} siswa
                </span>
              </div>
            </div>

            {/* Tabel Data Pendaftar */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-gray-600">
                  <thead className="bg-gray-50 border-b border-gray-200 text-xs font-bold text-gray-500 uppercase tracking-wider">
                    <tr>
                      <th className="py-3.5 px-5">No. Reg</th>
                      <th className="py-3.5 px-5">Nama Calon Siswa</th>
                      <th className="py-3.5 px-5">Program</th>
                      <th className="py-3.5 px-5">Orang Tua / Kontak</th>
                      <th className="py-3.5 px-5">Tgl Daftar</th>
                      <th className="py-3.5 px-5">Status</th>
                      <th className="py-3.5 px-5 text-center">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {filteredRegistrations.length === 0 ? (
                      <tr>
                        <td colSpan="7" className="py-12 text-center text-gray-400">
                          Tidak ada data pendaftaran yang sesuai dengan filter.
                        </td>
                      </tr>
                    ) : (
                      filteredRegistrations.map((student) => (
                        <tr key={student.id} className="hover:bg-slate-50/70 transition-colors">
                          <td className="py-3.5 px-5 font-mono font-bold text-primary text-xs">
                            {student.reg_number || '-'}
                          </td>
                          <td className="py-3.5 px-5 font-bold text-gray-900">
                            {student.child_name || 'Tanpa Nama'}
                            <span className="block text-xs font-normal text-gray-500">
                              {student.gender === 'L' ? 'Laki-laki' : 'Perempuan'} • {student.birth_place || '-'}
                            </span>
                          </td>
                          <td className="py-3.5 px-5">
                            <span className="px-2.5 py-1 bg-orange-50 text-primary font-bold text-xs rounded-md border border-orange-200">
                              {student.program}
                            </span>
                          </td>
                          <td className="py-3.5 px-5">
                            <div className="font-semibold text-gray-800 text-xs">
                              {student.father_name || student.mother_name || '-'}
                            </div>
                            <a
                              href={`https://wa.me/${(student.phone_wa || '').replace(/\D/g, '')}`}
                              target="_blank"
                              rel="noreferrer"
                              className="text-xs text-emerald-600 hover:underline flex items-center gap-1 mt-0.5"
                            >
                              <FaWhatsapp className="text-xs" /> {student.phone_wa || '-'}
                            </a>
                          </td>
                          <td className="py-3.5 px-5 text-xs text-gray-500 whitespace-nowrap">
                            {student.created_at ? new Date(student.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }) : '-'}
                          </td>
                          <td className="py-3.5 px-5 whitespace-nowrap">
                            {student.status === 'accepted' && (
                              <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-full">
                                ✓ Diterima
                              </span>
                            )}
                            {student.status === 'submitted' && (
                              <span className="px-2.5 py-1 bg-amber-100 text-amber-800 text-xs font-bold rounded-full">
                                ⏳ Menunggu
                              </span>
                            )}
                            {student.status === 'perbaikan' && (
                              <span className="px-2.5 py-1 bg-rose-100 text-rose-800 text-xs font-bold rounded-full">
                                ⚠️ Perlu Perbaikan
                              </span>
                            )}
                          </td>
                          <td className="py-3.5 px-5 text-center whitespace-nowrap">
                            <div className="flex items-center justify-center gap-2">
                              {/* Tombol Periksa / Edit */}
                              <Button
                                onClick={() => openStudentDetail(student)}
                                size="sm"
                                className="bg-primary hover:bg-orange-600 text-white text-xs px-3 py-1.5 rounded-xl font-bold flex items-center gap-1.5 shadow-sm"
                              >
                                <FaEye className="text-xs" /> Periksa
                              </Button>

                              {/* Tombol WA Langsung */}
                              <a
                                href={getWhatsAppLink(student)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-2.5 py-1.5 bg-emerald-50 text-emerald-700 hover:bg-emerald-600 hover:text-white border border-emerald-300 rounded-xl transition-all text-xs font-bold flex items-center gap-1 shadow-sm"
                                title="Chat WhatsApp Wali Murid"
                              >
                                <FaWhatsapp className="text-sm" /> WA
                              </a>

                              {/* Tombol Hapus - Jelas & Tegas */}
                              <button
                                onClick={() => setDeleteConfirm({ type: 'registration', id: student.id, name: student.child_name || student.reg_number })}
                                className="px-2.5 py-1.5 bg-rose-50 text-rose-700 hover:bg-rose-600 hover:text-white border border-rose-300 rounded-xl transition-all text-xs font-bold flex items-center gap-1 shadow-sm"
                                title="Hapus Data Pendaftaran"
                              >
                                <FaTrashCan className="text-xs" /> Hapus
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 2: STATISTIK ================= */}
        {activeTab === 'statistik' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
              <h2 className="text-lg font-bold text-gray-900 font-jost mb-1">Ringkasan Statistik Pendaftaran</h2>
              <p className="text-xs text-gray-500 mb-6">Distribusi data pendaftar calon siswa berdasarkan program, status berkas, dan grafik bulanan.</p>

              <div className="grid md:grid-cols-2 gap-8">
                {/* Distribusi per Program */}
                <div className="bg-slate-50 p-5 rounded-2xl border border-gray-100">
                  <h3 className="text-sm font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <FaUserGraduate className="text-primary" /> Pendaftar per Program
                  </h3>
                  <div className="space-y-3.5">
                    <div>
                      <div className="flex justify-between text-xs font-bold text-gray-700 mb-1">
                        <span>KB (Kelompok Bermain)</span>
                        <span>{stats.kbCount} anak ({stats.total > 0 ? Math.round((stats.kbCount / stats.total) * 100) : 0}%)</span>
                      </div>
                      <div className="w-full bg-gray-200 h-3 rounded-full overflow-hidden">
                        <div
                          className="bg-orange-500 h-full rounded-full transition-all duration-500"
                          style={{ width: `${stats.total > 0 ? (stats.kbCount / stats.total) * 100 : 0}%` }}
                        ></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-bold text-gray-700 mb-1">
                        <span>TK (Taman Kanak-Kanak)</span>
                        <span>{stats.tkCount} anak ({stats.total > 0 ? Math.round((stats.tkCount / stats.total) * 100) : 0}%)</span>
                      </div>
                      <div className="w-full bg-gray-200 h-3 rounded-full overflow-hidden">
                        <div
                          className="bg-emerald-500 h-full rounded-full transition-all duration-500"
                          style={{ width: `${stats.total > 0 ? (stats.tkCount / stats.total) * 100 : 0}%` }}
                        ></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-bold text-gray-700 mb-1">
                        <span>Daycare (Penitipan Anak)</span>
                        <span>{stats.daycareCount} anak ({stats.total > 0 ? Math.round((stats.daycareCount / stats.total) * 100) : 0}%)</span>
                      </div>
                      <div className="w-full bg-gray-200 h-3 rounded-full overflow-hidden">
                        <div
                          className="bg-blue-500 h-full rounded-full transition-all duration-500"
                          style={{ width: `${stats.total > 0 ? (stats.daycareCount / stats.total) * 100 : 0}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Distribusi per Status */}
                <div className="bg-slate-50 p-5 rounded-2xl border border-gray-100">
                  <h3 className="text-sm font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <FaChartPie className="text-primary" /> Status Berkas Siswa
                  </h3>
                  <div className="space-y-3.5">
                    <div>
                      <div className="flex justify-between text-xs font-bold text-gray-700 mb-1">
                        <span className="text-emerald-700">✓ Diterima Resmi</span>
                        <span>{stats.accepted} anak ({stats.total > 0 ? Math.round((stats.accepted / stats.total) * 100) : 0}%)</span>
                      </div>
                      <div className="w-full bg-gray-200 h-3 rounded-full overflow-hidden">
                        <div
                          className="bg-emerald-500 h-full rounded-full transition-all duration-500"
                          style={{ width: `${stats.total > 0 ? (stats.accepted / stats.total) * 100 : 0}%` }}
                        ></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-bold text-gray-700 mb-1">
                        <span className="text-amber-700">⏳ Menunggu Verifikasi</span>
                        <span>{stats.submitted} anak ({stats.total > 0 ? Math.round((stats.submitted / stats.total) * 100) : 0}%)</span>
                      </div>
                      <div className="w-full bg-gray-200 h-3 rounded-full overflow-hidden">
                        <div
                          className="bg-amber-500 h-full rounded-full transition-all duration-500"
                          style={{ width: `${stats.total > 0 ? (stats.submitted / stats.total) * 100 : 0}%` }}
                        ></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-bold text-gray-700 mb-1">
                        <span className="text-rose-700">⚠️ Perlu Perbaikan</span>
                        <span>{stats.perbaikan} anak ({stats.total > 0 ? Math.round((stats.perbaikan / stats.total) * 100) : 0}%)</span>
                      </div>
                      <div className="w-full bg-gray-200 h-3 rounded-full overflow-hidden">
                        <div
                          className="bg-rose-500 h-full rounded-full transition-all duration-500"
                          style={{ width: `${stats.total > 0 ? (stats.perbaikan / stats.total) * 100 : 0}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Grafik Vertikal per Bulan */}
              <div className="mt-8 bg-slate-50 p-6 rounded-2xl border border-gray-100">
                <h3 className="text-sm font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <FaCalendarDays className="text-primary" /> Tren Pendaftaran (6 Bulan Terakhir)
                </h3>
                <div className="flex items-end justify-between gap-4 h-48 pt-6 border-b border-gray-200">
                  {stats.monthlyData.map((m, idx) => {
                    const heightPercent = stats.maxMonthly > 0 ? Math.max((m.count / stats.maxMonthly) * 100, 6) : 6
                    return (
                      <div key={idx} className="flex-1 flex flex-col items-center h-full justify-end group">
                        <span className="text-[11px] font-bold text-gray-600 mb-1 group-hover:text-primary transition-colors">
                          {m.count}
                        </span>
                        <div
                          className="w-full max-w-[48px] bg-primary group-hover:bg-orange-600 rounded-t-lg transition-all duration-300 shadow-sm"
                          style={{ height: `${heightPercent}%` }}
                        ></div>
                        <span className="text-[11px] font-semibold text-gray-500 mt-2">
                          {m.label}
                        </span>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 3: PENGUMUMAN ================= */}
        {activeTab === 'pengumuman' && (
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Form Buat Pengumuman Baru */}
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm lg:col-span-1 h-fit">
              <h2 className="text-base font-bold text-gray-900 font-jost mb-1 flex items-center gap-2">
                <FaBullhorn className="text-primary" /> Buat Pengumuman Baru
              </h2>
              <p className="text-xs text-gray-500 mb-4">
                Pengumuman yang aktif akan langsung muncul di dashboard portal seluruh wali murid.
              </p>

              <form onSubmit={handleAddAnnouncement} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Judul Pengumuman *</label>
                  <input
                    type="text"
                    required
                    value={annTitle}
                    onChange={(e) => setAnnTitle(e.target.value)}
                    placeholder="Contoh: Jadwal Pengambilan Seragam"
                    className="w-full p-2.5 text-xs sm:text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Isi Pengumuman *</label>
                  <textarea
                    required
                    rows="5"
                    value={annContent}
                    onChange={(e) => setAnnContent(e.target.value)}
                    placeholder="Tuliskan isi pengumuman lengkap untuk orang tua calon siswa..."
                    className="w-full p-2.5 text-xs sm:text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary outline-none leading-relaxed"
                  ></textarea>
                </div>

                <Button
                  type="submit"
                  disabled={savingAnn}
                  className="w-full bg-primary hover:bg-orange-600 text-white font-bold text-sm py-2.5 rounded-xl shadow-sm"
                >
                  {savingAnn ? 'Menyimpan...' : '📢 Publikasikan Pengumuman'}
                </Button>
              </form>
            </div>

            {/* Daftar Pengumuman Sekolah */}
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm lg:col-span-2">
              <h2 className="text-base font-bold text-gray-900 font-jost mb-1">Daftar Pengumuman Sekolah</h2>
              <p className="text-xs text-gray-500 mb-4">Kelola status aktif/nonaktif dan arsip pengumuman PPDB.</p>

              {announcements.length === 0 ? (
                <div className="py-12 text-center text-gray-400 bg-gray-50 rounded-xl border border-dashed border-gray-200 text-sm">
                  Belum ada pengumuman yang dibuat. Silakan tambahkan melalui form di samping.
                </div>
              ) : (
                <div className="space-y-3">
                  {announcements.map((ann) => (
                    <div
                      key={ann.id}
                      className={`p-4 rounded-xl border transition-all ${
                        ann.is_active ? 'bg-orange-50/40 border-orange-200' : 'bg-gray-50 border-gray-200 opacity-70'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-bold text-gray-900 text-sm">{ann.title}</h3>
                            <span
                              className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                                ann.is_active ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-200 text-gray-600'
                              }`}
                            >
                              {ann.is_active ? 'Aktif (Tampil)' : 'Non-Aktif'}
                            </span>
                          </div>
                          <span className="text-[11px] text-gray-400">
                            {new Date(ann.created_at).toLocaleDateString('id-ID', { dateStyle: 'full' })}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleToggleAnnouncement(ann)}
                            className={`text-xs px-2.5 py-1 rounded-lg font-semibold border ${
                              ann.is_active
                                ? 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100'
                                : 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                            }`}
                          >
                            {ann.is_active ? 'Sembunyikan' : 'Aktifkan'}
                          </button>
                          <button
                            onClick={() => setDeleteConfirm({ type: 'announcement', id: ann.id, name: ann.title })}
                            className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg text-sm"
                            title="Hapus Pengumuman"
                          >
                            <FaTrashCan />
                          </button>
                        </div>
                      </div>
                      <p className="text-xs text-gray-700 mt-2 whitespace-pre-line leading-relaxed">{ann.content}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* ================= MODAL DETAIL & EDIT PENDAFTAR ================= */}
      {selectedStudent && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-gray-100 overflow-hidden">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center bg-gray-50">
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono font-bold bg-orange-100 text-primary px-2.5 py-1 rounded-lg">
                  {selectedStudent.reg_number}
                </span>
                <div>
                  <h3 className="text-base font-bold text-gray-900 font-jost">
                    {selectedStudent.child_name || 'Detail Berkas Pendaftar'}
                  </h3>
                  <span className="text-xs text-gray-500">Program: {selectedStudent.program}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsEditMode(!isEditMode)}
                  className={`text-xs px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 border transition-all ${
                    isEditMode 
                      ? 'bg-amber-500 text-white border-amber-600' 
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
                  }`}
                >
                  <FaPenToSquare className="text-xs" />
                  {isEditMode ? 'Batal Edit' : 'Edit Data'}
                </button>
                <button
                  onClick={() => setSelectedStudent(null)}
                  className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center text-gray-600"
                >
                  <FaXmark />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-6">
              {toastMessage && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm rounded-xl">
                  {toastMessage}
                </div>
              )}

              {/* Mode Edit vs Mode View */}
              {isEditMode ? (
                <div className="space-y-5 bg-amber-50/40 p-4 rounded-xl border border-amber-200">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-amber-800 uppercase tracking-wider">
                      ✏️ Edit Biodata Calon Siswa & Orang Tua
                    </span>
                    <span className="text-[11px] text-amber-600 italic">
                      Admin dapat mengubah data siswa kapan saja (termasuk yang sudah diterima).
                    </span>
                  </div>

                  {/* Biodata Anak Form */}
                  <div className="grid sm:grid-cols-2 gap-3 text-xs">
                    <div>
                      <label className="block font-bold text-gray-700 mb-1">Nama Lengkap Anak</label>
                      <input
                        type="text"
                        value={editFormData.child_name || ''}
                        onChange={(e) => setEditFormData({ ...editFormData, child_name: e.target.value })}
                        className="w-full p-2 border border-gray-300 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-gray-700 mb-1">Nama Panggilan</label>
                      <input
                        type="text"
                        value={editFormData.nickname || ''}
                        onChange={(e) => setEditFormData({ ...editFormData, nickname: e.target.value })}
                        className="w-full p-2 border border-gray-300 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-gray-700 mb-1">Program</label>
                      <select
                        value={editFormData.program || 'KB'}
                        onChange={(e) => setEditFormData({ ...editFormData, program: e.target.value })}
                        className="w-full p-2 border border-gray-300 rounded-lg"
                      >
                        <option value="KB">KB (Kelompok Bermain)</option>
                        <option value="TK">TK (Taman Kanak-Kanak)</option>
                        <option value="Daycare">Daycare</option>
                      </select>
                    </div>
                    <div>
                      <label className="block font-bold text-gray-700 mb-1">Jenis Kelamin</label>
                      <select
                        value={editFormData.gender || 'L'}
                        onChange={(e) => setEditFormData({ ...editFormData, gender: e.target.value })}
                        className="w-full p-2 border border-gray-300 rounded-lg"
                      >
                        <option value="L">Laki-laki</option>
                        <option value="P">Perempuan</option>
                      </select>
                    </div>
                    <div>
                      <label className="block font-bold text-gray-700 mb-1">Tempat Lahir</label>
                      <input
                        type="text"
                        value={editFormData.birth_place || ''}
                        onChange={(e) => setEditFormData({ ...editFormData, birth_place: e.target.value })}
                        className="w-full p-2 border border-gray-300 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-gray-700 mb-1">Tanggal Lahir</label>
                      <input
                        type="date"
                        value={editFormData.birth_date ? editFormData.birth_date.split('T')[0] : ''}
                        onChange={(e) => setEditFormData({ ...editFormData, birth_date: e.target.value })}
                        className="w-full p-2 border border-gray-300 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-gray-700 mb-1">Golongan Darah</label>
                      <input
                        type="text"
                        value={editFormData.blood_type || ''}
                        onChange={(e) => setEditFormData({ ...editFormData, blood_type: e.target.value })}
                        className="w-full p-2 border border-gray-300 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-gray-700 mb-1">Agama</label>
                      <input
                        type="text"
                        value={editFormData.religion || 'Islam'}
                        onChange={(e) => setEditFormData({ ...editFormData, religion: e.target.value })}
                        className="w-full p-2 border border-gray-300 rounded-lg"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block font-bold text-gray-700 mb-1">Alamat Lengkap</label>
                      <textarea
                        rows="2"
                        value={editFormData.address || ''}
                        onChange={(e) => setEditFormData({ ...editFormData, address: e.target.value })}
                        className="w-full p-2 border border-gray-300 rounded-lg"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block font-bold text-gray-700 mb-1">Riwayat Medis / Alergi</label>
                      <input
                        type="text"
                        value={editFormData.medical_history || ''}
                        onChange={(e) => setEditFormData({ ...editFormData, medical_history: e.target.value })}
                        className="w-full p-2 border border-gray-300 rounded-lg"
                      />
                    </div>
                  </div>

                  {/* Biodata Orang Tua Form */}
                  <div className="pt-3 border-t border-amber-200">
                    <span className="text-xs font-bold text-amber-800 uppercase tracking-wider block mb-2">
                      Data Kontak & Orang Tua
                    </span>
                    <div className="grid sm:grid-cols-2 gap-3 text-xs">
                      <div>
                        <label className="block font-bold text-gray-700 mb-1">Nama Ayah</label>
                        <input
                          type="text"
                          value={editFormData.father_name || ''}
                          onChange={(e) => setEditFormData({ ...editFormData, father_name: e.target.value })}
                          className="w-full p-2 border border-gray-300 rounded-lg"
                        />
                      </div>
                      <div>
                        <label className="block font-bold text-gray-700 mb-1">Pekerjaan Ayah</label>
                        <input
                          type="text"
                          value={editFormData.father_job || ''}
                          onChange={(e) => setEditFormData({ ...editFormData, father_job: e.target.value })}
                          className="w-full p-2 border border-gray-300 rounded-lg"
                        />
                      </div>
                      <div>
                        <label className="block font-bold text-gray-700 mb-1">Nama Ibu</label>
                        <input
                          type="text"
                          value={editFormData.mother_name || ''}
                          onChange={(e) => setEditFormData({ ...editFormData, mother_name: e.target.value })}
                          className="w-full p-2 border border-gray-300 rounded-lg"
                        />
                      </div>
                      <div>
                        <label className="block font-bold text-gray-700 mb-1">Pekerjaan Ibu</label>
                        <input
                          type="text"
                          value={editFormData.mother_job || ''}
                          onChange={(e) => setEditFormData({ ...editFormData, mother_job: e.target.value })}
                          className="w-full p-2 border border-gray-300 rounded-lg"
                        />
                      </div>
                      <div>
                        <label className="block font-bold text-gray-700 mb-1">Nomor WhatsApp Aktif</label>
                        <input
                          type="text"
                          value={editFormData.phone_wa || ''}
                          onChange={(e) => setEditFormData({ ...editFormData, phone_wa: e.target.value })}
                          className="w-full p-2 border border-gray-300 rounded-lg"
                        />
                      </div>
                      <div>
                        <label className="block font-bold text-gray-700 mb-1">Email</label>
                        <input
                          type="email"
                          value={editFormData.email || ''}
                          onChange={(e) => setEditFormData({ ...editFormData, email: e.target.value })}
                          className="w-full p-2 border border-gray-300 rounded-lg"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  {/* Biodata Calon Siswa View */}
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2.5">
                      Biodata Calon Siswa
                    </h4>
                    <div className="grid sm:grid-cols-2 gap-3 text-xs sm:text-sm bg-gray-50 p-4 rounded-xl border border-gray-100">
                      <div><strong>Nama Lengkap:</strong> {selectedStudent.child_name || '-'}</div>
                      <div><strong>Nama Panggilan:</strong> {selectedStudent.nickname || '-'}</div>
                      <div><strong>Jenis Kelamin:</strong> {selectedStudent.gender === 'L' ? 'Laki-laki' : 'Perempuan'}</div>
                      <div>
                        <strong>Tempat, Tgl Lahir:</strong> {selectedStudent.birth_place || '-'}, {selectedStudent.birth_date ? new Date(selectedStudent.birth_date).toLocaleDateString('id-ID') : '-'}
                      </div>
                      <div><strong>Agama:</strong> {selectedStudent.religion || 'Islam'}</div>
                      <div><strong>Golongan Darah:</strong> {selectedStudent.blood_type || '-'}</div>
                      <div className="sm:col-span-2"><strong>Alamat Domisili:</strong> {selectedStudent.address || '-'}</div>
                      <div className="sm:col-span-2"><strong>Riwayat Medis / Alergi:</strong> {selectedStudent.medical_history || 'Tidak ada'}</div>
                    </div>
                  </div>

                  {/* Data Orang Tua View */}
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2.5">
                      Data Orang Tua / Wali
                    </h4>
                    <div className="grid sm:grid-cols-2 gap-3 text-xs sm:text-sm bg-gray-50 p-4 rounded-xl border border-gray-100">
                      <div><strong>Ayah:</strong> {selectedStudent.father_name || '-'} ({selectedStudent.father_job || 'Tidak diisi'})</div>
                      <div><strong>Ibu:</strong> {selectedStudent.mother_name || '-'} ({selectedStudent.mother_job || 'Tidak diisi'})</div>
                      <div><strong>No. WhatsApp:</strong> {selectedStudent.phone_wa || '-'}</div>
                      <div><strong>Email:</strong> {selectedStudent.email || '-'}</div>
                    </div>
                  </div>
                </>
              )}

              {/* Dokumen Lampiran dengan Inline Preview */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2.5">
                  Dokumen Persyaratan (Klik untuk Preview Langsung)
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                  {[
                    { label: 'Pasfoto', url: selectedStudent.photo_url },
                    { label: 'Kartu Keluarga', url: selectedStudent.family_card_url },
                    { label: 'KTP Ayah', url: selectedStudent.father_id_url },
                    { label: 'KTP Ibu', url: selectedStudent.mother_id_url },
                    { label: 'Akta Kelahiran', url: selectedStudent.birth_cert_url },
                  ].map((doc, idx) => (
                    <div key={idx} className="border border-gray-200 rounded-xl p-3 text-center bg-gray-50/50 hover:border-primary/50 transition-all flex flex-col justify-between">
                      <span className="text-xs font-semibold block mb-2 text-gray-700">{doc.label}</span>
                      {doc.url ? (
                        <div className="space-y-1.5">
                          {isImageUrl(doc.url) && (
                            <div 
                              onClick={() => setPreviewDoc(doc)}
                              className="w-full h-16 rounded-lg overflow-hidden bg-gray-200 cursor-pointer mb-1 border"
                            >
                              <img src={doc.url} alt={doc.label} className="w-full h-full object-cover hover:scale-105 transition-transform" />
                            </div>
                          )}
                          <button
                            type="button"
                            onClick={() => setPreviewDoc(doc)}
                            className="w-full py-1 bg-primary text-white text-xs font-bold rounded-lg hover:bg-orange-600 transition-colors flex items-center justify-center gap-1"
                          >
                            <FaEye className="text-[10px]" /> Preview
                          </button>
                        </div>
                      ) : (
                        <span className="text-xs text-gray-400 italic py-2">Belum Unggah</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Verifikasi Admin & WhatsApp Automation */}
              <div className="pt-4 border-t border-gray-200 bg-slate-50 p-4 rounded-xl border">
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-700 mb-3 flex items-center gap-1.5">
                  <FaCircleCheck className="text-primary" /> Keputusan Status & Catatan Verifikasi:
                </h4>
                <div className="space-y-3 text-xs sm:text-sm">
                  <div>
                    <label className="block text-xs font-bold text-gray-600 mb-1">Status Pendaftaran:</label>
                    <select
                      value={modalStatus}
                      onChange={(e) => setModalStatus(e.target.value)}
                      className="w-full p-2.5 border border-gray-300 rounded-xl font-semibold focus:ring-2 focus:ring-primary focus:outline-none bg-white"
                    >
                      <option value="submitted">⏳ Menunggu Verifikasi (Pending)</option>
                      <option value="accepted">✓ DITERIMA Resmi di Al-Fattah</option>
                      <option value="perbaikan">⚠️ Perlu Perbaikan / Berkas Kurang</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-600 mb-1">
                      Catatan Admin (Bisa dibaca wali murid di portal & dikirim via WA):
                    </label>
                    <textarea
                      rows="2"
                      value={modalNotes}
                      onChange={(e) => setModalNotes(e.target.value)}
                      placeholder="Contoh: Berkas sudah lengkap dan disetujui. Silakan cetak kartu peserta pendaftaran."
                      className="w-full p-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:outline-none bg-white text-xs sm:text-sm"
                    ></textarea>
                  </div>

                  {/* Checkbox WA Otomatis */}
                  <label className="flex items-center gap-2 cursor-pointer pt-1 text-xs text-gray-700">
                    <input
                      type="checkbox"
                      checked={autoOpenWa}
                      onChange={(e) => setAutoOpenWa(e.target.checked)}
                      className="rounded text-primary focus:ring-primary"
                    />
                    <span className="font-semibold">
                      Otomatis buka WhatsApp ke wali murid saat status disimpan (Diterima / Perlu Perbaikan)
                    </span>
                  </label>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex flex-wrap justify-between items-center gap-3">
              <div className="flex flex-wrap items-center gap-2">
                {/* Tombol Chat WA Manual */}
                <a
                  href={getWhatsAppLink(selectedStudent, modalStatus, modalNotes)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold hover:bg-emerald-700 shadow-sm"
                >
                  <FaWhatsapp /> Chat WhatsApp
                </a>

                {/* Tombol Cetak Formulir Biodata PDF */}
                <button
                  type="button"
                  onClick={() => handlePrintStudentBiodata(selectedStudent)}
                  className="inline-flex items-center gap-1.5 px-3 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold shadow-sm transition-colors"
                >
                  <FaFilePdf /> Cetak Biodata (PDF)
                </button>

                {/* Tombol Kirim Email */}
                {selectedStudent.email && (
                  <a
                    href={`mailto:${selectedStudent.email}?subject=${encodeURIComponent(`Pengumuman PPDB Al-Fattah: ${selectedStudent.child_name}`)}&body=${encodeURIComponent(getWhatsAppMessage(selectedStudent, modalStatus, modalNotes))}`}
                    className="inline-flex items-center gap-1.5 px-3 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-700 shadow-sm"
                  >
                    <FaEnvelope /> Kirim Email
                  </a>
                )}

                {/* Tombol Hapus Pendaftar - Jelas & Tegas */}
                <button
                  type="button"
                  onClick={() => setDeleteConfirm({ type: 'registration', id: selectedStudent.id, name: selectedStudent.child_name || selectedStudent.reg_number })}
                  className="inline-flex items-center gap-1.5 px-3 py-2 bg-red-50 text-red-700 hover:bg-red-600 hover:text-white border border-red-300 rounded-xl text-xs font-bold transition-all shadow-sm"
                >
                  <FaTrashCan /> Hapus Pendaftar Ini
                </button>
              </div>

              <div className="flex items-center gap-2">
                <Button onClick={() => setSelectedStudent(null)} variant="outline" size="sm" className="text-xs">
                  Tutup
                </Button>
                <Button
                  onClick={handleUpdateStatus}
                  disabled={updating}
                  className="bg-primary hover:bg-orange-600 text-white text-xs sm:text-sm font-bold py-2 px-4 rounded-xl shadow-sm"
                >
                  {updating ? 'Menyimpan...' : 'Simpan Perubahan'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= MODAL INLINE PREVIEW DOKUMEN ================= */}
      {previewDoc && (
        <div className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5">
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
            <div className="px-5 py-3.5 border-b border-gray-200 flex justify-between items-center bg-gray-50">
              <span className="font-bold text-gray-800 text-sm flex items-center gap-2">
                <FaFileLines className="text-primary" /> Preview Berkas: {previewDoc.label}
              </span>
              <div className="flex items-center gap-3">
                <a
                  href={previewDoc.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs text-primary underline hover:text-orange-700 font-semibold"
                >
                  Buka Tab Baru
                </a>
                <button
                  onClick={() => setPreviewDoc(null)}
                  className="w-7 h-7 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center text-gray-600 text-sm"
                >
                  <FaXmark />
                </button>
              </div>
            </div>

            <div className="p-4 flex-1 overflow-auto flex items-center justify-center bg-gray-100">
              {isImageUrl(previewDoc.url) ? (
                <img
                  src={previewDoc.url}
                  alt={previewDoc.label}
                  className="max-h-[75vh] max-w-full object-contain rounded-lg shadow-sm"
                />
              ) : (
                <iframe
                  src={previewDoc.url}
                  title={previewDoc.label}
                  className="w-full h-[75vh] rounded-lg border bg-white"
                ></iframe>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ================= DIALOG KONFIRMASI HAPUS ================= */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-[70] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-gray-100 text-center">
            <div className="w-14 h-14 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
              <FaTrashCan />
            </div>
            <h3 className="text-lg font-bold text-gray-900 font-jost">Konfirmasi Hapus</h3>
            <p className="text-xs sm:text-sm text-gray-600 mt-2 mb-6 leading-relaxed">
              Apakah Anda yakin ingin menghapus {deleteConfirm.type === 'registration' ? 'data pendaftaran' : 'pengumuman'}{' '}
              <strong className="text-gray-900 font-bold">"{deleteConfirm.name}"</strong>? Data yang dihapus tidak dapat dikembalikan.
            </p>
            <div className="flex gap-3 justify-center">
              <Button
                variant="outline"
                onClick={() => setDeleteConfirm(null)}
                className="w-1/2 text-xs sm:text-sm rounded-xl"
              >
                Batal
              </Button>
              <Button
                onClick={() => {
                  if (deleteConfirm.type === 'registration') {
                    executeDeleteRegistration(deleteConfirm.id)
                  } else {
                    executeDeleteAnnouncement(deleteConfirm.id)
                  }
                }}
                className="w-1/2 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs sm:text-sm rounded-xl"
              >
                Ya, Hapus
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* ================= DIALOG KONFIRMASI LOGOUT ================= */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 z-[80] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-gray-100 text-center animate-in fade-in zoom-in-95">
            <div className="w-14 h-14 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
              <FaRightFromBracket />
            </div>
            <h3 className="text-lg font-bold text-gray-900 font-jost">Konfirmasi Keluar</h3>
            <p className="text-xs sm:text-sm text-gray-600 mt-2 mb-6 leading-relaxed">
              Apakah Anda yakin ingin keluar dari akun Admin PPDB Al-Fattah?
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
