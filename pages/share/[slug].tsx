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
        📋 Copia link ​​🌍​
      </button>

      <br /><br />

      <a
  href={`https://wa.me/?text=Dimmi cosa pensi davvero di me 😳 ${link}`}
  style={{ textDecoration: "none" }}
>
  <button
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "10px",
      background: "#25D366",
      color: "#fff",
      border: "none",
      borderRadius: "14px",
      padding: "14px 22px",
      fontSize: "16px",
      fontWeight: 700,
      cursor: "pointer",
      width: "80%",
      margin: "20px auto"
    }}
  >
    Condividi su WhatsApp
    <svg
      width="22"
      height="22"
      viewBox="0 0 32 32"
      fill="currentColor"
    >
      <path d="M16.01 3C8.83 3 3 8.82 3 15.99c0 2.29.6 4.53 1.74 6.5L3 29l6.68-1.7A12.9 12.9 0 0 0 16.01 29C23.18 29 29 23.18 29 15.99S23.18 3 16.01 3Zm0 23.8c-2.04 0-4.04-.53-5.8-1.54l-.42-.24-3.96 1.01 1.06-3.86-.27-.44a10.73 10.73 0 0 1-1.64-5.74c0-6.08 4.95-11.02 11.03-11.02 6.07 0 11.02 4.94 11.02 11.02 0 6.07-4.95 11.01-11.02 11.01Zm6.05-8.25c-.33-.17-1.96-.97-2.26-1.08-.3-.11-.52-.17-.74.17-.22.33-.85 1.08-1.04 1.3-.19.22-.38.25-.71.08-.33-.17-1.39-.51-2.65-1.63-.98-.87-1.64-1.95-1.83-2.28-.19-.33-.02-.51.14-.68.15-.15.33-.38.5-.57.17-.19.22-.33.33-.55.11-.22.06-.41-.03-.57-.08-.17-.74-1.78-1.01-2.44-.27-.64-.54-.55-.74-.56h-.63c-.22 0-.57.08-.87.41-.3.33-1.14 1.12-1.14 2.72s1.17 3.15 1.33 3.37c.17.22 2.3 3.51 5.57 4.92.78.34 1.39.54 1.86.69.78.25 1.49.21 2.05.13.63-.09 1.96-.8 2.24-1.57.28-.77.28-1.43.2-1.57-.08-.14-.3-.22-.63-.39Z" />
    </svg>
  </button>
</a>
    </div>
  )
}