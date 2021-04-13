import React from 'react';
import { useLazyQuery } from '@apollo/client';

// Local imports
import UserPropertyList from '../components/UserPropertyList';
import SearchForm from '../components/SearchForm';
import { QUERY_USERS } from '../utils/graphql';

const IndexPage = () => {
  const [getUsers, { loading, error, data }] = useLazyQuery(QUERY_USERS);

  // Triggers an event to get the users with the same first name or last
  // name as the search string.
  const onSearchUsers = (searchString) => {
    getUsers({ variables: { searchString } });
  };

  return (
    <div>
      <SearchForm onSearchUsers={onSearchUsers} />

      {/* Render function is called */}
      {renderUserPropertyList(loading, error, data)}
    </div>
  );
};

// Displays the user property list if there is data that matches the search string.
const renderUserPropertyList = (loading, error, data) => {
  const errorStyle = { color: '#9f3a38' };

  // Loading and error handling
  if (loading) {
    return (
      <div>
        <div className='ui massive active loader'></div>
      </div>
    );
  }

  if (error && error.toString().includes('SyntaxError'))
    return (
      <h4 style={errorStyle}>Error! Please remove any special character/s!</h4>
    );
  if (error) return <h4 style={errorStyle}>{`Error! ${error}`}</h4>;

  // Executes if the data is already loaded
  if (data) {
    if (data.users.length < 1) return <h3>No data available!</h3>;
    return <UserPropertyList users={data.users} />;
  }
};

export default IndexPage;
