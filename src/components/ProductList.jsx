import { Spinner } from 'keep-react';
import { useEffect, useRef, useState } from 'react';
import Product from './Product';
const PRODUCT_PER_PAGE = 10;

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(0);
    const loadMoreRef = useRef();
    useEffect(() => {
        const fetchProducts = async () => {
            const response = await fetch(
                `https://dummyjson.com/products?limit=${PRODUCT_PER_PAGE}&skip=${
                    page * PRODUCT_PER_PAGE
                }`
            );
            const data = await response.json();
            if (data.products.length === 0) {
                setHasMore(false);
            } else {
                setProducts((prev) => [...prev, ...data.products]);
                setPage((prev) => prev + 1);
            }
        };

        const onIntersection = (entries) => {
            const currentObserver = entries[0];
            if (currentObserver.isIntersecting && hasMore) {
                fetchProducts();
            }
        };
        const observer = new IntersectionObserver(onIntersection);

        if (observer && loadMoreRef.current) {
            observer.observe(loadMoreRef.current);
        }
        return () => {
            if (observer) observer.disconnect();
        };
    }, [page, hasMore]);
    return (
        <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5 p-5 pb-0">
                {products.map((product) => (
                    <Product
                        key={product.id}
                        price={product.price}
                        thumbnail={product.thumbnail}
                        title={product.title}
                        description={product.description}
                        brand={product.brand}
                    />
                ))}
            </div>
            {hasMore && (
                <div className="flex justify-center pb-5" ref={loadMoreRef}>
                    <Spinner color="info" size="xl" />
                </div>
            )}
        </div>
    );
};

export default ProductList;
