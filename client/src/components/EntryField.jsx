import React, { useState } from 'react';
import { useApolloClient } from '@apollo/client';
import { SEARCH_PRODUCT_QUERY } from '../utils/queries';

const EntryField = ({ onProductFound, onRemoveLastItem }) => {
    const [plu, setPlu] = useState('');
    const client = useApolloClient();

    const handleKeyPress = async (event) => {
        if (event.key === 'Enter') {
            if (plu === '--') {
                // Call the function to remove the last item
                onRemoveLastItem();
                setPlu(''); // Clear the input field
                return;
            }

            try {
                // Check if the input matches the quantity format (e.g., 5*4046)
                const quantityMatch = plu.match(/^(\d+)\*(\d+)$/);
                let quantity = 1; // Default quantity
                let productPlu = plu; // Default PLU

                if (quantityMatch) {
                    quantity = parseInt(quantityMatch[1], 10); // Extract the quantity
                    productPlu = quantityMatch[2]; // Get the PLU without the quantity part
                }

                // Search for the product using the PLU
                const { data } = await client.query({
                    query: SEARCH_PRODUCT_QUERY,
                    variables: { plu: productPlu },
                });
                
                const productData = data.SearchProduct; // Get the product data
                
                // Ensure productName is a string and salePrice is a float
                const foundProduct = {
                    productName: String(productData.productName), // Ensure this is a string
                    salePrice: parseFloat(productData.salePrice), // Convert to float
                    quantity: quantity // Use the extracted quantity
                };

                // Pass the found product to the parent component
                onProductFound(foundProduct);

                // Clear the entry field
                setPlu('');
            } catch (error) {
                console.error("Error fetching product:", error);
            }
        }
    };

    return (
        <input
            type="text"
            value={plu}
            onChange={(e) => setPlu(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Enter PLU"
        />
    );
};

export default EntryField;