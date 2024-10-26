import React from "react";
import "../index.css";

import ActionButtons from "../components/ActionButtons";
import ItemScreen from "../components/ItemScreen";
import WarningMessage from "../components/WarningMessage";
import BackButton from "../components/BackButton";

const PointOfSale = () => {
  return (
    <div className="page-content pos">
      <div className="top-right-button">
        <BackButton to="/enterprise" />
      </div>
      <div className="warning-text">
        <WarningMessage />
      </div>
      <div className="sales-box">
        <h1 className="sold-items-header">Sold Items</h1>
        <div className="item-screen">
          <ItemScreen />
        </div>
      </div>
      <div className="action-buttons">
        <ActionButtons />
      </div>
    </div>
  );
};

export default PointOfSale;
