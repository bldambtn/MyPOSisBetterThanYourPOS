import React, { useState } from 'react';
import { useApolloClient, gql } from '@apollo/client';
import { SEARCH_PRODUCT_QUERY } from '../utils/queries';

const EntryField = ({ onProductFound }) => {
    const [plu, setPlu] = useState('');
    const client = useApolloClient();

    const handleKeyPress = async (event) => {
        if (event.key === 'Enter') {
            try {
                const { data } = await client.query({
                    query: SEARCH_PRODUCT_QUERY,
                    variables: { plu },
                });
                // Pass the found product to the parent component
                onProductFound(data.product);
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