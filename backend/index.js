const express = require('express');
require('./db/config');
const cors = require('cors');
const app = express();
const User = require('./db/User');
const Products = require('./db/Product');
const Product = require('./db/Product');
const Jwt = require("jsonwebtoken");
const jwtKey = 'e-comm';

app.use(express.json());
app.use(cors());


// Register API SEND Data
app.post("/register", async (req, res) => {
    let user = new User(req.body);
    let result = await user.save();
    result = result.toObject();
    Jwt.sign({ result }, jwtKey, { expiresIn: "2h" }, (err, token) => {
        if (err)
            res.send({ result: "Wrong Token" })
        res.send({ result, auth: token });
    })
    delete result.password;
    console.log(result);
});


// Login API Send
app.post("/login", async (req, res) => {
    console.log(req.body)
    let user = await User.findOne(req.body).select('-password'); // For Remove password from data.
    if (user && req.body.name && req.body.password) {
        Jwt.sign({ user }, jwtKey, { expiresIn: "2h" }, (err, token) => {
            if (err)
                res.send({ result: "Wrong Token" })
            res.send({ user, auth: token });
        })

    }
    else
        res.send({ result: "No Use Found" });
})

// Products POST API
app.post("/add-product", verifyToken , async (req, res) => {
    let product = new Products(req.body);
    let result = await product.save();
    res.send(result)
})


// Products GET API
app.get("/product-list", verifyToken, async (req, res) => {
    let product = await Products.find();
    res.send(product);
})

// Product Delete API

app.delete("/product/:_id", async (req, res) => {
    console.log(req.params._id)
    let result = await Products.deleteOne({ _id: req.params._id });
    res.send(result);
})

app.get("/product/:_id", async (req, res) => {
    let result = await Products.findOne({ _id: req.params._id });
    if (result)
        res.send(result);
    else
        res.send({ result: "No Data Found" })
})

app.put("/product/:_id", async (req, res) => {
    let result = await Products.updateOne(
        { _id: req.params._id },
        {
            $set: req.body
        }
    )
    res.send(result);
})

app.get("/search/:key", verifyToken, async (req, res) => {
    let result = await Product.find({
        "$or": [
            { name: { $regex: req.params.key } },
            { company: { $regex: req.params.key } },
            { category: { $regex: req.params.key } }
        ]
    })
    res.send(result);
});

function verifyToken(req, res, next) {
    let token = req.headers['authorization'];
    if (token) {
        token = token.split(' ')[1];

        Jwt.verify(token, jwtKey, (err, vaild) => {
            if (err)
                res.status(401).send({ result: "Please add token with Header" });
            else
                next();
        })
    } else {
        res.status(403).send({ result: "Please add token with Header" })
    }
}


app.listen(5000);