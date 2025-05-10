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