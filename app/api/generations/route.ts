import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { generations } from '@/lib/db/schema'
export async function POST(request:Request){const session=await auth.api.getSession({headers:await headers()});if(!session?.user)return NextResponse.json({error:'Unauthorized'},{status:401});const body=await request.json();if(typeof body.prompt!=='string'||body.prompt.trim().length<3||body.prompt.length>1000)return NextResponse.json({error:'Invalid prompt'},{status:400});const generation={id:crypto.randomUUID(),userId:session.user.id,prompt:body.prompt.trim(),category:typeof body.category==='string'?body.category:'Other',status:'queued'};await db.insert(generations).values(generation);return NextResponse.json({generation},{status:202})}
