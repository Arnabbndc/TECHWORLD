const express = require('express');
const validator = require('validator')
const { redirect } = require('express/lib/response');
const DB_cart = require('../../DB_codes/DB_cart');
const DB_product = require('../../DB_codes/DB_product')
const DB_user = require('../../DB_codes/DB_user')
const router = express.Router({ mergeParams: true });
router.post('/cartprice', async (req, res) => {
   
    let price=await DB_cart.getCartPrice(req.session.userid);
    const da={
        price
    }
    res.send(da);
})

router.get('/update', async (req, res) => {
   
    console.log(req.session.cart);
    return res.redirect('/');
})
router.post('/cartIncreament',async (req,res)=>{
    
    const pid= req.body.pid;
    const uid= req.session.userid;
    //console.log(pid," inc er vitor");
    await DB_cart.cartIncreament(uid,pid);
    req.session.cart= await DB_cart.getCart(uid);
    //console.log("doneeeee");
    let price=await DB_cart.getCartPrice(req.session.userid);

    let da = {
        id:"hello",
        price
    }
    
    res.send(da);
})
router.post('/cartDecreament',async (req,res)=>{
    
    const pid= req.body.pid;
    const uid= req.session.userid;

    await DB_cart.cartDecreament(uid,pid);
    req.session.cart= await DB_cart.getCart(uid);
    //console.log("doneeeee");
    let price=await DB_cart.getCartPrice(req.session.userid);

    let da = {
        id:"hello",
        price
    }
    
    res.send(da);
})
router.post('/cartAdd',async (req,res)=>{
    
    const pid= req.body.pid;
    const uid= req.session.userid;
    let exists=await DB_cart.checkCart(uid,pid);

     await DB_cart.addToCart(uid,pid);
     //console.log(exists);
     req.session.cart= await DB_cart.getCart(uid);

     let product= await DB_product.getProductByID(pid);
     let price=await DB_cart.getCartPrice(req.session.userid);

     const da={
        exists,
        product,
        price
     };
     //console.log(da);
     res.send(da);
    // let product="abcd";
    // res.send(product);
})
router.get('/viewcart', async (req, res) => {
    let price=await DB_cart.getCartPrice(req.session.userid);
    const data = {
        pageTitle: 'VIEW CART',
        isAuth: req.session.isAuth,
        userid: req.session.userid,
        username: req.session.username,
        isAdmin: req.session.isAdmin,
        cart: req.session.cart,
        price
        ,allBrands:req.session.allBrands
 ,GRAPHICS_CARDBrands:req.session.GRAPHICS_CARDBrands
 ,PROCESSORBrands:req.session.PROCESSORBrands
 ,RAMBrands:req.session.RAMBrands
 ,HDDBrands:req.session.HDDBrands
 ,SSDBrands:req.session.SSDBrands
 ,MOTHERBOARDBrands:req.session.MOTHERBOARDBrands
 ,POWER_SUPPLYBrands:req.session.POWER_SUPPLYBrands
 ,HEADPHONEBrands:req.session.HEADPHONEBrands
 ,KEYBOARDBrands:req.session.KEYBOARDBrands
 ,MOUSEBrands:req.session.MOUSEBrands
 ,SPEAKERBrands:req.session.SPEAKERBrands
 ,UPSBrands:req.session.UPSBrands
 ,WEBCAMBrands:req.session.WEBCAMBrands
 ,LAPTOPBrands:req.session.LAPTOPBrands
 ,MONITORBrands:req.session.MONITORBrands
 

    }
    return res.render('viewcart',data);
})
router.get('/checkout', async (req, res) => {
    const user= await DB_user.getUserInfoByUserId(req.session.userid);
    let price=await DB_cart.getCartPrice(req.session.userid);

    const data = {
        pageTitle: 'CHECKOUT',
        isAuth: req.session.isAuth,
        userid: req.session.userid,
        username: req.session.username,
        isAdmin: req.session.isAdmin,
        cart: req.session.cart,
        user,
        price
        ,allBrands:req.session.allBrands
 ,GRAPHICS_CARDBrands:req.session.GRAPHICS_CARDBrands
 ,PROCESSORBrands:req.session.PROCESSORBrands
 ,RAMBrands:req.session.RAMBrands
 ,HDDBrands:req.session.HDDBrands
 ,SSDBrands:req.session.SSDBrands
 ,MOTHERBOARDBrands:req.session.MOTHERBOARDBrands
 ,POWER_SUPPLYBrands:req.session.POWER_SUPPLYBrands
 ,HEADPHONEBrands:req.session.HEADPHONEBrands
 ,KEYBOARDBrands:req.session.KEYBOARDBrands
 ,MOUSEBrands:req.session.MOUSEBrands
 ,SPEAKERBrands:req.session.SPEAKERBrands
 ,UPSBrands:req.session.UPSBrands
 ,WEBCAMBrands:req.session.WEBCAMBrands
 ,LAPTOPBrands:req.session.LAPTOPBrands
 ,MONITORBrands:req.session.MONITORBrands
 
    }
    return res.render('checkout',data);
})
router.post('/payment', async (req, res) => {
    let price=await DB_cart.getCartPrice(req.session.userid);

    const data = {
        pageTitle: 'PAYMENT',
        isAuth: req.session.isAuth,
        userid: req.session.userid,
        username: req.session.username,
        isAdmin: req.session.isAdmin,
        price
        ,allBrands:req.session.allBrands
 ,GRAPHICS_CARDBrands:req.session.GRAPHICS_CARDBrands
 ,PROCESSORBrands:req.session.PROCESSORBrands
 ,RAMBrands:req.session.RAMBrands
 ,HDDBrands:req.session.HDDBrands
 ,SSDBrands:req.session.SSDBrands
 ,MOTHERBOARDBrands:req.session.MOTHERBOARDBrands
 ,POWER_SUPPLYBrands:req.session.POWER_SUPPLYBrands
 ,HEADPHONEBrands:req.session.HEADPHONEBrands
 ,KEYBOARDBrands:req.session.KEYBOARDBrands
 ,MOUSEBrands:req.session.MOUSEBrands
 ,SPEAKERBrands:req.session.SPEAKERBrands
 ,UPSBrands:req.session.UPSBrands
 ,WEBCAMBrands:req.session.WEBCAMBrands
 ,LAPTOPBrands:req.session.LAPTOPBrands
 ,MONITORBrands:req.session.MONITORBrands
 

    }

    return res.render('thankyou',data);
})

module.exports = router