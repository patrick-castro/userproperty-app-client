import React, { useState, useEffect } from 'react';
import { useLazyQuery } from '@apollo/client';

// Local imports
import { QUERY_NAMES } from '../utils/graphql';

const SearchForm = ({ onSearchUsers }) => {
  const [searchString, setSearchString] = useState(''); // Stores the current value of the search string.
  const [showError, setShowError] = useState(false); // Tracks if there is a thrown error.
  const [closeDropDown, setCloseDropDown] = useState(false); // Monitors the result drop down in the search field.
  const [mouseHover, setMouseHover] = useState(false); // Tracks if the cursor is currently hovering in the drop down list.
  const [isLoading, setIsLoading] = useState(false); // Custom loader to track the keypress

  // Query to get the full names of users that matches the search string.
  const [getUserNames, { loading, data }] = useLazyQuery(QUERY_NAMES);

  useEffect(() => {
    if (searchString.length > 1) {
      setIsLoading(true);
      // This will only be triggered when the user typed in a string with more than one characters.
      // There is a 0.5s delay to execute the getUserNames method so that it won't be fired every keypress.
      const timeOutId = setTimeout(() => {
        setIsLoading(false);
        getUserNames({ variables: { searchString } });
      }, 500);
      return () => clearTimeout(timeOutId);
    }
  }, [searchString]);

  // This gets triggered when the user pressed enter on the input field or when they hit the search button.
  const onSubmitForm = (e) => {
    e.preventDefault();

    if (searchString.length < 1) {
      return setShowError(true);
    }

    setShowError(false);
    onSearchUsers(searchString);
  };

  // Store the selected name and searches it.
  const onSelectName = (fullName) => {
    setCloseDropDown(true);
    setSearchString(fullName);
    onSearchUsers(fullName);
  };

  const renderLoading = () => {
    // Prompts users if the query is still loading
    if (searchString.length > 0) {
      return (
        <div
          className='ui segments'
          style={{
            position: 'absolute',
            zIndex: '1',
            minWidth: '50%',
          }}>
          <div className='ui segment'>
            <p>Loading...</p>
          </div>
        </div>
      );
    }
  };

  // Generate a drop down that has the list of names of matched users.
  const renderMatchedNames = () => {
    if (searchString.length < 1) return null;

    // Prompts users if there is no result for the query.
    if (data.users.length < 1) {
      return (
        <div
          className='ui segments'
          style={{
            position: 'absolute',
            zIndex: '1',
            minWidth: '50%',
          }}>
          <div className='ui segment'>
            <p>Nothing found!</p>
          </div>
        </div>
      );
    }

    return (
      <div
        className='ui segments'
        style={{
          position: 'absolute',
          zIndex: '1',
          minWidth: '50%',
        }}>
        {data.users.map((user) => (
          <div
            className='ui segment'
            key={user.id}
            onClick={() => onSelectName(user.fullName)}
            onMouseEnter={() => setMouseHover(true)}
            onMouseLeave={() => setMouseHover(false)}
            style={{ cursor: mouseHover ? 'pointer' : null }}>
            <p>{user.fullName}</p>
          </div>
        ))}
      </div>
    );
  };

  const renderError = () => {
    return (
      <div>
        <h3 style={{ color: '#9f3a38' }}>Please type in a name of a user!</h3>
      </div>
    );
  };

  return (
    <>
      <div className='ui segment' style={{ padding: '20px' }}>
        <form onSubmit={(e) => onSubmitForm(e)}>
          <div
            className={`ui huge fluid action input ${
              showError ? 'error' : ''
            }`}>
            <input
              type='text'
              placeholder='Search users...'
              value={searchString}
              onChange={(e) => setSearchString(e.target.value)}
            />
            <button className='ui button' type='submit'>
              <i className='search icon'></i>Search
            </button>
          </div>
          {(loading || isLoading) && renderLoading()}
          {data && !closeDropDown && renderMatchedNames()}
        </form>
      </div>

      {showError ? renderError() : ''}
    </>
  );
};

export default SearchForm;
