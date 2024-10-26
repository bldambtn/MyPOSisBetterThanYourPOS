import React from "react";
import { Link } from "react-router-dom";
import "../index.css";

import ActionButtons from "../components/ActionButtons";
// import EntryField from '../components/EntryField';
import ItemScreen from "../components/ItemScreen";
// import Totals from '../components/Totals';
import WarningMessage from "../components/WarningMessage";

const PointOfSale = () => {
  return (
    <div className="page-content pos">
      <div className="warning-text">
        <WarningMessage />
      </div>
      <div className="item-screen">
        <ItemScreen />
      </div>
      <div className="action-buttons">
        <ActionButtons />
      </div>
    </div>
  );
};

export default PointOfSale;
