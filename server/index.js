import cors from 'cors';
import express from 'express';
import router from './routes/summary.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/summary', router);

app.listen(3000, () => {
    console.log('Server runing in PORT 3000')
});