import { useContext, useEffect, useState, useCallback } from 'react';
import Title from '../components/Title';
import { ShopContext } from '../context/ShopContext';
import ProductItem from '../components/ProductItem';
import { assets } from '../assets/assets'

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const [sortType, setSortType] = useState('relevant');


  const toggleCategory = (e) => {
    const value = e.target.value;
    setCategory(prev => prev.includes(value) ? prev.filter(a => a !== value) : [...prev, value]);
  };

  const toggleSubCategory = (e) => {
    const value = e.target.value;
    setSubCategory(prev => prev.includes(value) ? prev.filter(a => a !== value) : [...prev, value]);
  };

  const applyFilter = useCallback(() => {
    if (!Array.isArray(products.data)) return;

    let filteredProducts = products.data;

    if (showSearch && search) {
      filteredProducts = filteredProducts.filter(item => item.name.toLowerCase().includes(search.toLowerCase()));
    }

    if (category.length > 0) {
      filteredProducts = filteredProducts.filter(item => category.includes(item.category));
    }

    if (subCategory.length > 0) {
      filteredProducts = filteredProducts.filter(item => subCategory.includes(item.subCategory));
    }

    setFilterProducts(filteredProducts);
  }, [products.data, search, showSearch, category, subCategory]);

  const sortProduct = useCallback(() => {
    let sortedProducts = [...filterProducts];

    switch (sortType) {
      case 'low-high':
        sortedProducts.sort((a, b) => a.price - b.price);
        break;
      case 'high-low':
        sortedProducts.sort((a, b) => b.price - a.price);
        break;
      default:
        applyFilter();
        return;
    }

    setFilterProducts(sortedProducts);
  }, [filterProducts, sortType, applyFilter]);

  useEffect(() => {
    applyFilter();
  }, [applyFilter]);

  useEffect(() => {
    sortProduct();
  }, [sortType, sortProduct]);

  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>

      {/* Filter Options */}
      <div className='min-w-60'>
        <p onClick={() => setShowFilter(!showFilter)} className='my-2 text-xl flex items-center cursor-pointer gap-2'>FILTERS<img className={`h-3 sm:hidden ${showFilter ? ' rotate-90' : ''}`} src={assets.dropdown_icon} alt="" /></p>

        {/* Category Filter */}
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>CATEGORIES</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2'><input className='w-3' value={"Men"} onChange={toggleCategory} type="checkbox" /> Men </p>
            <p className='flex gap-2'><input className='w-3' value={"Women"} onChange={toggleCategory} type="checkbox" /> Women </p>
            <p className='flex gap-2'><input className='w-3' value={"Kids"} onChange={toggleCategory} type="checkbox" /> Kids </p>
          </div>
        </div>

        {/* Sub Category Filter */}
        <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>TYPE</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2'><input className='w-3' value={"Topwear"} onChange={toggleSubCategory} type="checkbox" /> Topwear </p>
            <p className='flex gap-2'><input className='w-3' value={"Bottomwear"} onChange={toggleSubCategory} type="checkbox" /> Bottomwear </p>
            <p className='flex gap-2'><input className='w-3' value={"Winterwear"} onChange={toggleSubCategory} type="checkbox" /> Winterwear </p>
          </div>

        </div>
      </div>

      {/* Right Side */}
      <div className='flex-1'>

        <div className='flex justify-between text-base sm:text-2xl mb-4'>
          <Title text1={"ALL"} text2={"COLLECTIONS"} />

          {/* Product Sort */}
          <select onChange={(e) => setSortType(e.target.value)} className='border-2 border-gray-300 text-sm px-2' name="" id="">
            <option value="relavent">Sort by: Relavent</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>

        {/* Map Products */}
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
          {
            filterProducts.map((item, index) => (
              <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price} />
            ))
          }
        </div>
      </div>
    </div>
  );
}

export default Collection