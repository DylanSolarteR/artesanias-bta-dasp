const API_RESOURCE = 'http://localhost:3200/api/category'

export async function listCategories() {

    let response = await fetch(API_RESOURCE + '/list')

    if (!response.ok) {
        // TODO hacer algo con el error
        throw Error()
    }
    let categories: Array<any> = await response.json()
    return categories.map(c => ({ name: <string>c.name, id: <number>c._id }))

}