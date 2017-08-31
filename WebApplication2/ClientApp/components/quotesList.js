import React from 'react';
import PropTypes from 'prop-types';

import Quote from './quote';

class QuotesList extends React.Component {
  constructor(props) {
    super(props);
    props.fetchQuotes();
  }
  render() {
    const { quotes, deleteQuote, updateQuote, categories, fetchQuotes } = this.props;
    return(
      <div>
        {
          quotes.map(quote => {
            return <Quote key={quote.id} {...{quote, deleteQuote, categories, updateQuote, fetchQuotes}}/>
          })
        }
      </div>
      )
  }
}

QuotesList.propTypes = {
  fetchQuotes: PropTypes.func.isRequired,
  deleteQuote: PropTypes.func.isRequired,
  updateQuote: PropTypes.func.isRequired,
  categories: PropTypes.array.isRequired,
  quotes: PropTypes.array.isRequired
};

export default  QuotesList;
