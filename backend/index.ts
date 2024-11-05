import express, { Express, Request, Response, Application } from 'express';
import dotenv from 'dotenv';
import productRoutes from "./src/routes/product.routes";
import categoryRoutes from "./src/routes/category.routes";
import cors from 'cors'

//For env File 
dotenv.config();

const app: Application = express();
// TODO Configurar el cors
app.use(cors());

const port = process.env.PORT || 8000;

app.use('/api/product', productRoutes)
app.use('/api/category', categoryRoutes)
app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to Express & TypeScript Server');
});

app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});
