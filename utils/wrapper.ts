/**
 * 
 * @param {data}
 * @param {description}
 * @param {code}
 * @returns {JSON}
 * 
 * This is used to forward response from API, with the type
 * data for SUCCESS, and error if the API throws ERROR response
 */

const data = (data: any, description: String, code = 200) => {
  return { success: true, message: description, data, code };
};


const error = (description: String, code: Number, err?: any) => {
  return { success: false, code, err, data: null, message: description };
};


export default { data, error };
