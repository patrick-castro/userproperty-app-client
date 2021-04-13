import React, { useState } from 'react';
import { useLazyQuery } from '@apollo/client';

// Local imports
import { QUERY_NAMES } from '../utils/graphql';

const SearchForm = ({ onSearchUsers }) => {
  const [searchString, setSearchString] = useState(''); // Stores the current value of the search string.
  const [showError, setShowError] = useState(false); // Tracks if there is a thrown error.
  const [closeDropDown, setCloseDropDown] = useState(false); // Monitors the result drop down in the search field.
  const [mouseHover, setMouseHover] = useState(false); // Tracks if the cursor is currently hovering in the drop down list.

  // Query to get the full names of users that matches the search string.
  const [getUserNames, { loading, data }] = useLazyQuery(QUERY_NAMES);

  // This gets triggered when the user pressed enter on the input field or when they hit the search button.
  const onSubmitForm = (e) => {
    e.preventDefault();

    if (searchString.length < 1) {
      return setShowError(true);
    }

    setShowError(false);
    onSearchUsers(searchString);
  };

  // This gets triggered on the keypress in the input field.
  const onChangeInputField = (searchValue) => {
    setSearchString(searchValue);
    if (searchValue.length > 1) {
      setCloseDropDown(false);
      setTimeout(
        getUserNames({ variables: { searchString: searchValue } }),
        700
      );
    }
  };

  // Store the selected name and searches it.
  const onSelectName = (fullName) => {
    setCloseDropDown(true);
    setSearchString(fullName);
    onSearchUsers(fullName);
  };

  // Generate a drop down that has the list of names of matched users.
  const renderMatchedNames = () => {
    if (!data) return null;
    if (searchString.length === 0) return null;

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

    if (loading) {
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
              onChange={(e) => onChangeInputField(e.target.value)}
            />
            <button className='ui button' type='submit'>
              <i className='search icon'></i>Search
            </button>
          </div>
          {data && !closeDropDown && renderMatchedNames()}
        </form>
      </div>

      {showError ? renderError() : ''}
    </>
  );
};

export default SearchForm;
