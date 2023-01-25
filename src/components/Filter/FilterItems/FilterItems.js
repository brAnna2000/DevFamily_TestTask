import React from "react";
import './FilterItems.css';

function FilterItems(props){
    let filterItems = props.brands.map((brand) =>
        {   let title = brand.title.toLowerCase();
            let value = brand.value;
            return(
                <div key={value}>
                    <input onChange={props.onChange} type="checkbox" id={title} checked={props.filters[`${title}`]}/>
                    <label htmlFor={title}>{brand.title}</label>
                </div>  
            )
        }
    );
    return(
        <div className="brands">
            {filterItems}
        </div>   
    );
}

export default FilterItems;