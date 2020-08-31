import $ from 'jquery';

const searchAnimate = () => (document.querySelector('#showSearchBar') === null
  ? ''
  : document.querySelector('#showSearchBar').addEventListener('click', () => {
    $('#searchDropDown').hide();

    document.querySelector('.search-bar').classList.toggle('invisible');
  }));

export default searchAnimate;
