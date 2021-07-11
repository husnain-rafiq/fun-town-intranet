import moment from 'moment';

export const parseDate = (date) => moment(date).format('MM/DD/YYYY');
export function noWhitespace() {
  return this.transform((value, originalValue) =>
    /^[ ]*$/.test(originalValue) ? NaN : value
  );
}

export const createFormData = (object) =>
  Object.keys(object).reduce((formData, key) => {
    formData.append(key, object[key]);
    return formData;
  }, new FormData());
