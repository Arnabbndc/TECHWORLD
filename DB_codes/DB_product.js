const database = require('./database')


async function getProductByID(productid) {
    let sql1 = `
        SELECT TYPE
        FROM PRODUCTS 
        WHERE PRODUCTID = :PRODUCTID
    `
    let typ= (await database.execute(sql1, [productid], database.options)).rows[0];
    console.log(typ);
    if(typ.TYPE=="LAPTOP"){
        let sql2 = `
        SELECT*
        FROM PRODUCTS NATURAL JOIN LAPTOP
        WHERE PRODUCTID = :PRODUCTID
    `
    
    return (await database.execute(sql2, [productid], database.options)).rows[0];
    }
    else if(typ.TYPE=="MONITOR"){
        
        let sql2 = `
        SELECT*
        FROM PRODUCTS NATURAL JOIN MONITOR
        WHERE PRODUCTID = :PRODUCTID
    `
    return (await database.execute(sql2, [productid], database.options)).rows[0];

    }
}

async function getProductBySearch(string) {
    let sql = `
    SELECT *
     FROM PRODUCTS
      WHERE UPPER(TYPE) LIKE '${string[0]}' OR UPPER(PRODUCT_NAME) LIKE '${string[0]}' `
    for (let i = 1; i < string.length; i++) {
        sql += ` OR UPPER(TYPE) LIKE '${string[i]}' OR UPPER(PRODUCT_NAME) LIKE '${string[i]}'`;
    }
    return (await database.execute(sql, [], database.options)).rows
}
async function getProductByType(type) {
    let sql = `
    SELECT *
     FROM PRODUCTS
      WHERE TYPE= :type `
    return (await database.execute(sql, [type], database.options)).rows
}
async function getNewlyReleasedProduct() {
    let sql = `
        SELECT*
        FROM PRODUCTS
        ORDER BY RELEASE_DATE DESC
        
    `
    return (await database.execute(sql, [], database.options)).rows
}
async function getTopProducts() {
    let sql = `
        SELECT *
        FROM PRODUCTS
        ORDER BY RATING DESC
        
    `
    return (await database.execute(sql, [], database.options)).rows
}


module.exports = {

    getProductByID,
    getProductBySearch,
    getProductByType,
    getTopProducts,
    getNewlyReleasedProduct
}