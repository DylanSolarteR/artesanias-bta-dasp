import { Request, Response } from 'express';
import { Criteria, Filter, matchType, Sort } from '../dao/Criteria';
import { PhysicalLocationDAOPostgres } from '../dao/implementation/postgresDAO/physicalLocationDAOPostgres';
import { Employee, employeeRoles, Inventory, PhysicalLocation } from '../model/businessTypes';
import { ImageManager } from '../model/imagesManager';
import { AwsImageManager } from '../model/AwsImageManager';
import { number, z } from 'zod';
import { ProductDAOPostgres } from '../dao/implementation/postgresDAO/productDAOPostgres';
import { InventoryDAOPostgres } from '../dao/implementation/postgresDAO/inventoryDAOPostgres';



export async function listPhysicalLocations(req: Request, res: Response) {
    let dao = new PhysicalLocationDAOPostgres();
    let query: Object = req.query;

    let filters = []
    if (req.query['id'] != null) {
        filters.push(new Filter('pk_id',
            <string>req.query['id'], matchType.strictEqual));
    }
    if (req.query['active'] != null) {
        filters.push(new Filter('active',
            <string>req.query['active'], matchType.strictEqual));
    }

    let sorts = []
    let result = await dao.query(new Criteria({
        filters,
        sortBy: sorts,
        limit: query['limit'],
        offset: query['offset'] || null

    }));

    if (result.hasResponse()) {
        res.status(200).send(result.value)
    }
    else {
        res.status(500).send(result.error)
    }

}


export async function createPhysicalLocation(req: Request, res: Response) {
    // This RequestHandler require uploadImageMiddleware
    const userRole: employeeRoles = req['user_role']; //Require identifyRole middleware

    if (!Employee.validateRoleHierarchy(userRole, employeeRoles.administrator)) {
        res.status(400).send("Rol inválido, necesita ser administrador")
        return
    }
    let {
        address,
        telephone,
        latitude,
        longitude
    } = req.body
    let dao = new PhysicalLocationDAOPostgres();
    const physicalLocation = new PhysicalLocation(address,
        telephone,
        true,
        latitude,
        longitude,
        'https://artesaniasbucket.s3.us-east-2.amazonaws.com/default_loc_image.webp'
    )
    let result = await dao.create(physicalLocation)

    if (!result.hasResponse()) {
        res.status(500).send(result.error)
        return
    }
    const location = result.value

    const productDao = new ProductDAOPostgres()
    const productRes = await productDao.query(new Criteria({}))
    const inventoryDao = new InventoryDAOPostgres()
    if (productRes.hasResponse()) {
        for (let product of productRes.value) {
            await inventoryDao.create(new Inventory(product.id, location.id, 0, 0, 0))
        }
    }

    if (!req.file) {
        res.status(200).send({ location: location, message: 'No se subió imagen, usando imagen por defecto' })
        return
    }
    const imageManager: ImageManager = new AwsImageManager()
    const extension = req.file.originalname.split('.').pop();
    let imgurl = ''
    try {
        imgurl = await imageManager.uploadImage({
            key: location.getbaseImageKey() + extension,
            contentType: req.file.mimetype,
            imagePath: req.file.path,
            extension: extension
        })

    } catch (error) { }

    if (imgurl === '') {
        res.status(200).send({ location: location, message: 'No se pudo subir la imagen' })
        return
    }

    location.image = imgurl
    const updateResult = await dao.update(location)
    if (!updateResult) {
        res.status(200).send({ location: location, message: 'No se pudo subir la imagen' })
        return
    }

    res.status(200).send({ location: location })

}


export async function deletePhysicalLocation(req: Request, res: Response) {
    const userRole: employeeRoles = req['user_role']; //Require identifyRole middleware

    if (!Employee.validateRoleHierarchy(userRole, employeeRoles.administrator)) {
        res.status(400).send("Rol inválido, necesita ser administrador")
        return
    }

    let { id } = req.params
    let dao = new PhysicalLocationDAOPostgres();
    let query = await dao.query(new Criteria({ filters: [new Filter('pk_id', id, matchType.strictEqual)] }))
    if (query.hasResponse() && query.value.length != 1) {
        res.status(400).send("Punto físico no encontrado")
        return
    }

    let result = await dao.delete(query.value[0])

    if (result) {
        res.status(200).send('Punto físico eliminado')
    }
    else {
        res.status(500).send('Error al eliminar el punto físico')
    }
}

export async function updatePhysicalLocation(req: Request, res: Response) {
    const userRole: employeeRoles = req['user_role']; //Require identifyRole middleware

    console.log(req.body)

    if (!Employee.validateRoleHierarchy(userRole, employeeRoles.administrator)) {
        res.status(400).send("Rol inválido, necesita ser administrador")
        return
    }
    let {
        address,
        telephone,
        active,
        latitude,
        longitude,
    } = req.body

    let id
    try {
        id = z.coerce.number().parse(req.params.id);
    } catch (error) {
        res.status(400).send("Id inválido")
        return
    }

    let dao = new PhysicalLocationDAOPostgres();
    let query = await dao.query(new Criteria({ filters: [new Filter('pk_id', id, matchType.strictEqual)] }))
    if (query.hasResponse() && query.value.length != 1) {
        res.status(400).send("No se encontró el punto físico")
        return
    }
    if (query.value.length != 1) {
        res.status(400).send("Punto físico no encontrado")
        return
    }
    const location = query.value[0]

    let img
    if (req.file) {
        const imageManager: ImageManager = new AwsImageManager()
        try {
            const existingKey = location.image.split('/').pop() // Get the existing image key from the URL
            const extension = req.file.originalname.split('.').pop()
            // Prevents the deletion of default image
            if (existingKey.indexOf(location.getbaseImageKey()) !== -1) {
                await imageManager.deleteImage(existingKey)
            }
            img = await imageManager.uploadImage({
                key: location.getbaseImageKey() + extension,
                contentType: req.file.mimetype,
                imagePath: req.file.path,
                extension: extension
            })
        } catch (error) {
            res.status(500).send("Error al subir la imagen")
            return
        }
    }

    location.address = address ?? location.address
    location.telephone = telephone ?? location.telephone
    location.active = active ?? location.active
    location.latitude = latitude ?? location.latitude
    location.longitude = longitude ?? location.longitude
    location.image = img ?? location.image

    let result = await dao.update(location)

    if (result) {
        res.status(200).send('Punto físico actualizado')
    }
    else {
        res.status(500).send('Error al actualizar el punto físico')
    }
}

