import express from 'express';
import morgan from 'morgan';
import router from './routes/routes';
import connectDB from './config/db';
import cors from 'cors'

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

/*app.use(cors()){
    origin: 'http://localhost:5173',
    credentials:true,
}));
*/
app.use('/api', router);
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
})
