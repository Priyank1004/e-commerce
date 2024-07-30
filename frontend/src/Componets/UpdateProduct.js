import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const UpdateProduct = () => {

    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [company, setCompany] = useState("");
    const [error, setError] = useState(false);
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        getProductDetails();
    },[])
    const getProductDetails = async () => {
        let result = await fetch(`http://localhost:5000/product/${params.id}`);
        console.log(params);
        result = await result.json();   
        setName(result.name);
        setPrice(result.price);
        setCategory(result.category);
        setCompany(result.company);
    }

    const UpdateProductHandler = async () => {
        console.log( name, price, category, company )

        if (!name || !price || !category || !company) {
            setError(true);
            return false;
        }

        let response = await fetch(`http://localhost:5000/product/${params.id}`, {
            method: "PUT",
            body: JSON.stringify( { name, price, category, company }),
            headers: {
                 "Content-Type": "application/json"
            }
        })
        response = await response.json();
        console.log("AAAAAAA : ",response)
        if (response) {
            navigate("/");
        }
    }

    return (
        <div className="product_container">
            <h1>Update Products</h1>
            <input className='inputbox' type="text" placeholder="Product Name"
                value={name} onChange={(e) => setName(e.target.value)} />
            {error && !name && <span className="input_error">Enter vaild name</span>}
            <input className='inputbox' type="text" placeholder="Product Price"
                value={price} onChange={(e) => setPrice(e.target.value)} />
            {error && !price && <span className="input_error">Enter vaild price</span>}
            <input className='inputbox' type="text" placeholder="Product Category"
                value={category} onChange={(e) => setCategory(e.target.value)} />
            {error && !category && <span className="input_error">Enter vaild category</span>}
            <input className='inputbox' type="text" placeholder="Product Company"
                value={company} onChange={(e) => setCompany(e.target.value)} />
            {error && !company && <span className="input_error">Enter vaild company</span>}
            <button className="Addproduct" type="button" onClick={UpdateProductHandler}>Update Product</button>
        </div>
    )
}

export default UpdateProduct;