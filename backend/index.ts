import express, { Express, Request, Response, Application } from 'express';
import dotenv from 'dotenv';
import productRoutes from "./src/routes/product.routes";
import categoryRoutes from "./src/routes/category.routes";
import authRoutes from "./src/routes/auth.routes";
import physicalLocationRoutes from "./src/routes/physicalLocation.routes"
import purchaseRoutes from "./src/routes/purchase.routes";
import employeeRoutes from "./src/routes/employee.routes";
import inventoryRoutes from "./src/routes/inventory.routes";
import parametersRoutes from "./src/routes/parameters.routes";
import reportAssociationRoutes from "./src/routes/reportAssociation.routes";
import reportSalesRoutes from "./src/routes/reportSales.routes";
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
app.use('/api/parameters', parametersRoutes)
app.use('/api/reportAssociation', reportAssociationRoutes)
app.use('/api/reportSales', reportSalesRoutes)

app.get('/', (req: Request, res: Response) => {
  res.send('Panthousand api :)');
});

if (process.env.NODE_ENV === 'production') {
  (async () => {
    const https = await import('https');
    const fs = await import('fs');

    const sslOptions = {
      key: fs.readFileSync(process.env.SSL_KEY),
      cert: fs.readFileSync(process.env.SSL_CERT)
    };

    https.createServer(sslOptions, app).listen(port, () => {
      console.log(`Server is Fire at https://localhost:${port}`);
    });
  })()
}
if (process.env.NODE_ENV === 'development') {
  app.listen(port, () => {
    console.log(`Server is Fire at http://localhost:${port}`);
  });
}
