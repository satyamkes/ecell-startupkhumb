const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Live Voting Server Running 🚀');
});

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});


const JUDGES = [
  { id: 'j1', name: 'Dr. Anil Mehta', email: 'anil@dsti-tbi.in', password: 'judge123', designation: 'Venture Capitalist', avatar: 'A' },
  { id: 'j2', name: 'Prof. Sunita Rao', email: 'sunita@nita.ac.in', password: 'judge456', designation: 'Academic Mentor', avatar: 'S' },
  { id: 'j3', name: 'Mr. Vikram Bose', email: 'vikram@startup.in', password: 'judge789', designation: 'Serial Entrepreneur', avatar: 'V' },
];

const state = {
  activeStartup: {
    id: 'startup_003',
    name: 'EcoGrid Technologies',
    tagline: "Powering Tomorrow's Cities",
    category: 'CleanTech',
    founderName: 'Priya Sharma',
    pitchOrder: 3,
    totalPitches: 8,
  },
  pollOpen: false,
  liveStats: {
    totalVoters: 0,
    likeIdea: 0,
    likePresentation: 0,
    wouldJoin: 0,
    satisfactionScore: 0,
  },

  judgeScores: {},
};



app.get('/api/admin/openPoll', (req, res) => {
  state.pollOpen = true;
  io.emit('pollStateUpdate', state.pollOpen);
  res.json({ message: 'Poll opened', pollOpen: state.pollOpen });
});

app.get('/api/admin/closePoll', (req, res) => {
  state.pollOpen = false;
  io.emit('pollStateUpdate', state.pollOpen);
  res.json({ message: 'Poll closed', pollOpen: state.pollOpen });
});

app.get('/api/admin/resetStats', (req, res) => {
  state.liveStats = {
    totalVoters: 0,
    likeIdea: 0,
    likePresentation: 0,
    wouldJoin: 0,
    satisfactionScore: 0,
  };
  io.emit('statsUpdate', state.liveStats);
  res.json({ message: 'Stats reset', liveStats: state.liveStats });
});

app.get('/api/admin/setStartup', (req, res) => {
  const { id, name, tagline, founderName, category, pitchOrder } = req.query;
  if (id) state.activeStartup.id = id;
  if (name) state.activeStartup.name = name;
  if (tagline) state.activeStartup.tagline = tagline;
  if (founderName) state.activeStartup.founderName = founderName;
  if (category) state.activeStartup.category = category;
  if (pitchOrder) state.activeStartup.pitchOrder = parseInt(pitchOrder, 10);

  io.emit('startupUpdate', state.activeStartup);
  res.json({ message: 'Startup updated', activeStartup: state.activeStartup });
});


app.post('/api/judge/login', (req, res) => {
  const { email, password } = req.body ?? {};
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required.' });
  }

  const judge = JUDGES.find(
    (j) => j.email.toLowerCase() === email.toLowerCase() && j.password === password
  );

  if (!judge) {
    return res.status(401).json({ error: 'Invalid credentials. Please check your email and password.' });
  }


  const { password: _, ...safeJudge } = judge;
  res.json({ judge: safeJudge });
});


app.get('/api/admin/judgeScores', (req, res) => {
  res.json({ judgeScores: state.judgeScores });
});


io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);

  // Send full initial state to new client immediately
  socket.emit('initialData', {
    activeStartup: state.activeStartup,
    pollOpen: state.pollOpen,
    liveStats: state.liveStats,
  });

  socket.on('vote', (voteData) => {
    console.log(`Vote received from ${socket.id}:`, voteData);

    state.liveStats.totalVoters += 1;
    if (voteData.likeIdea) state.liveStats.likeIdea += 1;
    if (voteData.likePresentation) state.liveStats.likePresentation += 1;
    if (voteData.wouldJoin) state.liveStats.wouldJoin += 1;


    const tv = state.liveStats.totalVoters;
    const { likeIdea, likePresentation, wouldJoin } = state.liveStats;
    state.liveStats.satisfactionScore = tv > 0
      ? Math.round(((likeIdea + likePresentation + wouldJoin) / (tv * 3)) * 100)
      : 0;

    io.emit('statsUpdate', state.liveStats);
  });


  socket.on('judge:submit', (data, ack) => {
    const { startupId, judgeId, scores, remarks } = data ?? {};
    console.log(`Judge score received — judge:${judgeId}, startup:${startupId}`);

    if (!state.judgeScores[startupId]) {
      state.judgeScores[startupId] = {};
    }
    state.judgeScores[startupId][judgeId] = {
      scores,
      remarks,
      submittedAt: new Date().toISOString(),
    };

    // Acknowledge back to the submitting judge
    if (typeof ack === 'function') {
      ack({ success: true });
    }
  });

  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
