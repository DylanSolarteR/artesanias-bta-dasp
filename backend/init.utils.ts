import { Criteria, Sort } from "./src/dao/Criteria";
import { ProductDAOPostgres } from "./src/dao/implementation/postgresDAO/productDAOPostgres";
import fs from 'fs/promises'
import { AwsImageManager } from "./src/model/AwsImageManager";

export async function images() {
    const dao = new ProductDAOPostgres()
    const res = await dao.query(new Criteria({}))

    if (!res.hasResponse()) {
        console.log('No hay productos')
        return
    }
    const products = res.value
    const files = await fs.readdir('./img')
    const imageManager = new AwsImageManager()
    const toUpload = []
    const missing = []
    files.forEach(async (filePath) => {
        const product = products.find(p => p.img === filePath)
        if (product) {
            product.img = filePath
            toUpload.push(product)
        }
        else {
            missing.push(filePath)
        }
        return
    })

    // console.log(toUpload)
    // console.log(missing)

    toUpload.forEach(async (product) => {
        const imgUrl = await imageManager.uploadImage({
            key: product.getbaseImageKey() + product.img.split('.').pop(),
            imagePath: './img/' + product.img
        })
        product.img = imgUrl
        await dao.update(product)
        console.log(product.id, 'complete')
    })
}

export async function createProductDML() {
    const dao = new ProductDAOPostgres()
    const res = await dao.query(new Criteria({ sortBy: [new Sort('pk_id', true)] }))

    if (!res.hasResponse()) {
        console.log('No hay productos')
        return
    }
    const products = res.value
    let dml = 'INSERT INTO product VALUES '
    products.forEach(product => {
        // Example
        // INSERT INTO product VALUES (DEFAULT, 1, 'Jarrón Cerámico Azul', 'Jarrón cerámico de color azul.', 23000, 'jarron_ceramica_azul.png', true, 1);
        const value = `(${product.id}, ${product.baseProductId}, '${product.name}', '${product.description}', ${product.price}, '${product.img}', ${product.isActive}, ${product.categoryId}),`
        dml += '\n' + value
    })
    dml = dml.slice(0, -1) + ';'

    fs.writeFile('./sql/dml_product.sql', dml)
}