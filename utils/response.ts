/**
 * 
 * @param {res}
 * @param {data}
 * @param {message}
 * @param {code}
 * @returns {JSON}
 * 
 * This is used to send response from API, with the type
 * data for SUCCESS, and error if the API throws ERROR response
 */


const data = (res: any, data: Object, message: String, code = 200) => {
  const validateMessage = message || 'Your request has been processed.';
  return res.send(code, { success: true, data, message: validateMessage, code });
};


const error = (res: any, message: String, code: Number) => {
  return res.send(code, { success: false, data: null, message, code });
};


export default { data, error };
