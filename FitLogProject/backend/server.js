import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import registerValidation from './middleware/validator.js'
import { register, login , resetPassword } from './authtorization/auth.js'
import router from './router/MealPlanRouter.js';
import geminiRouter from './router/geminiChat.js';

mongoose.connect('mongodb://localhost:27017', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

const app = express();
const PORT = 3000;

app.use(express.json());

const corsOptions = {
  origin: 'http://localhost:5173',
  credentials: true,
};
app.use(cors(corsOptions));

app.post('/register', registerValidation , register);
app.post('/login', login);
app.post('/reset-password' , resetPassword)
app.use('/meal-plan' , router)
app.use('/gemini-chat', geminiRouter)



app.listen(PORT, (err) => {
  err ? console.log(err) : console.log(`Server is running on port ${PORT}`);
});