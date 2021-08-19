const express = require('express');
const cors = require('cors');
const path = require('path');
const expressSession = require('express-session');
const config = require('./config');
const logger = require('./services/logger.service');

const app = express();
const http = require('http').createServer(app);

const session = expressSession({
    secret: 'Reuters1',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
});
// Express App Config
app.use(express.json());
app.use(session);

app.use(express.static(path.resolve(__dirname, 'public')));
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'public')));
} else {
    const corsOptions = {
        origin: ['http://127.0.0.1:4200', 'http://localhost:4200', 'http://127.0.0.1:8081', 'http://localhost:8081', 'http://127.0.0.1:3030', 'http://localhost:3030'],
        credentials: true
    };
    app.use(cors(corsOptions));
}
const fs = require('fs');
const authRoutes = require('./api/auth/auth.routes');
const userRoutes = require('./api/user/user.routes');
const generalRoutes = require('./api/general/general.routs');
const roomRoutes = require('./api/room/room.routes');
const chatMessageRoutes = require('./api/chat-message/chat-message.routes');
const {connectSockets} = require('./services/socket.service');

// routes
const setupAsyncLocalStorage = require('./middlewares/setupAls.middleware');
app.all('*', setupAsyncLocalStorage);

app.use('/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api', generalRoutes);
app.use('/api/room', roomRoutes);
app.use('/health/is-alive', (req, res) => res.send('OK'));

app.use('/api/chat-message', chatMessageRoutes);
connectSockets(http, session);

// Make every server-side-route to match the index.html
// so when requesting http://localhost:3030/index.html/car/123 it will still respond with
// our SPA (single page app) (the index.html file) and allow vue/react-router to take it from there
app.get('/**', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const  buildInfoPath = path.resolve(__dirname, './build-info.json');
fs.readFile(buildInfoPath, 'utf8', function(err, data) {
  if (err) {
    logger.error("Failed to load 'build-info.json' file content");
  } else {
    logger.info(data);

    const port = config.PORT;
    http.listen(port, () => {
      logger.info(`Server is Up on port ${config.PORT}, NLP_WRAPPER_URL= ${config.NLP_WRAPPER_URL}`);
    });
  }
});





