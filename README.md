# WTU - What They Really Think

MVP mobile-first per test virale anonimo.

## Setup rapido

1. Crea progetto su Supabase.
2. Vai su SQL Editor e incolla `supabase-schema.sql`.
3. Copia `.env.example` in `.env.local` e inserisci:
   - NEXT_PUBLIC_SUPABASE_URL
   - NEXT_PUBLIC_SUPABASE_ANON_KEY
   - NEXT_PUBLIC_SITE_URL
4. Installa e avvia:

```bash
npm install
npm run dev
```

## Deploy Vercel

- Importa repo/progetto su Vercel.
- Inserisci le 3 variabili ambiente.
- Deploy.

## Pagine

- `/` home
- `/create` crea nickname/link
- `/u/[slug]` pagina per rispondere
- `/results/[slug]` risultati
