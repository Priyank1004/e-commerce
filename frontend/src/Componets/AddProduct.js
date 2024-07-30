import React, { useState } from "react";

const AddProduct = () => {

    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [company, setCompany] = useState("");
    const [error , setError] = useState(false);

    const AddProductHandler = async () => {

        if(!name || !price || !category || !company){
            setError(true);
            return false;
        }
        const userId = JSON.parse(localStorage.getItem('user'))._id;
        const product = { name, price, category, userId, company };

        let result = await fetch("http://localhost:5000/add-product", {
            method: "POST",
            body: JSON.stringify(product),
            headers: {
                "Content-Type": "application/json",
                authorization:`Bearer ${JSON.parse(localStorage.getItem("token"))}`
            }
        })
        result = await result.json();
        if (result) {
            alert("Producte Add Sucessfully");
            setName("");
            setCategory("");
            setCompany("");
            setPrice("");
        }
    }

    return (
        <div className="product_container">
            <h1>Add Products</h1>
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
            <button className="Addproduct" type="button" onClick={AddProductHandler}>Add Product</button>
        </div>
    )
}

export default AddProduct;