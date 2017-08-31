import React from 'react';
import PropTypes from 'prop-types';

const Sidebar = props => {
  function handleClickCategory(id) {
    props.setCategory(id);
    props.fetchQuotes();
  }
  return(
    <aside className="menu">
      <p className="menu-label">Категории</p>
      <ul className="menu-list">
        {
          props.categories.map((category) => {
            return(
              <li
                onClick={()=>{handleClickCategory(category.Id)}}
                key={category.Id}
              >
                <a
                className={category.Id === props.categoryId ? 'is-active' : ''}
                >{category.Title}</a>
              </li>
            )
          })
        }
      </ul>
      <hr/>
      <button
        onClick={() => {props.setModal(true)}}
        className="button is-primary is-fullwidth"
      >Создать цитатау</button>
    </aside>
  )
};

Sidebar.propTypes = {
  setModal: PropTypes.func.isRequired,
  setCategory: PropTypes.func.isRequired,
  fetchQuotes: PropTypes.func.isRequired,
  categories: PropTypes.array.isRequired
};
export default Sidebar;
