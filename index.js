const { data } = require("./db.connect")
data()
const ECommerce = require('./clothschema')
const Cart= require('./cart')
const express = require('express')
const app = express()
app.use(express.json())

const cors = require('cors')
const corsOptions = {
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200,
};
app.use(cors(corsOptions));



const PORT = 3000

app.listen(PORT, () => {
    console.log('App is running on port', PORT)
})



const createData = async (newData) => {
    try {
        const cloth = new ECommerce(newData)
        const addData = await cloth.save()
        console.log("Save", addData)
        return addData
    } catch (error) {
        throw error
    }
}

app.post('/ecom', async (req, res) => {
    try {
        const addData = await createData(req.body)
        res.status(201).json({ message: "Add successfully", data: addData })
    } catch (error) {
        res.status(500).json({ error: "Unable to add Data" })
    }
})

const fetchData = async () => {
    try {
        const allData = await ECommerce.find()
        return allData
    }
    catch (err) {
        throw err
    }
}

app.get('/prod', async (req, res) => {
    try {
        const fetchAll = await fetchData()
        if (fetchAll.length > 0) {
            res.json(fetchAll)
        } else {
            res.status(404).json({ error: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch Product' });
    }
})

const findByWishList = async (wishlst) => {
    try {
        const findProd = await ECommerce.find({ wishlist: wishlst })
        return findProd
    } catch (error) {
        throw error
    }
}

app.get('/prod/:wishlist', async (req, res) => {
    try {
        const products = await findByWishList(req.params.wishlist)
        if (products) {
            res.json(products)
        }
        else {
            res.status(404).json({ error: "Data not found" })
        }
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch Products" })
    }
})

const updateWishList = async (prodId, dataToUpdate) => {
    try {
        const prod = await ECommerce.findByIdAndUpdate(prodId, dataToUpdate, { new: true })
        return prod

    } catch (error) {
        throw error
    }
}

app.post('/prod/:prodId', async (req, res) => {
    try {
        const product = await updateWishList(req.params.prodId, req.body)
        if (product) {
            res.status(200).json({ message: "Successfully Updated", products: product })
        } else {
            res.status(404).json({ error: 'Product not found' });

        }
    } catch (error) {
res.status(500).json({error:"failed to update product"})
    }
})


// CART


const addToCart=async(data)=>{
    try {
        const createData= new Cart(data)
        const saved= await createData.save()
        console.log("created", saved)
        return saved
    } catch (error) {
        throw error
    }
}

app.post('/cart',async(req,res)=>{
    try {
        const cartData= await addToCart(req.body)
        res.status(201).json({message:"Data added to Database",cart:cartData})
    } catch (error) {
        res.status(500).json({error:"Unable to add Data"})
    }
})

const fetchCartData=async()=>{
    try {
        const fetch= await Cart.find()
        return fetch
    } catch (error) {
        throw error
    }
}

app.get('/cartData',async(req,res)=>{
    try {
        const allCartData= await fetchCartData()
        if(allCartData.length>0){
            res.json(allCartData)
        }else{
            res.status(404).json({error: "No data in DataBase"})
        }
    } catch (error) {
        res.status(500).json({error:"Failed to fetch data"})
    } 

})

const deleteItem=async(id)=>{
    try{
        const product = await Cart.findByIdAndDelete(id)
        return product
    }
    catch(err){
        throw err
    }
}

app.delete('/cart/:movieId',async(req,res)=>{
    try {
        const productToDelete=await deleteItem(req.params.movieId)
        if (productToDelete) {
            res.status(200).json({ message: 'Product deleted successfully' });
          } else {
            res.status(404).json({ error: 'Product not found' });
          }
        
    } catch (error) {
        res.status(500).json({error:'Failed to delete data'})
    }
})