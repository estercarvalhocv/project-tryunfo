import React from 'react';
import Card from './components/Card';
import Form from './components/Form';

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
    hasTrunfo: false,
    isSaveButtonDisabled: true,
    exibitionDeck: [],
  };

  // req5 btnV até refatoração no handleChage, desconstructuring no state+if com o que pede no req para ativar o botão ao preencher os campos
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
  };

  // req 7 - ativar super trunfo
  superT = () => {
    /* const supT = cardTrunfo.checked === true ? hasTrunfo :  */
    const { cardTrunfo } = this.state;
    if (cardTrunfo === true) {
      this.setState({ hasTrunfo: true });
    }
  }

  // req 6 - ativar botão
  onSaveButtonClick = () => {
    this.superT();
    this.setState((prevState) => ({
      exibitionDeck: [...prevState.exibitionDeck, prevState],
      cardName: '',
      cardDescription: '',
      cardAttr1: '0',
      cardAttr2: '0',
      cardAttr3: '0',
      cardImage: '',
      cardRare: 'normal',
      cardTrunfo: false,
    }));
  }

  render() {
    const { exibitionDeck } = this.state;
    return (
      <div>
        <h1>Adicionar nova carta</h1>
        <Form
          { ...this.state }
          onInputChange={ this.handleChange }
          onSaveButtonClick={ this.onSaveButtonClick }
        />
        <Card { ...this.state } />
        <div>
          { exibitionDeck.map((deck, index) => (
            <div key={ `${deck.cardName} ${index}` }>
              <Card
                cardName={ deck.cardName }
                cardDescription={ deck.cardDescription }
                cardAttr1={ deck.cardAttr1 }
                cardAttr2={ deck.cardAttr2 }
                cardAttr3={ deck.cardAttr3 }
                cardImage={ deck.cardImage }
                cardRare={ deck.cardRare }
                cardTrunfo={ deck.cardTrunfo }
              />
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default App;
