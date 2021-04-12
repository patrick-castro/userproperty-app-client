import React from 'react';

// Local imports
import PropertyCard from './PropertyCard';

const PropertyList = ({ users }) => {
  return <>{renderUserData(users)}</>;
};

const renderUserData = (users) => {
  // Loops through all users that matches the query string.
  return users.map((user) => {
    return (
      <div key={user.id} style={{ marginTop: '25px' }}>
        <div className='ui segment'>
          <h2 className='ui header'>
            {`${user.firstName} ${user.lastName}`}
            <div className='sub header'>
              {user.properties.length === 1 ? 'Property' : 'Properties'}
            </div>
          </h2>
          <div className='ui three column grid'>
            {/* Loops through all property/ies that belongs to the users. */}
            {renderProperties(user.properties)}
          </div>
        </div>
      </div>
    );
  });
};

const renderProperties = (properties) => {
  // Checks if the user has any property.
  if (properties.length < 1) {
    return (
      <h2 style={{ marginTop: '15px', marginBottom: '15px' }}>
        No property data!
      </h2>
    );
  }

  return properties.map((property) => (
    // Render a PropertyCard that contains the details in a property
    <PropertyCard key={property.id} property={property} />
  ));
};

export default PropertyList;
