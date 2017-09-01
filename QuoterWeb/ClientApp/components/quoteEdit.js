import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

class QuoteEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {quote: Object.assign({}, props.quote)};
    this.updateQuote = this.updateQuote.bind(this);
  }

  updateQuote(field, value) {
    let newQuote = this.state.quote;
    newQuote[field] = value;
    this.setState({quote: newQuote});
  }

  render() {
    const { quote } = this.state;
    return(
      <div className="media box">
        <div className="media-content">
          <div className="content">
            <form>
              <div className="field">
                <label className="label">Автор</label>
                <div className="control">
                  <input
                    className="input is-small"
                    type="text"
                    onChange={(e) => { this.updateQuote('author', e.target.value) }}
                    value={quote.author}
                  />
                </div>
              </div>

              <div className="field">
                <label className="label">Категория</label>
                <div className="control">
                  <div className="select is-small">
                    <select
                      placeholder="Категория"
                      value={quote.categoryId}
                      onChange={(e) => this.updateQuote('categoryId',  _.toInteger(e.target.value))}
                    >
                      { this.props.categories.map((category) => {
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
                    onChange={(e) => { this.updateQuote('body', e.target.value) }}
                    value={quote.body}
                    className="textarea"
                  />
                </div>
              </div>
              <div className="field is-grouped is-grouped-multiline">
                <div className="control"> <a
                  onClick={() => this.props.updateQuote(quote).then(() => {
                    this.props.toggleEdit();
                    this.props.fetchQuotes();
                  })}
                  className="button is-success"
                >Изменить</a> </div>
                <div className="control">
                  <a onClick={this.props.toggleEdit} className="button">Отмена</a>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

QuoteEdit.propTypes = {
  fetchQuotes: PropTypes.func.isRequired,
  updateQuote: PropTypes.func.isRequired,
  toggleEdit: PropTypes.func.isRequired,
  categories: PropTypes.array.isRequired,
  quote: PropTypes.shape({
    id: PropTypes.number.isRequired,
    categoryId: PropTypes.number.isRequired,
    author: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired
  })
};

export default QuoteEdit;