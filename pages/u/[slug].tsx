import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'

type Answers={trust:number;attractive:number;reliable:number;success:number;overrated:string}
const initial:Answers={trust:0,attractive:0,reliable:0,success:0,overrated:''}

function Scale({value,onChange}:{value:number,onChange:(n:number)=>void}){return <div className="scale">{[1,2,3,4,5,6,7,8,9,10].map(n=><button key={n} className={'pill '+(value===n?'active':'')} onClick={()=>onChange(n)}>{n}</button>)}</div>}

export default function Vote(){
 const router=useRouter(); const slug=String(router.query.slug||'')
 const [profile,setProfile]=useState<any>(null); const [a,setA]=useState<Answers>(initial); const [loading,setLoading]=useState(false); const [err,setErr]=useState('')
 useEffect(()=>{if(!slug)return; supabase.from('profiles').select('*').eq('slug',slug).single().then(({data})=>setProfile(data))},[slug])
 async function submit(){
  if(!profile)return
  if(!a.trust||!a.attractive||!a.reliable||!a.success||!a.overrated){setErr('Rispondi a tutte le domande.');return}
  setLoading(true); setErr('')
  const {error}=await supabase.from('responses').insert({profile_id:profile.id,...a})
  setLoading(false)
  if(error){setErr('Errore invio. Riprova.');return}
  router.push('/thanks?u='+slug)
 }
 return <main className="container"><section className="hero">
  <div><div className="logo">WTU ​​​👁️​</div><div className="tag">Rispondi anonimamente</div></div>
  <div className="card grid">
   <h1 className="title">Cosa pensi davvero di {profile?.nickname||slug}? ​🤭​🤫​🤣​​ ​​</h1>
   <p>Rispondi in modo sincero 😈</p>
   <div className="q"><h3>Quanto ti fideresti? 🤝 </h3><Scale value={a.trust} onChange={n=>setA({...a,trust:n})}/></div>
   <div className="q"><h3>Quanto è attraente? 😍💋🕺💃 </h3><Scale value={a.attractive} onChange={n=>setA({...a,attractive:n})}/></div>
   <div className="q"><h3>Quanto è affidabile? 🛡️💪 </h3><Scale value={a.reliable} onChange={n=>setA({...a,reliable:n})}/></div>
   <div className="q"><h3>Quanto credi avrà successo? 🏆🙌 </h3><Scale value={a.success} onChange={n=>setA({...a,success:n})}/></div>
   <div className="q"><h3>Secondo te è...</h3><div className="scale" style={{gridTemplateColumns:'1fr 1fr'}}><button className={'pill '+(a.overrated==='sottovalutato'?'active':'')} onClick={()=>setA({...a,overrated:'sottovalutato'})}>Sottovalutato 😞​ </button><button className={'pill '+(a.overrated==='sopravvalutato'?'active':'')} onClick={()=>setA({...a,overrated:'sopravvalutato'})}>Sopravvalutato ​😏​ </button></div></div>
   {err&&<p className="small">⚠️ {err}</p>}
   <button className="btn" onClick={submit} disabled={loading}>{loading?'Invio...':'Invia anonimamente'}</button>
  </div>
 </section></main>
}
