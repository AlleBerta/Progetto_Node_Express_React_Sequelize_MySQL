# Full-Stack Web Dev Course 🚀

Questo repository contiene la mia implementazione del [corso gratuito su YouTube di PedroTech](https://www.youtube.com/playlist?list=PLpPqplz6dKxUaZ630TY1BFIo5nP-_x-nL), in cui si sviluppa una **web app full stack** completa.

## 🧠 Obiettivo del progetto

Creare una web-app in grado di:
- Registrare e autenticare utenti
- Permettere la creazione e visualizzazione di post
- Consentire agli utenti di commentare e mettere "like" ai post altrui

## 🛠️ Tecnologie utilizzate

### Backend
- Node.js
- Express.js
- RESTful API
- MySQL
- Sequelize (ORM)

### Frontend
- React.js

## 📂 Struttura del progetto
Full-Stack-Web-Dev-Course/
│
├── client/ # Frontend React
├── server/ # Backend Express + Sequelize + MySQL
│ ├── .env # Variabili d'ambiente (non tracciato)
│ └── ...
├── .gitignore # File ignorati da Git
├── README.md # Documentazione e appunti

> ⚠️ Questa sezione è in aggiornamento continuo man mano che proseguo il corso.

# Course 1
## Server
npn init -y
npm install express cors mysql2 nodemon 
---
Ho aggiunto anche la dipendenza di dotenv per gestire meglio le variabili segrete
---
### Database
Sempre dentro al server
npm install sequelize 
npm install --save-dev sequelize-cli; strumento per CLI, aiuta ad inizializzare la struttura base (seqeulize init), generare modelli e migrazioni (sequelize model:generate) ed applicare migrazioni al DB (sequelize db:migrate). 
!!! 
Se non funzionano aggiungi davanti npx ad ogni comando
!!!
Il folder server/models/ serve per contenere tutte le varie tabelle. Chiami un nuovo file con il nome della tabella corrispondente e al suo interno crei la struttura della tabella
Vado in confi/config.json per modificare le variabli del db, attualmente modifico solo in "development"

# Course 2
Middlewear in Express: è un afunzione che può ricevere req, res e next e può:
- Modificare la richiesta con `get`
- Modificare la risposta con `post`
- Bloccare o permettere il flusso verso il prossimo middlewear con `next`

Decidiamo di inviare e ricevere i dati all'interno del nostro progetto solo con oggetti json

Perché usiamo `async`/`await` nellle funzioni per dialogare con il db?
Le operaizioni con il db sono asincrone, non restituiscono un risultato perché ci vuole tempo per:
- Connettersi al db
- Inviare query
- Attendere una risposta

**Node.js è single-threaded** e non blocca mai il fflusso, quindi invece di attendere la risposta esegue altro
`async` restituisce una **funzione promessa** (`Promise`) e `await` aspetta che una `Promise` venga risolta o rifiutata, prima di continuare l'esecuzione. Se non si inserisce `await` non ricavi i dati.
> esempio: Immagina che `Posts.findAll()` sia come ordinare un caffè:
> Senza `await`, esci dal bar con lo scontrino (la `Promise`), ma senza il caffè.
> Con `await`, aspetti al bancone finché ti danno il caffè, e poi lo porti via

# Course 3
## Server
npn i cors
## Client
npm create-react-app .
npm istall axios
npm start; per lanciare il frontend

Rimozione file creati automaticamente:
- App.tes.js
- index.css
- logo.csv
- setupTests.js
- Tutto il css in src/app.css tranne la prima classe
- Tutto il return in App.js (è il nostro entrypoint), compreso gli import dei file eliminati

Ho aggiunto "proxy" nel package.json così da non dover scrivere sempre l'intero url quando faccio chiamare con axios

!!! Se noti nella console log della pagina una doppia risposta è dovuto a `StrictMode` presente in client/src/index.js, è un tool che simula il mounting due volte per aiutare a trovare il side-effect insediderati nei miei hook.  In fase di dev posso ignorare questo motivo

> Un **hook** in react è una funzione speciale che mi permette di usare funzionalità di React all'interno dei componenti funzionali. Un esempio sono `useState`,`useEffect`.

Min 16:57. Vai a copiare dalla sua repo il css