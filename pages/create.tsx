import { useState } from 'react'
import { useRouter } from 'next/router'
import { supabase } from '../lib/supabase'

function slugify(v:string){return v.toLowerCase().trim().replace(/[^a-z0-9àèéìòù]+/gi,'-').replace(/^-+|-+$/g,'').slice(0,28)}

export default function Create(){
 const [name,setName]=useState('')
 const [loading,setLoading]=useState(false)
 const [err,setErr]=useState('')
 const router=useRouter()
 async function create(){
  setErr('')
  const slug=slugify(name)
  if(!slug){setErr('Inserisci un nickname valido.');return}
  setLoading(true)
  const {error}=await supabase.from('profiles').insert({slug,nickname:name.trim()})
  setLoading(false)
  if(error){setErr('Nickname già usato o errore. Prova con un altro nome.');return}
  router.push('/u/'+slug)
 }
 return <main className="container">
  <section className="hero">
   <div><div className="logo">WTU</div><div className="tag">Crea il tuo link anonimo</div></div>
   <div className="card grid">
    <h1 className="title">Come vuoi apparire?</h1>
    <input className="input" placeholder="Es. Luigi" value={name} onChange={e=>setName(e.target.value)} />
    {err && <p className="small">⚠️ {err}</p>}
    <button className="btn" onClick={create} disabled={loading}>{loading?'Creo...':'Genera link'}</button>
    <p className="small">Non serve login. Nella versione MVP il link è pubblico e condivisibile.</p>
   </div>
  </section>
 </main>
}
