
---

## 📝 **README.md**

````markdown
# 🌴 FFB Fleet Management

**FFB Fleet Management** is a web application to manage FFB (Fresh Fruit Bunch) transportation fleets and trip scheduling.  
Built with **React + Redux Toolkit** for the frontend, **Node.js + Express** for the backend, and **SQLite** for storage.  
Includes Docker support for easy backend deployment.

---

## 🚀 Features

- **Trip Planning & Scheduling**  
  Add new trips by selecting vehicles, drivers, and mills.

- **Update Trip Status**  
  Mark trips as `completed` directly from the UI.

- **Pagination & Filters**  
  Filter trips by status (`all`, `scheduled`, `completed`, `pending`) and navigate through pages.

- **Redux Toolkit State Management**  
  All data (vehicles, drivers, mills, trips) is stored in Redux slices.

- **Testing**  
  Jest + React Testing Library with performance tests for 1000+ trips.

- **Docker Support**  
  Backend runs inside a Node 20-alpine container with SQLite.

---

## 🛠️ Tech Stack

- **Frontend**: React, Redux Toolkit, TailwindCSS  
- **Backend**: Node.js (Express), SQLite (better-sqlite3)  
- **Testing**: Jest, React Testing Library  
- **Container**: Docker (Node 20-alpine)  

---

## 📦 Installation & Running Locally

### 1. Clone the Repository
```bash
git clone https://github.com/username/ffb-fleet-management.git
cd ffb-fleet-management
````

### 2. Run the Frontend

```bash
cd src
npm install
npm start
```

Frontend runs on: `http://localhost:3000`

### 3. Run the Backend

```bash
cd backend
npm install
npm start
```

Backend runs on: `http://localhost:4000`

---

## 🐳 Running the Backend with Docker

### Build the Image

```bash
cd backend
docker build -t ffb-backend .
```

### Run the Container

If port 4000 is free:

```bash
docker run -p 4000:4000 ffb-backend
```

If port 4000 is already taken:

```bash
docker run -p 4001:4000 ffb-backend
```

Then update your frontend `.env` variable `REACT_APP_API_URL=http://localhost:4001`.

---

## 🧪 Testing

Run all frontend tests with coverage:

```bash
npm test -- --coverage
```

Coverage results will appear in the terminal.

---

## 📂 Project Structure

```
ffb-fleet-management/
├── backend/           # Node.js + Express + SQLite backend
│   ├── Dockerfile
│   ├── server.js
│   └── ...
├── src/               # React + Redux Toolkit frontend
│   ├── features/      # Redux slices
│   ├── pages/         # React pages
│   ├── types/         # TypeScript types
│   └── ...
└── README.md
```

---

## 📝 Notes

* Use **Node 20+** for compatibility with `better-sqlite3`.
* Make sure the backend is running before starting the frontend for live data.
* All tests use a mocked Axios instance to avoid real network calls.

---

## ✨ Future Improvements

* Authentication & user roles.
* Upload/download documents for fleet management.
* Real-time dashboard & notifications.

---

Made with ❤️ by \Matius Celcius Sinaga

```

---

