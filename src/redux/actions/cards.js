import { userUpdate } from './users.js';

export const cardsOneSelected = (payload) => ({
  type: 'CARDS_ONE_SELECTED',
  payload
});

export const cardUpdate = (user, cardData) => {
  const email = user && user.email;
  const cards = (user && user.cards) || [];

  const newCards = cards.filter(({ number }) => number !== cardData.number);

  return userUpdate(email, { cards: [...newCards, cardData] });
};

export const cardAdd = (user, cardData) => {
  const email = user && user.email;
  const cards = (user && user.cards) || [];

  return userUpdate(email, { cards: [...cards, cardData] });
};

export const cardDelete = (user, cardNumber) => {
  const email = user && user.email;
  const cards = (user && user.cards) || [];

  return userUpdate(email, { cards: cards.filter(({ number }) => number !== cardNumber) });
};
