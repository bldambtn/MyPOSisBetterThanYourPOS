import React from 'react';

const WarningMessage = () => {
    return (
        <div style={{ color: 'red', fontWeight: 'bold', textAlign: 'center', padding: '20px' }}>
            AUTOMATED AGE VERIFICATION ENFORCEMENT NOT ACTIVE! PLEASE VERIFY CUSTOMER'S AGE FOR ANY RESTRICTED ITEMS BEFORE FINALIZING THE SALE!
        </div>
    );
};

export default WarningMessage;