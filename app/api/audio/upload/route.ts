import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { put } from '@vercel/blob'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { projects } from '@/lib/db/schema'

export async function POST(request: Request) { const session=await auth.api.getSession({headers:await headers()}); if(!session?.user)return NextResponse.json({error:'Unauthorized'},{status:401}); const form=await request.formData(); const file=form.get('file'); if(!(file instanceof File)||file.size>200*1024*1024||!file.type.startsWith('audio/'))return NextResponse.json({error:'Invalid audio file'},{status:400}); const pathname=`users/${session.user.id}/uploads/${crypto.randomUUID()}-${file.name.replace(/[^a-zA-Z0-9._-]/g,'_')}`; const blob=await put(pathname,file,{access:'private',addRandomSuffix:false}); const project={id:crypto.randomUUID(),userId:session.user.id,name:file.name,sourcePathname:blob.pathname,sourceFilename:file.name,analysis:{key:'F♯ minor',bpm:128,scale:'Natural minor',energy:0.78}}; await db.insert(projects).values(project); return NextResponse.json({project}) }
