export const toggle = () => {
    return {
        type: 'TOGGLE'
    }
}

export const currentPage = (pageName) => {
    if (pageName !== undefined || null) {
        return {
            type: 'CURRENTPAGE',
            payload: pageName
        }
    }
    return { type: 'null' }
}

export const route = (pageName) =>{
    if (pageName !== undefined || null){
        return{
            type: 'ROUTE',
            payload: pageName
        }
    }
    return {type: 'null'}
}