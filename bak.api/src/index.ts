import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3030;

app.get('/', (req: Request, res: Response) => {
  const randomObj: {randomNumber: number, randomString: string} = {randomNumber: Math.random(), randomString: "random"+Math.random()}
  res.send(randomObj);
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});