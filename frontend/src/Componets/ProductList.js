import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const ProductList = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch("http://localhost:5000/product-list",{
                headers:{
                    authorization:`Bearer ${JSON.parse(localStorage.getItem("token"))}`
                }
            });
            if (!response.ok) {
                throw new Error(`HTTP error:Status ${response.status}`)
            }
            let productlist = await response.json();
            console.log(productlist);
            setData(productlist);
        } catch (error) {
            console.error(error.message)
        }
    }

    const deleteProduct = async (id) => {
        let response = await fetch(`http://localhost:5000/product/${id}`, {
            method: "DELETE"
        });
        response = await response.json();

        if (response) {
            alert("Product Deleted Sucessfully");
            fetchData();
        }
    }

    const serachHandler = async (event) => {
        // console.log(event.target.value);
        let key = event.target.value;
        if (key) {
            let result = await fetch(`http://localhost:5000/search/${key}`)
            result = await result.json();
            if (result) {
                setData(result);
            }
        } else {
            fetchData();
        }


    }

    return (
        <div className='product_tabel'>
            <h1>Product List</h1>
            <input type="text" className='serachproduct' onChange={serachHandler} placeholder='Serach Product' />
            <table>
                <thead>
                    <tr>
                        <th>Sr No</th>
                        <th>Product Name</th>
                        <th>Product Price</th>
                        <th>Product Category</th>
                        <th>Product Company</th>
                        <th>Opration</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.length > 0 ? data.map((val, index) => (
                            <tr key={val._id}>
                                <td>{index + 1}</td>
                                <td>{val.name}</td>
                                <td>{val.price}</td>
                                <td>{val.category}</td>
                                <td>{val.company}</td>
                                <td>
                                    <button onClick={() => deleteProduct(val._id)} >Delete</button> &nbsp;
                                    <button className='updateBTN'><Link to={`/update/${val._id}`} >Update</Link></button>
                                </td>
                            </tr>
                        ))
                        : <tr><td>No Product found</td></tr>
                    }
                </tbody>
            </table>
        </div>
    )
}

export default ProductList
