import React, { useEffect, useState } from "react";
import Filter from "../Filter/Filter";
import Products from "../Products/Products";
import './Container.css';

function Container(){
    const [items, setItems] = useState(0);
    const [range, setRange] = useState({min:0, max: 0});
    const [filters, setFilters] = useState({});
    const [listItems, setListItems] = useState([]);
    const [defImg, setDefImg] = useState('');
    const [brands, setBrands] = useState([]);
    
    useEffect(()=>{
        fetch("https://getlens-master.s.dev.family/api/pages/obektivy")
        .then(response => response.json())
        .then(response => {
            console.log(response);
            let products = response.products.filter(product => product.in_stock);
            setItems(products.length);
            setDefImg(response.products[0].image.desktop.x1);

            let copyOfRange = {...range};
            copyOfRange.min = response.filters[0].min;
            copyOfRange.max = response.filters[0].max;
            setRange(copyOfRange);

            let copyOfFilters = {...filters};
            let brands = response.filters[3].items.filter(brand => brand.title !== '1' && brand.main === true);
            setBrands(brands)

            brands.forEach(function(item) {
                copyOfFilters[item.title.toLowerCase()] = false;
            });
            setFilters(copyOfFilters);  
            return setListItems(products);
        })
        .catch(err => { 
            console.log(err); 
        });    
    },[]);

    useEffect(()=>{     
        let brandsList = [];
        let link = `https://getlens-master.s.dev.family/api/pages/obektivy?price[min]=${range.min}&price[max]=${range.max}`;
        let copyOfFilters = {...filters};
        let copyOfBrands = brands;

        Object.entries(copyOfFilters).forEach(([key], index) => {
            if(copyOfFilters[key] === true){
                brandsList.push(copyOfBrands[index].value)
            }
        });

        if(brandsList.length){
            let arr = '';
            brandsList.forEach(function(item) {
                arr ? arr = arr + `&brands[]=${item}` : arr = arr + `brands[]=${item}`
            });
            link = `https://getlens-master.s.dev.family/api/pages/obektivy?${arr}&price[min]=${range.min}&price[max]=${range.max}`;
        }

        fetch(link)
        .then(response => response.json())
        .then(response =>{
            let products = response.products.filter(product => product.in_stock);
            setItems(products.length);
            return setListItems(products);
        })
        .catch(err => { 
            console.log(err); 
        }); 
    },[range, filters]);

    const onChange = (e) => {
        let id = e.target.id;
        if(id === "min" || id === "max"){
            let copyOfRange = {...range};
            copyOfRange[id] = e.target.value;
            return setRange(copyOfRange);
        }else{ 
            let copyOfFilters = {...filters};
            copyOfFilters[id] = !copyOfFilters[id];
            return setFilters(copyOfFilters);
        }
    };
    return(
        <div className="container">
            <Filter brands={brands} filters={filters} products={items} range={range} onChange={onChange}/>
            {listItems.length ? <Products products={listItems} defImg={defImg}/> : <div className="empty">Продуктов нет</div>}
        </div>
    );
}

export default Container;