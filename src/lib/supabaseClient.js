import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://nsthzalzpwqfyicdorqf.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_qLjQKp3_62HMD6yRCUtceQ_ieBM-LTT'

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  }
})

// Helper untuk upload berkas ke Supabase Storage (Bucket: ppdb-documents)
export async function uploadPPDBFile(file, pathPrefix = 'documents') {
  if (!file) return null
  const fileExt = file.name.split('.').pop()
  const fileName = `${pathPrefix}_${Date.now()}_${Math.random().toString(36).substring(2, 8)}.${fileExt}`
  const filePath = `${fileName}`

  const { data, error } = await supabase.storage
    .from('ppdb-documents')
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: true
    })

  if (error) {
    console.error('Error uploading file:', error)
    throw error
  }

  const { data: publicUrlData } = supabase.storage
    .from('ppdb-documents')
    .getPublicUrl(filePath)

  return publicUrlData.publicUrl
}
