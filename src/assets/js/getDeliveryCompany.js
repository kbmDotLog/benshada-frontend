/* eslint-disable no-underscore-dangle */
export default (reduxUser, reduxDeliveryCompany) => {
  const { _id, email } = reduxUser.selected;

  return (reduxDeliveryCompany.all || []).filter(
    ({ contactPerson }) => contactPerson._id === _id && contactPerson.email === email
  )[0];
};
