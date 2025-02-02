import { Request, Response } from 'express';
import { ProductDAOPostgres } from '../dao/implementation/postgresDAO/productDAOPostgres';
import { Criteria, Filter, matchType, Sort } from '../dao/Criteria';
import { employeeRoles, Product } from '../model/businessTypes';
import { MulterRequest } from '../custom';
import fs from 'fs';
import { AwsImageManager } from "../model/awsImageManager";
import { ImageManager } from '../model/imagesManager';

function deleteImage(file: Express.Multer.File) {
    if (!file) return
    const path = file.path
    fs.unlink(path, (err) => {
        if (err) {
            console.error(err)
        }
    })
}

export async function createProduct(req: MulterRequest, res: Response) {
    const file = req.file // Require uploadMiddleware.single('imgFile') (See Multer)
    const userRole = req['user_role'];

    if (userRole !== employeeRoles.administrator) {
        res.status(401).send('Es necesario ser administrador para crear un producto')
        deleteImage(req.file)
        return
    }

    let { name, description, price, img, categoryId, baseProductId, isOwnBase } = req.body;
    const dao = new ProductDAOPostgres();
    if (!name || !description || !price || !categoryId) {
        res.status(400).send('Los campos nombre, descripcion, precio, imagen y categoria son requeridos')
        deleteImage(req.file)
        return
    }

    if (!isOwnBase && !baseProductId) {
        res.status(400).send('El campo baseProductId es requerido')
        deleteImage(req.file)
        return
    }

    const newProduct = new Product(
        name,
        description,
        null,
        categoryId,
        baseProductId,
        price,
        'https://artesaniasbucket.s3.us-east-2.amazonaws.com/default_image.webp',
        true
    )

    let insertResult = await dao.create(newProduct)
    if (!insertResult.hasResponse()) {
        res.status(500).send(insertResult.error)
        deleteImage(req.file)
        return
    }

    let product = insertResult.value

    if (isOwnBase) {
        product.baseProductId = product.id
        const updateResult = await dao.update(product)
        if (!updateResult) {
            res.status(500).send("Error al establecer la base del producto")
            deleteImage(req.file)
            return
        }
    }

    if (file === undefined) {
        res.status(200).send({ product, message: "Producto creado (No se envió imagen)" })
        return
    }
    const imageManager: ImageManager = new AwsImageManager()
    let imgUrl: string
    try {
        imgUrl = await imageManager.uploadImage({
            fileName: product.id + '_' + file.originalname.split('.').pop(),
            contentType: file.mimetype,
            imagePath: file.path
        })
    } catch (error) {
        res.status(200).send({ product, message: "Producto creado (sin imagen)" })
        deleteImage(file)
        return
    }
    product.img = imgUrl
    const updateRes = await dao.update(product)
    if (!updateRes) {
        res.status(200).send({ product, message: "Producto creado (sin imagen)" })
        deleteImage(file)
        return
    }

    res.status(200).send({ product })

    deleteImage(file)
}

export async function listProducts(req: Request, res: Response) {
    let dao = new ProductDAOPostgres();
    let query: Object = req.query;

    let filters = [new Filter('product.active', true, matchType.strictEqual)]
    if (query.hasOwnProperty('name')) {
        filters.push(new Filter('product.name',
            <string>req.query['name'], matchType.nonStrictEqual));
    }
    if (query.hasOwnProperty('minPrice')) {
        filters.push(new Filter('price',
            <string>req.query['minPrice'], matchType.greaterThanOrEqual));
    }
    if (query.hasOwnProperty('maxPrice')) {
        filters.push(new Filter('price',
            <string>req.query['maxPrice'], matchType.lessThanOrEqual));
    }
    if (query.hasOwnProperty('category')) {
        filters.push(new Filter('category.pk_id',
            <string>req.query['category'], matchType.strictEqual));
    }
    if (query.hasOwnProperty('id')) {
        filters.push(new Filter('product.pk_id',
            <string>req.query['id'], matchType.strictEqual));
    }
    if (query.hasOwnProperty('baseid')) {
        filters.push(new Filter('product.fk_id_base_product',
            <string>req.query['baseid'], matchType.strictEqual));
    }

    filters.push(new Filter('product.active', true, matchType.strictEqual))

    let sorts = []
    if (query.hasOwnProperty('orderBy')) {
        if (!Array.isArray(query['orderBy'])) {
            query['orderBy'] = [query['orderBy']];
        }
        for (let sort of query['orderBy']) {
            let [name, type] = sort.split(',');
            type = type.toUpperCase()
            if (['ASC', 'DESC'].indexOf(type) == -1) {
                res.status(500)
                    .send({ error: 'Invalid sort type for param: ' + name });
                return;
            }
            if (!Product.filterDict.hasOwnProperty(name)) {
                res.status(500)
                    .send({ error: 'Invalid sort name: ' + name });
                return;

            }
            sorts.push(new Sort(Product.filterDict[name], type === 'ASC'));
        }
    }

    let result = await dao.query(new Criteria({
        filters,
        sortBy: sorts,
        limit: Number(query['limit']) || null,
        offset: Number(query['offset']) || null

    }));

    if (result.hasResponse()) {
        res.status(200).send(result.value)
    }
    else {
        res.status(500).send(result.error)
    }

}

export async function updateProduct(req: Request, res: Response) {
    const userRole = req['user_role'];
    console.log(userRole)

    if (userRole !== employeeRoles.administrator) {
        res.status(401).send('Es necesario ser administrador para actualizar un producto')

        return
    }

    let id = req.params.id;
    let { baseProductId, name, description, price, img, categoryId } = req.body;

    const dao = new ProductDAOPostgres();
    if (!id) {
        res.status(400).send('La id del producto es requerida')
        return
    }

    const productRes = await dao.query(new Criteria({
        filters: [new Filter('product.pk_id', id, matchType.strictEqual)]
    }))
    if (!productRes.hasResponse()) {
        res.status(500).send("Error interno al identificar el producto")
        return
    }

    if (productRes.value.length !== 1) {
        res.status(500).send("Producto no encontrado")
        return
    }
    const product = productRes.value[0]

    product.baseProductId = baseProductId ?? product.baseProductId
    product.name = name ?? product.name
    product.description = description ?? product.description
    product.price = price ?? product.price
    product.img = img ?? product.img
    product.categoryId = categoryId ?? product.categoryId

    let updateResult = await dao.update(product)
    if (updateResult == false) {
        res.status(500).send("Error interno al actualizar el producto")
        return
    }

    res.status(200).send("Producto actualizado")
}

export async function deleteProduct(req: Request, res: Response) {

    const userRole = req['user_role'];

    if (userRole !== employeeRoles.administrator) {
        res.status(401).send('Es necesario ser administrador para eliminar un producto')
        return
    }

    const dao = new ProductDAOPostgres();

    const productRes = await dao.query(new Criteria({
        filters: [new Filter('product.pk_id', req.params.id, matchType.strictEqual)]
    }))

    if (!productRes.hasResponse()) {
        res.status(500).send("Error interno al identificar el producto")
        return
    }

    if (productRes.value.length !== 1) {
        res.status(500).send("Producto no encontrado")
        return
    }

    const toDeleteProduct = productRes.value[0]

    let insertResult = await dao.delete(toDeleteProduct)
    if (insertResult == false) {
        res.status(500).send("No se pudo eliminar el producto")
        return
    }
    res.status(200).send("Producto eliminado")
}   
