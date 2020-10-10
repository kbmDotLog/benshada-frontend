export default (type) => {
  const stat = () => ({
    UA: 'Manufacturer',
    UB: 'Retailer'
  }[type]);

  return [type === 'UA' || type === 'UB', stat()];
};
