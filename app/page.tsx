import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'
import Workspace from '@/components/workspace'

export default async function Page() { const session = await auth.api.getSession({ headers: await headers() }); if (!session?.user) redirect('/sign-in'); return <Workspace user={session.user} /> }
