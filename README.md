# 🚀 Startup Khumb — Live Pitch Arena

Real-time audience voting and judge scoring platform built for **DST i-TBI × NITA Foundation** startup pitch events.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18 + Vite + Tailwind CSS |
| Backend | Node.js + Express 5 + Socket.IO 4 |
| Container | Docker + Nginx (multi-stage builds) |

---

## Project Structure

```
Startup-Khumb/
├── backend/          # Express + Socket.IO server
│   ├── server.js
│   ├── Dockerfile
│   └── package.json
├── frontend/         # Vite + React app
│   ├── src/
│   │   ├── components/
│   │   │   ├── audience/   # Audience portal screens
│   │   │   ├── judge/      # Judge login + scoring dashboard
│   │   │   └── shared/     # Common UI components
│   │   └── hooks/
│   │       ├── useEventSocket.js   # Audience real-time hook
│   │       └── useJudgeSocket.js   # Judge auth + scoring hook
│   ├── Dockerfile
│   ├── nginx.conf
│   └── package.json
└── docker-compose.yml
```

---

## Running Locally (without Docker)

```bash
# Terminal 1 — Backend
cd backend
npm install
node server.js          # → http://localhost:3001

# Terminal 2 — Frontend
cd frontend
npm install
npm run dev             # → http://localhost:5173
```

**Portals:**
- Audience: `http://localhost:5173`
- Judge:    `http://localhost:5173/judge`

---

## Running with Docker

```bash
docker compose up --build
```

- Audience: `http://localhost`
- Judge:    `http://localhost/judge`
- Backend:  `http://localhost:3001`

For a **different backend host** (e.g. a cloud VM), pass it as a build arg:

```bash
VITE_BACKEND_URL=https://api.yourdomain.com docker compose up --build
```

---

## Admin Controls

Once the backend is running, control the event from any terminal:

```bash
# Open / close audience voting
curl http://localhost:3001/api/admin/openPoll
curl http://localhost:3001/api/admin/closePoll

# Change the active startup (all fields optional)
curl "http://localhost:3001/api/admin/setStartup?id=startup_001&name=FinAI&category=FinTech&founderName=Ravi+Kumar&pitchOrder=1"

# Reset audience vote counts to zero
curl http://localhost:3001/api/admin/resetStats

# View all judge scores (private)
curl http://localhost:3001/api/admin/judgeScores
```

---

## Judge Credentials

| Name | Email | Password |
|---|---|---|
| Dr. Anil Mehta | anil@dsti-tbi.in | judge123 |
| Prof. Sunita Rao | sunita@nita.ac.in | judge456 |
| Mr. Vikram Bose | vikram@startup.in | judge789 |

---

## Real-Time Socket Events

| Event | Direction | Payload |
|---|---|---|
| `initialData` | Server → Client | `{ activeStartup, pollOpen, liveStats }` |
| `startupUpdate` | Server → Client | `activeStartup` object |
| `pollStateUpdate` | Server → Client | `boolean` |
| `statsUpdate` | Server → Client | `liveStats` object |
| `vote` | Client → Server | `{ likeIdea, likePresentation, wouldJoin }` |
| `judge:submit` | Client → Server | `{ startupId, judgeId, scores, remarks }` |
