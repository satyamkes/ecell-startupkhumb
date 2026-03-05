const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());

// Health check endpoint
app.get('/', (req, res) => {
  res.send('Live Voting Server Running 🚀');
});

const server = http.createServer(app);

// Setup Socket.IO with CORS for development
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

// App State
const state = {
  activeStartup: {
    name: "EcoGrid Technologies",
    tagline: "Powering Tomorrow's Cities",
    category: "CleanTech",
    founderName: "Priya Sharma",
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
  }
};

// Admin endpoints to control the poll state
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
    // Example: /api/admin/setStartup?name=Acme&tagline=A+company&founderName=John&category=FinTech
    const { name, tagline, founderName, category, pitchOrder } = req.query;
    if (name) state.activeStartup.name = name;
    if (tagline) state.activeStartup.tagline = tagline;
    if (founderName) state.activeStartup.founderName = founderName;
    if (category) state.activeStartup.category = category;
    if (pitchOrder) state.activeStartup.pitchOrder = parseInt(pitchOrder);
    
    io.emit('startupUpdate', state.activeStartup);
    res.json({ message: 'Startup updated', activeStartup: state.activeStartup });
});


// Socket connection handler
io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);

  // Send initial state to new clients immediately
  socket.emit('initialData', state);

  socket.on('vote', (voteData) => {
    console.log(`Vote received from ${socket.id}:`, voteData);
    
    // Update stats
    state.liveStats.totalVoters += 1;
    if (voteData.likeIdea) state.liveStats.likeIdea += 1;
    if (voteData.likePresentation) state.liveStats.likePresentation += 1;
    if (voteData.wouldJoin) state.liveStats.wouldJoin += 1;

    // Recalculate score
    const tv = state.liveStats.totalVoters;
    const { likeIdea, likePresentation, wouldJoin } = state.liveStats;
    state.liveStats.satisfactionScore = tv > 0 
      ? Math.round(((likeIdea + likePresentation + wouldJoin) / (tv * 3)) * 100)
      : 0;

    // Broadcast updated stats to ALL clients
    io.emit('statsUpdate', state.liveStats);
  });

  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
