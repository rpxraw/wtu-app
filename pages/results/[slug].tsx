import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'

function avg(arr:any[],key:string){if(!arr.length)return 0; return Math.round((arr.reduce((s,r)=>s+Number(r[key]||0),0)/arr.length)*10)}
function pct(n:number){return Math.max(0,Math.min(100,n))}

export default function Results(){
 const router=useRouter(); const slug=String(router.query.slug||'')
 const [profile,setProfile]=useState<any>(null);
 const [responses,setResponses]=useState<any[]>([])
 const [loading, setLoading] = useState(true);
 const MIN_RISPOSTE = 5;


 const site=process.env.NEXT_PUBLIC_SITE_URL || (typeof window!=='undefined'?window.location.origin:'')
 useEffect(()=>{async function load(){if(!slug)return; const {data:p}=await supabase.from('profiles').select('*').eq('slug',slug).single(); setProfile(p); if(p){const {data:r}=await supabase.from('responses').select('*').eq('profile_id',p.id); setResponses(r||[]); setLoading(false)}} load()},[slug])
 if (loading) {
  return (
    <div style={{ textAlign: "center", marginTop: "50px", color: "white" }}>
      <h2>Caricamento...</h2>
    </div>
  );
}

if (responses.length < MIN_RISPOSTE) {
  return (
    <div style={{ textAlign: "center", marginTop: "50px", color: "white" }}>
      <h2>🔒 Risultati bloccati</h2>
      <p>Per proteggere l'anonimato servono almeno {MIN_RISPOSTE} risposte.</p>
      <p>{responses.length} / {MIN_RISPOSTE} risposte ricevute</p>
      <div style={{
  width: "100%",
  background: "#666354",
  height: "10px",
  borderRadius: "10px",
  marginTop: "10px"
}}>
  <div style={{
    width: `${(responses.length / MIN_RISPOSTE) * 100}%`,
    background: "#1efd17",
    height: "100%",
    borderRadius: "10px"
  }} />
</div>
      <p>Condividi il tuo link per sbloccare i risultati.</p>
    </div>
     
  );
  
}
 const trust=pct(avg(responses,'trust')), attr=pct(avg(responses,'attractive')), rel=pct(avg(responses,'reliable')), succ=pct(avg(responses,'success'))
 const over=responses.filter(r=>r.overrated==='sopravvalutato').length
 const overPct=responses.length?Math.round(over/responses.length*100):0
 const link=`${site}/u/${slug}`
 const text=encodeURIComponent(`Ho scoperto cosa pensano davvero di me 😳\nRispondi anonimamente anche tu:\n${link}`)
 return <main className="container"><section className="hero">
  <div><div className="logo">WTU</div><div className="tag">Risultati anonimi</div></div>
  <div className="card grid">
   <h1 className="resultBig">Solo il {trust}% si fida davvero di Te, {profile?.nickname||slug} 😉</h1>
   <p className="small">Risposte ricevute: {responses.length}. Per risultati credibili servono almeno 5 risposte.</p>
   {[['Fiducia',trust],['Attrazione',attr],['Affidabilità',rel],['Successo percepito',succ]].map(([label,value]:any)=><div key={label}><p>{label}: <b>{value}%</b></p><div className="bar"><span style={{width:value+'%'}} /></div></div>)}
   <p className="warning">Il {overPct}% pensa che tu sia sopravvalutato. Il resto pensa che tu sia sottovalutato.</p>
   <div className="linkbox">{link}</div>
   <a href={`https://wa.me/?text=${text}`}><button className="btn">Condividi su WhatsApp</button></a>
   <button className="btn secondary" onClick={()=>navigator.clipboard.writeText(link)}>Copia link</button>
  </div>
 </section></main>
}
