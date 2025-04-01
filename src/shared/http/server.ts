import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());

app.use(express.json());

app.get('/', (request, response) => {
  return response.json({ message: 'Olá Fabiano' });
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
