import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';

const Modal = (props) => {
  const { setModal, setQuote, createQuote, quote, quoteErrors, categories } = props;
  function updateQuote(field, value) {
    let newQuote = quote;
    newQuote[field] = value;
    setQuote(newQuote);
  }
  return(
    <div className="modal is-active">
      <div className="modal-background"
        onClick={() => setModal(false)}
      />
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Новая цитата</p>
          <button
            onClick={() => setModal(false)}
            className="delete"
            aria-label="close"
          />
        </header>
        <section className="modal-card-body">

          {!_.isEmpty(quoteErrors) &&
            <article className="message is-danger">
              <div className="message-body">
                <ul className="list">
                  {quoteErrors.map((err, i) => {
                    return <li key={i}>{err}</li>
                  })}
                </ul>
              </div>
            </article>
          }
          <form>
            <div className="field">
              <label className="label">Автор</label>
              <div className="control">
                <input
                  onChange={(e) => {
                    updateQuote('author', e.target.value)
                  }}
                  className="input"
                  type="text"
                  value={quote.author}
                />
              </div>
            </div>

            <div className="field">
              <label className="label">Категория</label>
              <div className="control">
                <div className="select">
                  <select
                    placeholder="Категория"
                    value={quote.categoryId}
                    onChange={(e) => updateQuote('categoryId', _.toInteger(e.target.value))}
                  >
                    { categories.map((category) => {
                      return <option key={category.Id} value={category.Id}>{category.Title}</option>
                    })}
                  </select>
                </div>
              </div>
            </div>

            <div className="field">
              <label className="label">Цитата</label>
              <div className="control">
                <textarea
                  onChange={(e) => {
                    updateQuote('body', e.target.value)
                  }}
                  value={quote.body}
                  className="textarea"/>
              </div>
            </div>
          </form>

        </section>
        <footer className="modal-card-foot">
          <button onClick={createQuote} className="button is-primary" >Создать</button>
        </footer>
      </div>
    </div>
  )
};

Modal.propTypes = {
  setModal: PropTypes.func.isRequired,
  setQuote: PropTypes.func.isRequired,
  createQuote: PropTypes.func.isRequired,
  quoteErrors: PropTypes.arrayOf(PropTypes.string).isRequired,
  categories: PropTypes.array.isRequired,
  quote: PropTypes.shape({
    categoryId: PropTypes.number.isRequired,
    author: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired
  })
};

export default Modal;