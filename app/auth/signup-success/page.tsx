import Link from 'next/link'

export default function SignUpSuccessPage() {
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.checkmark}>✓</div>
        <h1 style={styles.title}>Check Your Email</h1>
        <p style={styles.message}>
          We've sent a confirmation link to your email. Click it to complete your signup.
        </p>
        <Link href="/auth/login" style={styles.button}>
          Back to Sign In
        </Link>
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
    padding: '40px',
    width: '100%',
    maxWidth: '400px',
    textAlign: 'center',
  },
  checkmark: {
    fontSize: '48px',
    color: '#34d399',
    marginBottom: '16px',
  },
  title: {
    fontSize: '24px',
    fontWeight: '800',
    color: '#e2e8f0',
    marginBottom: '12px',
  },
  message: {
    color: '#94a3b8',
    fontSize: '14px',
    marginBottom: '24px',
    lineHeight: '1.6',
  },
  button: {
    display: 'inline-block',
    padding: '12px 24px',
    borderRadius: '10px',
    background: 'linear-gradient(135deg, #38bdf8, #818cf8)',
    color: '#fff',
    fontWeight: '600',
    fontSize: '14px',
    textDecoration: 'none',
    cursor: 'pointer',
  },
}
