import { Request, Response } from 'express';
import { ProductDAOPostgres } from '../dao/implementation/postgresDAO/productDAOPostgres';
import { Criteria, Filter, matchType, Sort } from '../dao/Criteria';
import { Product } from '../model/businessTypes';


export async function createProduct(req: Request, res: Response) {

    let baseProductId, name, description, price, img, isActive, category_id, categoryName;

    const dao = new ProductDAOPostgres();
    try {
        ({ baseProductId, name, description, price, img, isActive, category_id, categoryName } = req.body);
    }
    catch (e) {
        res.status(400).send('baseProductId, name, description, price, img, state and category_id are required')
        return
    }

    const newProduct = new Product(
        baseProductId,
        name,
        description,
        price,
        img,
        isActive,
        category_id,
        categoryName
    )

    let insertResult = await dao.create(newProduct)
    if (!insertResult.hasResponse()) {
        res.status(500).send(insertResult.error)
        return
    }

    let product = insertResult.value
    console.log('final:', product)

    res.status(200).send({ product })
}

export async function listProducts(req: Request, res: Response) {
    let dao = new ProductDAOPostgres();
    let query: Object = req.query;

    let filters = [new Filter('active', true, matchType.strictEqual)]
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
        limit: query['limit'] || 50,
        offset: query['offset'] || null

    }));

    if (result.hasResponse()) {
        // TODO Imaginay stock provisional
        res.status(200).send(result.value.map(x => ({ stock: 10, ...x })))
    }
    else {
        res.status(500).send(result.error)
    }

}

export async function updateProduct(req: Request, res: Response) {

    let id, baseProductId, name, description, price, img, category_id, categoryName;

    const dao = new ProductDAOPostgres();
    try {
        ({ id, baseProductId, name, description, price, img, category_id } = req.body);
    }
    catch (e) {
        res.status(400).send('baseProductId, name, description, price, img and category_id are required')
        return
    }

    const newProduct = new Product(
        id,
        baseProductId,
        name,
        description,
        price,
        img,
        category_id,
        categoryName
    )

    let insertResult = await dao.update(newProduct)
    if (insertResult == false) {
        res.status(500).send("Error")
        return
    }

    res.status(200).send("Product updated")
}

export async function deleteProduct(req: Request, res: Response) {

    let id, baseProductId, name, description, price, img, category_id, categoryName;


    const dao = new ProductDAOPostgres();

    const newProduct = new Product(
        id,
        baseProductId,
        name,
        description,
        price,
        img,
        category_id,
        categoryName
    )

    let insertResult = await dao.delete(newProduct)
    if (insertResult == false) {
        res.status(500).send("Error")
        return
    }

    res.status(200).send( "Product remove" )
}   
