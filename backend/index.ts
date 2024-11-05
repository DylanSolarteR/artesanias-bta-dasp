import express, { Express, Request, Response , Application } from 'express';
import dotenv from 'dotenv';
import productRoutes from "./src/routes/product.routes";

//For env File 
dotenv.config();

const app: Application = express();
const port = process.env.PORT || 8000;

app.use('/api/product', productRoutes)
app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to Express & TypeScript Server');
});

app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});
