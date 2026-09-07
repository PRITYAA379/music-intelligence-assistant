'use client'
import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import { signIn } from '@/lib/auth-client'

export default function SignInPage() {
  const router = useRouter(); const [error, setError] = useState(''); const [busy, setBusy] = useState(false)
  async function submit(event: FormEvent<HTMLFormElement>) { event.preventDefault(); setBusy(true); setError(''); const form = new FormData(event.currentTarget); const result = await signIn.email({ email: String(form.get('email')), password: String(form.get('password')) }); setBusy(false); if (result.error) setError('Unable to sign in. Check your email and password.'); else { router.push('/'); router.refresh() } }
  return <main className="flex min-h-screen items-center justify-center bg-background px-6"><form onSubmit={submit} className="w-full max-w-sm space-y-5 rounded-2xl border border-border bg-card p-8"><div><p className="font-mono text-xs uppercase tracking-[0.25em] text-primary">SONORA</p><h1 className="mt-4 text-2xl font-semibold">Welcome back.</h1><p className="mt-2 text-sm text-muted-foreground">Sign in to your private music workspace.</p></div><label className="block text-sm">Email<input name="email" type="email" required className="mt-2 w-full rounded-lg border border-border bg-background px-3 py-2.5" /></label><label className="block text-sm">Password<input name="password" type="password" required minLength={8} className="mt-2 w-full rounded-lg border border-border bg-background px-3 py-2.5" /></label>{error && <p className="text-sm text-destructive">{error}</p>}<button disabled={busy} className="w-full rounded-lg bg-primary py-3 text-sm font-medium text-primary-foreground disabled:opacity-60">{busy ? 'Signing in…' : 'Sign in'}</button><a href="/sign-up" className="block text-center text-sm text-muted-foreground hover:text-foreground">Create an account</a></form></main>
}
