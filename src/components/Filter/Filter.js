import React from "react";
import './Filter.css';
import FilterItems from "./FilterItems/FilterItems";

function Filter(props){ 
    return(
        <aside>
            <div className="filters-title">
                <p className="products-amount">Товаров {props.products}</p>
                <h1>Камеры</h1> 
            </div>
            <h3>Цена, ₽</h3>
            <div className="range">
                <input onChange={props.onChange} value={props.range.min} id="min"/>
                <input onChange={props.onChange} value={props.range.max}  id="max"/>
            </div>
            <h3>Бренд</h3>
            {props.brands.length && Object.keys(props.filters).length ? <FilterItems brands={props.brands} filters={props.filters} onChange={props.onChange}/> : null}
        </aside>
    );
}

export default Filter;