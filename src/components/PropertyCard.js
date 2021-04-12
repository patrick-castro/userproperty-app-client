import React from 'react';

const PropertyCard = ({ property }) => {
  return (
    <div className='column'>
      <div className='ui segment'>
        <div className='ui list'>
          <div className='item'>Street: {property.street}</div>
          <div className='item'>City: {property.city}</div>
          <div className='item'>State: {property.state}</div>
          <div className='item'>Zip: {property.zip}</div>
          <div className='item'>Rent: {`$${property.rent}`}</div>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
