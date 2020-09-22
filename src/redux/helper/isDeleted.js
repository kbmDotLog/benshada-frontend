export default (action) => {
  let responseData = action.payload && action.payload.data && action.payload.data.data;

  if (Array.isArray(responseData)) {
    responseData = responseData.sort((a, b) => {
      if (b.createdAt > a.createdAt) return 1;
      if (a.createdAt > b.createdAt) return -1;

      return 0;
    });
  }

  if (responseData) {
    if (typeof responseData === 'object') {
      const isDeleted = (
        Object.values(responseData).map((key, value) => (key === 'isDeleted' ? value : null)) || [
          false
        ]
      ).filter((i) => i !== null)[0];

      responseData = isDeleted ? {} : responseData;
    }
  }

  return responseData;
};
