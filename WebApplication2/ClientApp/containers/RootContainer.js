import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as appActions from '../actions';
import Header from '../components/header';
import Sidebar from '../components/sidebar';
import QuotesList from '../components/quotesList';
import Search from '../components/search';
import Modal from '../components/modal';


const App =  (props) => {
  const { store, actions } = props;
  const { authorName, quotes, categories, categoryId, isOpenModal, quote, quoteErrors } = store;
  const { setAuthorName, fetchQuotes, setCategory, updateQuote,
          setModal, setQuote, createQuote, deleteQuote } = actions;
    return (
      <div>
        {isOpenModal && <Modal {...{setModal, categories, setQuote, createQuote, quote, quoteErrors}}/>}
        <Header/>
          <div className="section">
            <div className="container">
              <div className="columns">
                <div className="column is-2">
                  <Sidebar {...{categories, fetchQuotes, setCategory, categoryId, setModal}} />
                </div>
                <div className="column">
                  <Search {...{authorName, setAuthorName, fetchQuotes}}/>
                  <hr/>
                  <QuotesList {...{quotes, fetchQuotes, deleteQuote, categories, updateQuote}}/>
                </div>
              </div>
            </div>
          </div>
        </div>
    );
};

const mapStateToProps = (state) => ({ store: state });
const mapDispatchToProps = (dispatch) => ({ actions: bindActionCreators(appActions, dispatch)});

export  default connect(mapStateToProps, mapDispatchToProps)(App);

