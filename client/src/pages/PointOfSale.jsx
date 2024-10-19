import React from 'react';
import { Link } from 'react-router-dom';

import ActionButtons from '../components/ActionButtons';
import EntryField from '../components/EntryField';
import ItemScreen from '../components/ItemScreen';
import Totals from '../components/Totals';
import WarningMessage from '../components/WarningMessage';

const PointOfSale = () {
    return (
        <div className="pos">
            <div className="warning-text">
                <WarningMessage />
            </div>
            <ItemScreen />
            <Totals />
            <ActionButtons />
            <EntryField />
        </div>
    );
};