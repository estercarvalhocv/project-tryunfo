import React from 'react';
import Form from './components/Form';
import Card from './components/Card';

class App extends React.Component {
  render() {
    return (
      <div>
        <h1>Adiciona nova carta</h1>
        <Form { ...this.state } onInputChange={ this.handleChange } />
        <Card { ...this.state } />
      </div>
    );
  }
}

export default App;
