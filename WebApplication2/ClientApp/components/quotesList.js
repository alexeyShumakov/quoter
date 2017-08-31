import React from 'react';
import PropTypes from 'prop-types';

import Quote from './quote';

class QuotesList extends React.Component {
  constructor(props) {
    super(props);
    props.fetchQuotes();
  }
  render() {
    const { quotes, deleteQuote, updateQuote, categories, fetchQuotes, isLoading } = this.props;
    return(
      <div style={{position: 'relative'}}>
        { isLoading &&
          <div className="is-primary is-overlay" style={{backgroundColor: 'white', opacity: 0.7}}/>
        }
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
  quotes: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired
};

export default  QuotesList;
