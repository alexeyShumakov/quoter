let categories = document.querySelector('#store-data');
categories = categories ? categories.dataset.categories : "[]";
categories = JSON.parse(categories);

const categoryId = categories[0] ? categories[0]['Id'] : 0;

export default  {
  quote: {
    body: '',
    author: '',
    categoryId
  },
  isLoading: true,
  quoteErrors: [],
  isOpenModal: false,
  authorName: '',
  quotes: [],
  categories
};
