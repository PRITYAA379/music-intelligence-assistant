import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { auth } from '@/lib/auth'
import { getStripe, SONORA_PLAN } from '@/lib/stripe'
export async function POST(){const session=await auth.api.getSession({headers:await headers()});if(!session?.user)return NextResponse.json({error:'Unauthorized'},{status:401});const origin=new URL((await headers()).get('origin')??'http://localhost:3000');const checkout=await getStripe().checkout.sessions.create({mode:'subscription',line_items:[{price_data:{currency:'inr',product_data:{name:SONORA_PLAN.name,description:SONORA_PLAN.description},recurring:{interval:'month'},unit_amount:SONORA_PLAN.priceInCents},quantity:1}],customer_email:session.user.email,success_url:`${origin.origin}/?billing=success`,cancel_url:`${origin.origin}/?billing=cancelled`,metadata:{userId:session.user.id}});return NextResponse.json({url:checkout.url})}
