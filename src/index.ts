import express from 'express';
import morgan from 'morgan';
import router from './routes/routes';
import connectDB from './config/db';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(morgan('dev'));
app.use('/api', router);
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
})
