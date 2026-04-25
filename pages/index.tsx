import Link from 'next/link'

export default function Home(){
 return <main className="container">
  <section className="hero">
   <div>
    <div className="logo">WTU ​​👁️‍🗨️​</div>
    <div className="tag">What They Really Think</div>
   </div>
   <div className="grid">
    <h1 className="title">Scopri cosa pensano davvero di te. ​🕵️‍♂️​</h1>
    <p className="subtitle">Anonimo. Diretto. Senza filtri. Crea il tuo link, condividilo e lascia che gli altri rispondano.</p>
    <Link href="/create"><button className="btn">Crea il tuo link 🚀</button></Link>
   </div>
   <div className="card steps">
    <div className="step">1. Crea un link personale</div>
    <div className="step">2. Mandalo agli amici</div>
    <div className="step">3. Ricevi risposte anonime</div>
    <div className="step">4. Guarda il risultato finale</div>
   </div>
   <p className="warning">Non tutti sono pronti a sapere la verità.</p>
  </section>
  <div className="footer">WTU è un esperimento sociale anonimo. Usa l'app con rispetto.</div>
 </main>
}
