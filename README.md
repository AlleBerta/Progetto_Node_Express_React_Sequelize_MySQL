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

## Ho aggiunto anche la dipendenza di dotenv per gestire meglio le variabili segrete

### Database

Sempre dentro al server
npm install sequelize
npm install --save-dev sequelize-cli; strumento per CLI, aiuta ad inizializzare la struttura base (seqeulize init), generare modelli e migrazioni (sequelize model:generate) ed applicare migrazioni al DB (sequelize db:migrate).
!!!
Se non funzionano aggiungi davanti npx ad ogni comando
!!!
Il folder server/models/ serve per contenere tutte le varie tabelle. Chiami un nuovo file con il nome della tabella corrispondente e al suo interno crei la struttura della tabella
Vado in confi/config.json per modificare le variabli del db, attualmente modifico solo in "development"

---

## CURIOSITÀ: Essendo abituato a lavorare con xampp ero abituato ad attivare manualmente il server, con mysql server si attiva in automatico all'avvio del pc e rimane in background, in questo modo non mi serve loggarmi come root per "attivare" il server.

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

!!! Se noti nella console log della pagina una doppia risposta è dovuto a `StrictMode` presente in client/src/index.js, è un tool che simula il mounting due volte per aiutare a trovare il side-effect insediderati nei miei hook. In fase di dev posso ignorare questo motivo

> Un **hook** in react è una funzione speciale che mi permette di usare funzionalità di React all'interno dei componenti funzionali. Un esempio sono `useState`,`useEffect`.

# Course 4

## Client

npm install react-router-dom formik yup
!!! Switch in react-router-dom è deprecato, ora nella React V6 si usa routes
!!! vale anche per component
NO: `<Route path="/" exact component={Home}/>`
SI: `<Route path="/" exact element={<Home />}/>`
crei il folder client/src/pages/ per organizzare tutti i tuoi possibili routes

> Usa l'estensione "ES7 React..." per lo shortcut "rfce"

L'obbiettivo è quello di avere in App.js la struttura dei nostri routes

La libreria 'formik' permette di validare i dati facilmente in un form, viene utilizzata spesso insieme a 'yup' per gestire la form validation.

---

## !!! Ho creato un file server/constant.js in cui ci ho inserito i diversi status code che dovrò utilizzare, in questo modo quando faccio una chiamata ad una route restituisco lo status code opportuno attraverso la giusta costante

# Course 5

`useNavigate()` di `react-router-dom` è un hook di React Router v6 che mi permette di navigare tramite codice js

> navigate("/login", { replace: true }); // Sostituisce l’ultima entry nella history (utile per redirect dopo login)
> navigate(-1); // Torna indietro (come premere il pulsante "Back" del browser)

# Course 6

## Server/models

Come fare Associations tra due tabelle con Sequelize?

Creare la relazione attraverso associate:

- Uno a molti (0, N) / (1, N):
  - Nella tabella con PK: `A.hasMany(B)`
  - Nella tabella con FK: `B.belongsTo(A)`
- Uno a uno (1, 1):
  - Nella tabella con PK: `A.hasOne(B)`
  - Nella tabella con FK: `B.belongsTo(A)`
- Molti a molti (N, N):
  - Nella tabella con PK: `A.belongsToMany(B, {throught: 'AB'})`
  - Nella tabella con FK: `B.belongsTo(A, {throught: 'AB'})`

!!! Nota: Quando crei questa relazione tra due tabelle che hai già creato, puoi inserire in server/index `db.sequelize.sync({force/alter: true}).`:

- `{alter: true}` aggiorna lo schema di una tabella senza eliminare i dati, a volte non puoi gestire tutte le modifiche / aggiornare completamente tutto
- `{force: true}` Elimina tutto lo schema per poi ricrearlo, perdendo così tutti i tuoi dati

# Course 7

In client/.../Post.js mostra come mostrare a monitor un commento appena inserito insieme agli alti commenti mostrati, usando lo state `newComment`

# Course 8 - Registration and Login

## Server

npm install bcrypt; hash strings

Questo è lo standard di json che voglio restituire come risposta lato server:

```Javascript
{
  success: true/false,
  message: "messaggio"
}
```

In questo modo invio sempre una risposta uniforme, comoda per il client ed utile per eventuali debug.

!!! NOTA per axios: axios tratta qualsiasi status >=400 come errore, quindi va automaticamente nel bloco `catch`, quindi gestisci i successi nel `then` e gli errori nel `catch`

es in client/src/pages/Login.js

```Javascript
axios.post("/auth/login", data).then((response) => {
console.log(response.data.message)
})
.catch((error) => {
if (error.response) {
console.log("Errore dal server:", error.response.data.message);
} else {
console.log("Errore generico:", error.message);
}
})
```

!!!! **Promise**: viene restituita da `axios.post(..)`, `then()` e `catch()` sono metodi della promise

# Course 9 - JWT Auth

> In questo video salverà i dati nella sessione (vulnerabile ad xss), anche se è più sicuro salvarlo nei cookie (ha fatto un video a riguardo)

## server

npm install jsonwebtoken
in server/routes/Users.js ho tre campi di risposta:

- `success`: è un campo booleano utile per controlli rapidi lato client
- `message`: è un campo per comunicazioni all'utente o log
- `token`: è un campo esplicito e semantico, il client sa dove trovare i jwt

L'obbiettivo è quello di inserire il jwt nella session Storage presente nel dev tool in Application

In middlewares/AuthMiddleware.js la funzione validateToken servirà per convalidare il jwt, andrà poi inserita negli endpoint creati nelle api **prima** di eseguire le funzioni.

# Course 10 - AUTH in the Frontend

Nel middleware assegnato a req.user il payload in chiaro che ho cifrato nel jwt, in questo modo posso accedere a queste info ogni volta che faccio una chiamata ad una api che utilizzi nell'header jwt

Cosa succede quando salvo il jwt in questi storage?

- Session Storage: l'utente rimane autenticato solo fino alla chiusura della scheda (es: dashborard bancaria), **rischio di XSS attack**
- Local Storage: l'utente resta autenticato tra riavvii del browser, è condiviso tra schede/finestre dello stesso domino (es: social network), **rischio di XSS attack**

!!!! NOTA: ricorda che quando stai utilizzando un catch() va messo sempre in fondo

```Javascript
axios.get('/auth/verify', {
  headers: {
    accessToken: localStorage.getItem('accessToken')
  }
}).then((response) => {
    // invio file json sempre con success: true/false
    if (!response.data.success) setAuthState(false)
    else setAuthState(true)
}).catch((error) => {
    if (error.response) {
      setAuthState(false)
    } else {
      console.log("Errore generico:", error.message);
    }
  }
)
```

Se dovessi invertire il then() con il catch() potrebbe succedere che axios restituisce un errore (status con più di 400), non restituisce nulla e il then ha `respose === undefined`
