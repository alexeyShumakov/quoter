import React from 'react';
import PropTypes from 'prop-types';

import QuoteRead from './quoteRead';
import QuoteEdit from './quoteEdit';


class Quote extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isEdit: false};
    this.toggleEdit = this.toggleEdit.bind(this);
  }
  toggleEdit() {
    this.setState({isEdit: !this.state.isEdit});
  }
  render() {
    if(this.state.isEdit) {
      return <QuoteEdit {...this.props} toggleEdit={this.toggleEdit}/>
    } else {
      return <QuoteRead {...this.props} toggleEdit={this.toggleEdit}/>
    }

  }
}

Quote.propTypes = {
  fetchQuotes: PropTypes.func.isRequired,
  deleteQuote: PropTypes.func.isRequired,
  updateQuote: PropTypes.func.isRequired,
  categories: PropTypes.array.isRequired,
  quote: PropTypes.shape({
    id: PropTypes.number.isRequired,
    categoryId: PropTypes.number.isRequired,
    author: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired
  })
};

export default Quote;
