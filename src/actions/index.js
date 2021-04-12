export const cacheUserData = (data) => {
  return {
    type: 'FETCH_USER_NAMES',
    payload: data,
  };
};
