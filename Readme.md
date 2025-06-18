

##  Tech Stack

### Frontend
- React.js
- Tailwind CSS
- React Router DOM v6 (with `createBrowserRouter`)

### Backend
- Node.js
- Express.js
- MongoDB + Mongoose

---

## Features

- Create and display task boards
- Inside each board:
  - Add tasks with title, description, priority, and status
  - View all tasks
  - Update task status and priority with a click
- Clean UI with Tailwind CSS
- REST API with Express.js
- MongoDB for data persistence

---

##  Getting Started

###  Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd Backend

   npm install

   MONGO_URL=your_mongodb_connection_uri

   npm start

   ```


2. Naviagte to Front end directory:
```bash
cd ..
cd frontend 
npm i
npm run dev

```



### Folder structure

```markdown
Backend/
  └── models/
      └── Board.js
      └── Task.js
  └── routes/
      └── boardRoutes.js
      └── taskRoutes.js
  └── index.js
 Frontend/
  └── components/
      └── AllBoards.jsx
      └── CreateBoard.jsx
      └── BoardDetail.jsx
  └── App.jsx
  └── main.jsx
  └── AppRouter.jsx

  ```




