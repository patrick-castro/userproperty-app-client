import React from 'react';

// Local imports
import IndexPage from './pages/IndexPage';

class App extends React.Component {
  render() {
    return (
      <div className='ui container' style={{ paddingBottom: '50px' }}>
        <IndexPage />
      </div>
    );
  }
}

export default App;
