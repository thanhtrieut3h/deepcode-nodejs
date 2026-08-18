import app from './app.js';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Enviroment: ${process.env.NODE_ENV}`);
    console.log(`API URL : http://localhost:${PORT}/api/v1`);
});
const shutdown = (signal) => {
    console.log(`\n${signal} received. Shutting down ....`);
    server.close(() => {
        console.log('server closed');
        process.exit(0);
    });
}
process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));
process.on('unhandledRejection', (err) => {
    console.log('unhandledRejection: ', err);
    server.close(()=> process.exit(1));
});