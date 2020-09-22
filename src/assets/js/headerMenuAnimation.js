// JS Document
import $ from 'jquery';

export default () => {
  $('#dashboardMenuToggle')
    .click(() => $('#userSide')
      .toggle());

  $(window)
    .resize(() => ($(window).innerWidth() >= 768 ? $('#userSide').show() : ''));
};
