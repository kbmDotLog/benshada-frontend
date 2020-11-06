/** API imports */
import api from 'redux/api/api';

/** Type imports */
import {
  TESTIMONIALS_ONE,
  TESTIMONIALS_ONE_SELECTED,
  TESTIMONIAL_ADD,
  TESTIMONIALS_ALL,
  TESTIMONIAL_UPDATE,
  TESTIMONIAL_DELETE
} from 'redux/actions/types/testimonialTypes';

/**
 * Select single testimonial
 * @param {object} testimonial
 */
export const testimonialsOneSelected = (testimonial) => ({
  type: TESTIMONIALS_ONE_SELECTED,
  payload: testimonial
});

/**
 *Fetch single testimonial
 * @param {string} id
 */
export const testimonialsOne = (id) => ({
  type: TESTIMONIALS_ONE,
  payload: api.get(`/testimonials/${id}`)
});

/**
 * Fetch all testimonies
 */
export const testimonialsAll = () => ({
  type: TESTIMONIALS_ALL,
  payload: api.get('/testimonials/')
});

/**
 *Update single testimonial
 * @param {string} id
 * @param {object} testimonialData
 */
export const testimonialUpdate = (id, testimonialData) => (dispatch) => {
  const response = dispatch({
    type: TESTIMONIAL_UPDATE,
    payload: api.put(`/testimonials/${id}`, testimonialData)
  });

  return response.then(() => dispatch([testimonialsOne(id), testimonialsAll()]));
};

/**
 *Add single testimonial
 * @param {object} testimonial
 */
export const testimonialAdd = (testimonial) => (dispatch) => {
  const response = dispatch({
    type: TESTIMONIAL_ADD,
    payload: api.post('/testimonials', testimonial)
  });

  return response.then(() => dispatch(testimonialsAll()));
};

/**
 *Delete single testimonial
 * @param {object} testimonial
 */
export const testimonialDelete = ({ _id }) => (dispatch) => {
  const response = dispatch({
    type: TESTIMONIAL_DELETE,
    payload: api.delete(`/testimonials/${_id}`)
  });

  return response.then(() => dispatch(testimonialsAll()));
};
