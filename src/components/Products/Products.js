import React from "react";
import './Products.css';
import heart from '../../img/heart.svg';

function Products(props){
    let listItems = props.products.map((product) =>
        {return (  
            <li key={product.id}>
                <hr key={product.id+1}></hr>
                <span className={product.is_new ? `new` : `new-hide`}>Новинка</span>
                <img src={product.image ? product.image.desktop.x1 : props.defImg}/>
                <div className="product-info">
                    <p className="title">{product.title}</p>
                    <div>
                        <div className="price-block">
                            <p className="price">{product.price} ₽</p>
                            <span className={product.is_new ? `new` : `new-hide`}>Новый</span>
                        </div>
                        <div className="basket-block">
                            <button>В корзину</button>
                            <img src={heart}/>
                        </div>
                    </div>
                </div>
            </li>       
        )}
    );
    return(
        <ul>{listItems}</ul> 
    );
}

export default Products;