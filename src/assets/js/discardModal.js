import $ from 'jquery';

export default () => {
  setTimeout(() => {
    $('.modal-backdrop').remove();
    $('body#body').removeClass('modal-open');
  }, 1000);
};
