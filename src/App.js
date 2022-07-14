import React from 'react';
import Card from './components/Card';
import Form from './components/Form';
import './styles/App.css';

class App extends React.Component {
  state = {
    cardName: '',
    cardDescription: '',
    cardAttr1: '',
    cardAttr2: '',
    cardAttr3: '',
    cardImage: '',
    cardRare: 'normal',
    cardTrunfo: false,
    hasTrunfo: false,
    isSaveButtonDisabled: true,
    baralho: [],
    filtercardName: '',
    filtercardRare: 'todas',
    filtercardTrunfo: false,
  }

  onInputChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]: value,
    }, this.habilitaSalvar);
  };

  mudaHasTrunfo = () => {
    const { cardTrunfo } = this.state;
    if (cardTrunfo) {
      this.setState({ hasTrunfo: true });
    }
  }

  habilitaSalvar = () => {
    const {
      cardName,
      cardDescription,
      cardImage,
      cardRare,
      cardAttr1,
      cardAttr2,
      cardAttr3,
    } = this.state;

    const limiteAttr = 90;
    const limiteAttrSoma = 210;
    const somaAttr = Number(cardAttr1) + Number(cardAttr2) + Number(cardAttr3);

    if (cardName && cardDescription && cardImage && cardRare
      && somaAttr <= limiteAttrSoma
      && cardAttr1 >= 0 && cardAttr1 <= limiteAttr
      && cardAttr2 >= 0 && cardAttr2 <= limiteAttr
      && cardAttr3 >= 0 && cardAttr3 <= limiteAttr) {
      this.setState({ isSaveButtonDisabled: false });
    } else {
      this.setState({ isSaveButtonDisabled: true });
    }
  }

    onSaveButtonClick = () => {
      this.mudaHasTrunfo();
      const {
        cardName,
        cardDescription,
        cardAttr1,
        cardAttr2,
        cardAttr3,
        cardImage,
        cardRare,
        cardTrunfo,
        baralho,
      } = this.state;

      const novaCarta = {
        cardName,
        cardDescription,
        cardAttr1,
        cardAttr2,
        cardAttr3,
        cardImage,
        cardRare,
        cardTrunfo,
      };

      const baralhoAntigo = baralho;
      baralhoAntigo.push(novaCarta);

      this.setState({
        cardName: '',
        cardDescription: '',
        cardAttr1: '0',
        cardAttr2: '0',
        cardAttr3: '0',
        cardImage: '',
        cardRare: 'normal',
        cardTrunfo: false,
        isSaveButtonDisabled: true,
        baralho: baralhoAntigo,
      });
    }

    excluiCarta = (cardName, cardTrunfo) => {
      const { baralho } = this.state;
      let hasTrunfo = true;
      if (cardTrunfo) hasTrunfo = false;
      const novoBaralho = baralho.filter((carta) => carta.cardName !== cardName);
      this.setState({
        baralho: novoBaralho,
        hasTrunfo,
      });
    }

    render() {
      const {
        cardName,
        cardDescription,
        cardAttr1,
        cardAttr2,
        cardAttr3,
        cardImage,
        cardRare,
        cardTrunfo,
        hasTrunfo,
        isSaveButtonDisabled,
        baralho,
        filtercardName,
        filtercardRare,
        filtercardTrunfo,
      } = this.state;
      return (
        <div>
          <h1>Tryunfo</h1>
          <div className="container-form-card">
            <Form
              cardName={ cardName }
              cardDescription={ cardDescription }
              cardAttr1={ cardAttr1 }
              cardAttr2={ cardAttr2 }
              cardAttr3={ cardAttr3 }
              cardImage={ cardImage }
              cardRare={ cardRare }
              cardTrunfo={ cardTrunfo }
              hasTrunfo={ hasTrunfo }
              isSaveButtonDisabled={ isSaveButtonDisabled }
              onInputChange={ this.onInputChange }
              onSaveButtonClick={ this.onSaveButtonClick }
            />
            <Card
              cardName={ cardName }
              cardDescription={ cardDescription }
              cardAttr1={ cardAttr1 }
              cardAttr2={ cardAttr2 }
              cardAttr3={ cardAttr3 }
              cardImage={ cardImage }
              cardRare={ cardRare }
              cardTrunfo={ cardTrunfo }
            />
          </div>

          <div className="titulo-baralho">
            <p>Meu baralho</p>

            <label htmlFor="busca">
              Filtros de busca
              <input
                type="text"
                data-testid="name-filter"
                id="busca"
                onChange={ this.onInputChange }
                placeholder="Nome da carta"
                name="filtercardName"
                disabled={ filtercardTrunfo }
              />
            </label>

            <label htmlFor="raridade">
              Raridade
              <select
                id="raridade"
                data-testid="rare-filter"
                name="filtercardRare"
                value={ filtercardRare }
                onChange={ this.onInputChange }
                disabled={ filtercardTrunfo }
              >
                <option value="todas">todas</option>
                <option value="normal">normal</option>
                <option value="raro">raro</option>
                <option value="muito raro">muito raro</option>
              </select>
            </label>

            <label htmlFor="filtro-checkbox">
              Super Trunfo
              <input
                type="checkbox"
                id="filtro-checkbox"
                data-testid="trunfo-filter"
                name="filtercardTrunfo"
                checked={ filtercardTrunfo }
                onChange={ this.onInputChange }
              />
            </label>

          </div>

          <div className="baralho">
            {baralho.length > 0
          && baralho.filter((filNome) => filNome.cardName.includes(filtercardName))
            .filter((filRaridade) => (filtercardRare === 'todas'
              ? true : filRaridade.cardRare === filtercardRare))
            .filter((filTrunfo) => (!filtercardTrunfo
              ? true : filTrunfo.cardTrunfo === true))
            .map((carta, index) => (
              <div className="carta-baralho" key={ `${carta.cardName}${index}` }>
                <Card
                  cardName={ carta.cardName }
                  cardDescription={ carta.cardDescription }
                  cardAttr1={ carta.cardAttr1 }
                  cardAttr2={ carta.cardAttr2 }
                  cardAttr3={ carta.cardAttr3 }
                  cardImage={ carta.cardImage }
                  cardRare={ carta.cardRare }
                  cardTrunfo={ carta.cardTrunfo }
                />
                <button
                  type="button"
                  data-testid="delete-button"
                  onClick={
                    () => this.excluiCarta(carta.cardName, carta.cardTrunfo)
                  }
                >
                  Excluir
                </button>
              </div>
            ))}
          </div>
        </div>
      );
    }
}

export default App;
