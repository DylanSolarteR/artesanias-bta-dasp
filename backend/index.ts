import express, { Express, Request, Response, Application } from 'express';
import dotenv from 'dotenv';
import productRoutes from "./src/routes/product.routes";
import categoryRoutes from "./src/routes/category.routes";
import authRoutes from "./src/routes/auth.routes";
import physicalLocationRoutes from "./src/routes/physicalLocation.routes"
import purchaseRoutes from "./src/routes/purchase.routes";
import employeeRoutes from "./src/routes/employee.routes";
import inventoryRoutes from "./src/routes/inventory.routes";
import cors from 'cors'

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
app.use('/api/purchase', purchaseRoutes)
app.use('/api/employee', employeeRoutes)
app.use('/api/inventory', inventoryRoutes)

app.get('/', (req: Request, res: Response) => {
  res.send('Panthousand api :)');
});

app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});
