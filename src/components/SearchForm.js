import React, { useState } from 'react';

const SearchForm = ({ onSearchUsers }) => {
  const [searchString, setSearchString] = useState(''); // Stores the current value of the search string
  const [showError, setShowError] = useState(false);

  const onSubmitForm = (e) => {
    e.preventDefault();

    if (searchString.length < 1) {
      return setShowError(true);
    }

    setShowError(false);
    onSearchUsers(searchString);
  };

  const onChangeInputField = (searchValue) => {
    setSearchString(searchValue);
  };

  const renderError = () => {
    return (
      <div>
        <h3 style={{ color: '#9f3a38' }}>Please type in a name of a user!</h3>
      </div>
    );
  };

  // const classString = () => {
  //   if(error) return ui huge fluid action input
  // }

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
              onChange={(e) => onChangeInputField(e.target.value)}
            />
            <button className='ui button' type='submit'>
              <i className='search icon'></i>Search
            </button>
          </div>
        </form>
      </div>
      {showError ? renderError() : ''}
    </>
  );
};

export default SearchForm;
