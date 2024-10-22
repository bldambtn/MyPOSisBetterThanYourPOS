import React, { useState } from 'react';
import { useApolloClient } from '@apollo/client';
import { SEARCH_PRODUCT_QUERY } from '../utils/queries';

const EntryField = ({ onProductFound }) => {
    const [plu, setPlu] = useState('');
    const client = useApolloClient();

    const handleKeyPress = async (event) => {
        if (event.key === 'Enter') {
            try {
                // Check if the input ends with 'X'
                const quantityMatch = plu.match(/^(\d+)X$/);
                let quantity = 1; // Default quantity

                if (quantityMatch) {
                    quantity = parseInt(quantityMatch[1], 10); // Extract the quantity
                    const pluWithoutX = plu.slice(0, -1 * quantityMatch[0].length); // Get the PLU without 'X'
                    
                    const { data } = await client.query({
                        query: SEARCH_PRODUCT_QUERY,
                        variables: { plu: pluWithoutX },
                    });
                    
                    // Pass the found product and quantity to the parent component
                    onProductFound({ ...data.product, quantity });
                } else {
                    // If no 'X' is present, just search with the PLU
                    const { data } = await client.query({
                        query: SEARCH_PRODUCT_QUERY,
                        variables: { plu },
                    });
                    
                    // Pass the found product with default quantity
                    onProductFound({ ...data.product, quantity });
                }

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
            placeholder="Enter PLU (e.g., 2X for quantity 2)"
        />
    );
};

export default EntryField;