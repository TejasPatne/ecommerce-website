import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearErrors, getProduct } from '../../actions/productAction';
import './Product.css';
import ProductCard from '../home/ProductCards';
import Loader from '../layout/Loader/Loader';
import { Fragment } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Pagination from 'react-js-pagination';
import Slider from "@material-ui/core/Slider";
import {useAlert} from 'react-alert';
import Typography from "@material-ui/core/Typography";
import Metadata from '../layout/MetaData';

const categories = [
    "Laptop",
    "Footwear",
    "Bottom",
    "Tops",
    "Attire",
    "Camera",
    "SmartPhones",
  ];
const Products = () => {


    const alert = useAlert();
  
    const [currentPage, setcurrentPage] = useState(1);
    const [price, setPrice] = useState([0, 55000]);
    const [category, setCategory] = useState('');
    const [ratings, setRatings] = useState(0);

    const {products,loading,error,productsCount,resultPerPage,filteredProductsCount} = useSelector(state=> state.products);
    const dispatch = useDispatch();
    const {keyword} = useParams();

    if(error){
      console.log(error);
    }

    useEffect(()=>{
      if(error){
        alert.error(error);
        dispatch(clearErrors());
      }
        dispatch(getProduct(keyword,currentPage,price,category,ratings));
    },[dispatch,keyword,currentPage,price,category,ratings,alert,error]);

    const setCurrentPageNo = (e)=>{
        setcurrentPage(e);
    };
    const priceHandler = (event, newPrice) => {
        setPrice(newPrice);
    };

    let count = filteredProductsCount;

  return (
    <Fragment>
        {loading? 
        <Loader/>: 
        (
            <Fragment>
              <Metadata title="PRODUCTS -- IANSABI"/>
                <h1 className='productsHeading'>Products</h1>
                <div className="products">
                    {products && 
                    products.map((product)=>(
                        <ProductCard key={product._id} product={product} />
                    ))}
                </div>
                <div className="filterBox">

                    <Typography>Price</Typography>
                    <Slider
                      value={price}
                      onChangeCommitted={priceHandler}
                      valueLabelDisplay="auto"
                      aria-labelledby="range-slider"
                      min={0}
                      max={55000}
                    />

                    <Typography>Categories</Typography>
                        <ul className="categoryBox">
                        {categories.map((category) => (
                            <li className="category-link" key={category} onClick={()=>setCategory(category)}>{category}
                            </li>
                        ))}
                    </ul>

                    <fieldset>
                        <Typography component="legend">Ratings Above</Typography>
                        <Slider
                          value={ratings}
                          onChange={(e, newRating) => {
                            setRatings(newRating);
                          }}
                          aria-labelledby="continuous-slider"
                          valueLabelDisplay="auto"
                          min={0}
                          max={5}
                        />
                    </fieldset>

                </div>

                {resultPerPage <= count && (
                    <div className="paginationBox">
                    <Pagination 
                      activePage={currentPage}
                      itemsCountPerPage={resultPerPage}
                      totalItemsCount={productsCount}
                      onChange={setCurrentPageNo}
                      nextPageText="Next"
                      prevPageText="Prev"
                      firstPageText="1st"
                      lastPageText="Last"
                      itemClass="page-item"
                      linkClass="page-link"
                      activeClass="pageItemActive"
                      activeLinkClass="pageLinkActive"
                    />
                  </div>
                )}
                </Fragment>
        )
        }
    </Fragment>
  )
}

export default Products