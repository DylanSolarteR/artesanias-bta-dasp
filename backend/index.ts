import express, { Express, Request, Response, Application } from 'express';
import dotenv from 'dotenv';
import productRoutes from "./src/routes/product.routes";
import categoryRoutes from "./src/routes/category.routes";
import authRoutes from "./src/routes/auth.routes";
import physicalLocationRoutes from "./src/routes/physicalLocation.routes"
import cors from 'cors'
import jwt from 'jsonwebtoken';

//For env File 
dotenv.config();

const app: Application = express();
// TODO Configurar el cors
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 8000;

app.use('/api/product', productRoutes)
app.use('/api/category', categoryRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/location', physicalLocationRoutes)
app.get('/', (req: Request, res: Response) => {
  res.send('Panthousand api :)');
});

app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});
