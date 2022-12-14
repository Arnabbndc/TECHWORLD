
const database = require('./database')


async function getCart(userid){
    let sql= `
    SELECT *
    FROM CART NATURAL JOIN PRODUCTS
    WHERE USERID= :USERID 

    `
     let ppp=(await database.execute(sql, [userid], database.options)).rows;
     //console.log(ppp);
     return ppp;

}
async function getCartPrice(userid){
    let sql= `
    SELECT SUM(PRICE*QUANTITY) "TOTAL_PRICE"
    FROM CART NATURAL JOIN PRODUCTS
    WHERE USERID= :USERID 

    `;
   return (await database.execute(sql, [userid], database.options)).rows[0].TOTAL_PRICE;


}

async function cartIncreament(userid, productid) {
    let sql = `
    BEGIN
    INCREASE_CART(:USERID,:PRODUCTID);
    END;
    
    `;
    
    return (await database.execute(sql, [ userid,productid ], database.options))
}
async function cartDecreament(userid, productid) {
    let sql = `
    BEGIN
    DECREASE_CART(:USERID,:PRODUCTID);
    END;
    
    `;
    
    return (await database.execute(sql, [ userid,productid ], database.options))
}
async function addToCart(userid, productid) {

    let sql = `
    BEGIN
    ADD_TO_CART(:USERID,:PRODUCTID);
    END;
    `;
    
    return (await database.execute(sql, [ userid,productid ], database.options));
    
}
// async function checkCart(userid, productid) {
//     let sql = `
//     SELECT* 
//     FROM CART
//     WHERE USERID= :USERID AND PRODUCTID= :PRODUCTID
//     `
//     ;
//     let aa= (await database.execute(sql, [ userid,productid ], database.options));
//     if(aa.rows.length>0) return true;
//     return false;
// }
async function checkCart(userid, productid) {
    let sql =  `
    SELECT
    ALREADY_IN_CART(:USERID,:PRODUCTID) AS CNT
    FROM DUAL
    
    `;
    return (await database.execute(sql, [ userid,productid ], database.options)).rows[0].CNT;

    // if(aa.rows.length>0) return true;
    // return false;
}
async function buyAll(userid) {
    let sql = `
    BEGIN
    BUY_ALL(:USERID);
    END;
    `;
    
    return (await database.execute(sql, [ userid ], database.options))
}

async function orderHistory(userid){
    let sql= `
    SELECT USERID,TO_CHAR(PURCHASE_DATE,'DL') PURCHASE_DATE, PRODUCTID, PRODUCT_NAME,QUANTITY, IMAGE, PRICE
    FROM BUYS NATURAL JOIN PRODUCTS
    WHERE USERID=:USERID 

    `
     let ppp=(await database.execute(sql, [userid], database.options)).rows;
     //console.log(ppp);
     return ppp;

}
async function previouslyChosen(userid){
    let sql= `
    SELECT *
    FROM PRODUCT_CHOSEN NATURAL JOIN PRODUCTS
    WHERE USERID= :USERID 

    `
     let ppp=(await database.execute(sql, [userid], database.options)).rows;
     //console.log(ppp);
     return ppp;

}

module.exports = {
    getCart,
    cartIncreament,
    cartDecreament,
    addToCart,
    checkCart,
    buyAll,
    orderHistory,
    previouslyChosen,
    getCartPrice
}
