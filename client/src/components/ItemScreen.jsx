const ItemScreen = () => {
    const [product, setProduct] = useState(null);
  
    const handleProductFound = (foundProduct) => {
      setProduct(foundProduct);
    };
  
    return (
      <div>
        <EntryField onProductFound={handleProductFound} />
        {product && (
          <div>
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
          </div>
        )}
      </div>
    );
  };