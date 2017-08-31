import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';

const QuoteRead =  props => {
  const {quote, toggleEdit, deleteQuote} = props;
  const {author, body, createdAt, id} = quote;
  return(
    <div className="media">
      <div className="media-content">
        <div className="content">
          <div>
            <strong>{author}</strong>
            <small> {moment(createdAt).format("dddd, MMMM Do YYYY")}</small>
            <br/>
            <div className="quote-body">{body}</div>
          </div>
        </div>
      </div>
      <div className="media-right">
        <div className="level-right">
          <a className="level-item">
            <span
              onClick={toggleEdit}
              className="icon is-small"
            ><i className="fa fa-pencil"/></span>
          </a>
          <a className="level-item">
            <span
              onClick={() => deleteQuote(id)}
              className="icon is-small"><i className="fa fa-remove"/></span>
          </a>
        </div>
      </div>
    </div>
  )
};

QuoteRead.propTypes = {
  toggleEdit: PropTypes.func.isRequired,
  deleteQuote: PropTypes.func.isRequired,
  quote: PropTypes.shape({
    id: PropTypes.number.isRequired,
    author: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired
  })
};

export default QuoteRead;
