import React, { useState } from 'react';
import { useApolloClient } from '@apollo/client';
import { SEARCH_PRODUCT_QUERY } from '../utils/queries';

// Use "*" for quantity entries, for example "2*4046" and hitting the ENTER key will ring up 2 Sm Avocados
// Use "-" then the ENTER key to void the most recent item
// use "---" and the ENTER key to void the entire transaction
// use "+" and the ENTER key to add to the quantity of the most recently rung up item.

const EntryField = ({ onProductFound }) => {
    const [plu, setPlu] = useState('');
    const client = useApolloClient();

    const handleKeyPress = async (event) => {
        if (event.key === 'Enter') {
            try {
                // Check if the input ends with '*'
                const quantityMatch = plu.match(/^(\d+)\*$/);
                let quantity = 1; // Default quantity

                if (quantityMatch) {
                    quantity = parseInt(quantityMatch[1], 10); // Extract the quantity
                    const pluWithoutAsterisk = plu.slice(0, -1 * quantityMatch[0].length); // Get the PLU without '*'
                    
                    const { data } = await client.query({
                        query: SEARCH_PRODUCT_QUERY,
                        variables: { plu: pluWithoutAsterisk },
                    });
                    
                    // Pass the found product and quantity to the parent component
                    onProductFound({ ...data.product, quantity });
                } else {
                    // If no '*' is present, just search with the PLU
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
            placeholder="Enter PLU (e.g., 2* for quantity 2)"
        />
    );
};

export default EntryField;