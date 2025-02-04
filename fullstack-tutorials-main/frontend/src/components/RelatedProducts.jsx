import { useContext, useEffect, useState } from 'react';
import Title from './Title';
import { ShopContext } from '../context/ShopContext';
import ProductItem from './ProductItem';

const RelatedProducts = ({ category, subCategory }) => {
    const [related, setRelated] = useState([]);
    const { products } = useContext(ShopContext);
    

    useEffect(() => {
        if (Array.isArray(products) && products.length > 0 && category && subCategory) {
            const filteredProducts = products.data.filter(item =>
                item.category === category && item.subCategory === subCategory
            );
            setRelated(filteredProducts.slice(0, 5));
        }
    }, [products, category, subCategory]);

    return (
        <div className='my-24'>
            <div className='text-center text-3xl py-2'>
                <Title text1={"RELATED"} text2={"PRODUCTS"} />
            </div>
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
                {related.map((item) => (
                    <ProductItem key={item._id} id={item._id} image={item.image} name={item.name} price={item.price} />
                ))}
            </div>
        </div>
    );
};

export default RelatedProducts;
