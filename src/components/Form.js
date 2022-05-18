//import PropTypes from 'prop-types';

import React from "react";

class Form extends React.Component {
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
      onInputChange,
      onSaveButtonClick
    } = this.props
    return (
      <form>
        <label htmlFor='name-input'>
          Nome
          <input
            data-testid="name-input"
            type="text"
          />
        </label>
        <label htmlFor='description-input'>
          Descrição
          <input
            data-testid="description-input"
            type="textarea"
          />
        </label>
        <label htmlFor='attr1-input'>
          Atributo 1
          <input
            data-testid="attr1-input"
            type="number"
          />
        </label>
        <label>
          Atributo 2
          < input
            data-testid="attr2-input"
            type="number"
          />
        </label>
        <label>
          Atributo 3
          <input
            data-testid="attr3-input"
            type="number"
          />
        </label>
        <label>
          <input
            data-testid="image-input"
            type="number"
          />
        </label>
        <label>
          < select
            data-testid="rare-input" >
            <option>normal</option>
            <option>raro</option>
            <option>muito raro</option>
          </select>
        </label>
        <label htmlFor="trunfo-input">
          <input
            data-testid="trunfo-input"
            type="checkbox"
            id="trunfo-input"
          />
          Super Trybe Trunfo
        </label>
        <button
          data-testid="save-button"
          type="button"
          id="save-button"
        >
          Salvar
        </button>
      </form>
    );
  }
};
form.propTypes = {
  cardName,
  cardDescription,
  cardAttr1,
  cardAttr2,
  cardAttr3,
  cardImage,
  cardRare,
  cardTrunfo
  //hasTrunfo,
  //isSaveButtonDisabled,
  //onInputChange,
  //onSaveButtonClick
};

export default Form;
//corriginto espaçamento