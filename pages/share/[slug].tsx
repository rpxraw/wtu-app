import { useRouter } from 'next/router'

export default function SharePage() {
  const router = useRouter()
  const { slug } = router.query

  const link = `https://wtu-app.vercel.app/u/${slug}`

  return (
    <div style={{ textAlign: 'center', marginTop: '50px', color: 'white' }}>
      <h2>🎉 Il tuo link è pronto!</h2>

      <p>Condividilo con i tuoi amici per ricevere risposte anonime 👇</p>

      <div style={{
        background: '#222',
        padding: '10px',
        borderRadius: '10px',
        margin: '20px auto',
        width: '80%',
        wordBreak: 'break-all'
      }}>
        {link}
      </div>

      <button onClick={() => {
        navigator.clipboard.writeText(link)
        alert("Link copiato!")
      }}>
        📋 Copia link
      </button>

      <br /><br />

      <a href={`https://wa.me/?text=Dimmi cosa pensi davvero di me 😳 ${link}`}>
        <button>📩 Condividi su WhatsApp</button>
      </a>
    </div>
  )
}