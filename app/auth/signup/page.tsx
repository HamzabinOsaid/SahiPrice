'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function SignUpPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const supabase = createClient()
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo:
          process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL ??
          `${window.location.origin}/auth/callback`,
      },
    })

    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      router.push('/auth/signup-success')
    }
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>💸 SahiPrice</h1>
        <p style={styles.subtitle}>Create Account</p>

        <form onSubmit={handleSignUp} style={styles.form}>
          <div style={styles.field}>
            <label style={styles.label}>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              style={styles.input}
            />
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              style={styles.input}
            />
          </div>

          {error && <div style={styles.error}>{error}</div>}

          <button type="submit" disabled={loading} style={styles.button}>
            {loading ? 'Creating account...' : 'Sign Up'}
          </button>
        </form>

        <p style={styles.link}>
          Already have an account?{' '}
          <Link href="/auth/login" style={styles.linkText}>
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    background: '#080e1c',
    fontFamily: 'system-ui, -apple-system, sans-serif',
  },
  card: {
    background: '#111827',
    border: '1px solid #1e293b',
    borderRadius: '16px',
    padding: '32px',
    width: '100%',
    maxWidth: '400px',
  },
  title: {
    fontSize: '28px',
    fontWeight: '800',
    textAlign: 'center',
    color: '#e2e8f0',
    marginBottom: '6px',
  },
  subtitle: {
    textAlign: 'center',
    color: '#64748b',
    fontSize: '14px',
    marginBottom: '24px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  field: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  label: {
    fontSize: '12px',
    fontWeight: '600',
    color: '#94a3b8',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  input: {
    padding: '11px 14px',
    borderRadius: '10px',
    border: '1px solid #1e293b',
    background: '#0f172a',
    color: '#e2e8f0',
    fontSize: '14px',
    outline: 'none',
    transition: 'border-color 0.2s',
  },
  button: {
    marginTop: '8px',
    padding: '14px',
    border: 'none',
    borderRadius: '12px',
    background: 'linear-gradient(135deg, #38bdf8, #818cf8)',
    color: '#fff',
    fontWeight: '700',
    fontSize: '15px',
    cursor: 'pointer',
    transition: 'opacity 0.2s',
  },
  error: {
    color: '#f87171',
    fontSize: '13px',
    background: 'rgba(248, 113, 113, 0.1)',
    padding: '10px',
    borderRadius: '8px',
  },
  link: {
    textAlign: 'center',
    color: '#64748b',
    fontSize: '14px',
    marginTop: '16px',
  },
  linkText: {
    color: '#38bdf8',
    textDecoration: 'none',
    fontWeight: '600',
  },
}
