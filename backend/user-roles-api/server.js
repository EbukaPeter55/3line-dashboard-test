import express from 'express';
import rolesRouter from './routes/roles.js';

const app = express();
const PORT = process.env.PORT || 3002;

app.use(express.json());

app.use('/api/roles', rolesRouter);

// Basic root route
app.get('/', (req, res) => {
    res.send('Welcome to the User Roles API! Access roles at /api/roles');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Access the API at http://localhost:${PORT}/api/roles`);
});
