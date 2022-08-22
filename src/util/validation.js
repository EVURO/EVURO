const emailRegex =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const cardNumberRegex =
  /^(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/;

const cvvRegex = /^[0-9]{3, 4}$/;

export const isValidEmail = email => {
  //   emailRegex.lastIndex = 0;
  return emailRegex.test(email);
};

export const isValidCardNumber = number => {
  cardNumberRegex.lastIndex = 0;
  return cardNumberRegex.test(number);
};
export const isValidCcv = cvv => {
  cvvRegex.lastIndex = 0;
  return cvvRegex.test(cvv);
};

export const isValidName = name => {
  return /^[a-z ]+$/gi.test(name);
};
export const isValidUsername = text => {
  return /^[a-z0-9]+$/gi.test(text);
};

export const isValidNumber = text => {
  return /^[0-9 ]+$/gi.test(text);
};

export const isValidPassport = text => {
  return /^[0-9a-z]+$/gi.test(text);
};

export const isValidPhone = phone => {
  return /^\d?(?:(?:[\+]?(?:[\d]{1,3}(?:[ ]+|[\-.])))?[(]?(?:[\d]{3})[\-/)]?(?:[ ]+)?)?(?:[a-zA-Z2-9][a-zA-Z0-9 \-.]{6,})(?:(?:[ ]+|[xX]|(i:ext[\.]?)){1,2}(?:[\d]{1,5}))?$/.test(
    phone,
  );
};
