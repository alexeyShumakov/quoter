import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';

const Search = (props) => {
  const fetchQuotes = _.debounce(props.fetchQuotes, 200);
  function setName(e) {
    props.setAuthorName(e.target.value);
    fetchQuotes();
  }
  return(
    <div className="field">
      <p className="control has-icons-left">
        <input
          value={props.authorName}
          onChange={setName}
          className="input"
          type="text"
          placeholder="Автор"
        />
        <span className="icon is-small is-left">
          <i className="fa fa-user"/>
        </span>
      </p>
    </div>
  )
};

Search.propTypes = {
  fetchQuotes: PropTypes.func.isRequired,
  setAuthorName: PropTypes.func.isRequired,
  authorName: PropTypes.string.isRequired
};

export default Search;