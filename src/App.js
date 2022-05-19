import React from 'react';
import Form from './components/Form';
import Card from './components/Card';

class App extends React.Component {
  state = {
    cardName: '',
    cardDescription: '',
    cardAttr1: '',
    cardAttr2: '',
    cardAttr3: '',
    cardImage: '',
    cardRare: '',
    cardTrunfo: false,
    isSaveButtonDisabled: true,
  };

  btnValidation = () => {
    const sumMax = 210;
    const maxAttr = 90;
    const {
      cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
    } = this.state;

    if (cardName && cardImage && cardDescription
      && Number(cardAttr1) + Number(cardAttr2) + Number(cardAttr3) <= sumMax
      && cardAttr1 <= maxAttr && cardAttr1 >= 0 && cardAttr2 <= maxAttr
      && cardAttr2 >= 0 && cardAttr3 <= maxAttr && cardAttr3 >= 0) {
      this.setState({ isSaveButtonDisabled: false });
    } else {
      this.setState({ isSaveButtonDisabled: true });
    }
  }

  handleChange= ({ target }) => {
    const { id } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({ [id]: value }, this.btnValidation);
  }

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
