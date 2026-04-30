import React, { useEffect, useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { createSlug, listSlugs, deleteSlug } from '../firebase'


export default function AdminPanel() {
  const { user, profile, signOut } = useAuth()
  const [title, setTitle] = useState('')
  const [custom, setCustom] = useState('')
  const [loading, setLoading] = useState(false)
  const [slugs, setSlugs] = useState([])
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)
  const [copiedId, setCopiedId] = useState(null)

  useEffect(() => {
    fetchSlugs()
  }, [])

  async function fetchSlugs() {
    try {
      const items = await listSlugs()
      setSlugs(items)
    } catch (err) {
      setError(err.message)
    }
  }

  async function handleCreate(e) {
    e.preventDefault()
    if (!title) return
    setLoading(true)
    try {
      // guard: compute slug and check for duplicates
      const slugCandidate = (custom && slugify(custom)) || slugify(title)
      const exists = slugs.find((s) => s.slug === slugCandidate)
      if (exists) {
        setError('Slug already exists — pick a different title or custom slug.')
        setLoading(false)
        return
      }
      const created = await createSlug({ title, customSlug: custom, createdBy: user?.uid })
      setTitle('')
      setCustom('')
      setSuccess(`Created ${created.slug}`)
      setTimeout(() => setSuccess(null), 3000)
      await fetchSlugs()
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  async function handleDelete(id) {
    if (!confirm('Delete this slug?')) return
    try {
      await deleteSlug(id)
      await fetchSlugs()
    } catch (err) {
      setError(err.message)
    }
  }

  function slugify(text) {
    return (text || '')
      .toString()
      .normalize('NFKD')
      .replace(/\s+/g, '-')
      .replace(/[^\w-]+/g, '')
      .replace(/--+/g, '-')
      .replace(/^-+/, '')
      .replace(/-+$/, '')
      .toLowerCase()
  }

  const previewSlug = (custom ? slugify(custom) : title ? slugify(title) : '')
  const previewExists = previewSlug && slugs.some((s) => s.slug === previewSlug)

  async function handleCopy(slug, id) {
    try {
      await navigator.clipboard.writeText(window.location.origin + '/' + slug)
      setCopiedId(id)
      setTimeout(() => setCopiedId(null), 2000)
    } catch (err) {
      setError('Copy failed', err.message)
    }
  }

  return (
    <h1>hello admin</h1>
    
  )
}