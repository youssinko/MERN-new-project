
export const getError = (error) => {
  return error.response && error.response.data.message
    ? error.response.data.message
     //return message defined in the backend (server.js)(message:page not found or invalid email/pass)
    : error.message;
};