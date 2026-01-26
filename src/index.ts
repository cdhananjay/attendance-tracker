import express from 'express';
import cookieParser from 'cookie-parser';
import authRouter from "./routes/auth.routes.js";
import subjectRouter from "./routes/subject.routes.js";
import { drizzle } from 'drizzle-orm/neon-http';

const app = express()
const port = 3000

const db = drizzle(process.env.DATABASE_URL!);

app.use(cookieParser())
app.use(express.json())
app.use('/api/auth' , authRouter);
app.use('/api/sub' , subjectRouter);

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})