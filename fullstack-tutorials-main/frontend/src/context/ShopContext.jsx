import { createContext, useState, useEffect } from "react";
import PropTypes from 'prop-types';
import { useNavigate } from "react-router-dom";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
    const currency = '$';
    const delivery_fee = 10;
    const navigate = useNavigate();
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [cartItems] = useState({});

    // State for products, categories, and promotions (multiple data)
    const [products, setProducts] = useState([]);
    const [logoAndIcons, setLogoIcons] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch multiple APIs
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Call multiple APIs using Promise.all
                const [
                    productsResponse,
                    logoAndIconsResponse
                ] = await Promise.all([
                    fetch('http://localhost:3000/product/all'),
                    fetch('http://localhost:3000/product/all/logo-icon'),
                ]);

                // Check if responses are ok
                if (!productsResponse.ok || !logoAndIconsResponse.ok) {
                    throw new Error('Failed to fetch data');
                }

                // Parse the responses
                const productsData = await productsResponse.json();
                const logoIconsData = await logoAndIconsResponse.json();

                // Set the state with the data
                setProducts(productsData);
                setLogoIcons(logoIconsData);

                setLoading(false);
            } catch (error) {
                console.error('API Fetch Error:', error.message);
                setError(error.message);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Context value to be used across the application
    const value = {
        currency,
        delivery_fee,
        products,
        logoAndIcons,
        setLogoIcons,
        loading,
        error,
        navigate,
        search,
        setSearch,
        showSearch,
        setShowSearch,
        cartItems,
        getCartCount: () => { },
        getCartAmount: () => { },
    };

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    );
};

ShopContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default ShopContextProvider;
