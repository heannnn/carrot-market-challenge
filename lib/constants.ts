export const PASSWORD_MIN_LENGTH = 10;
// export const PASSWORD_REGEX = new RegExp(
//   /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).+$/
// );
export const PASSWORD_REGEX = new RegExp(/(?=.*?[0-9])/);
export const PASSWORD_REGEX_ERROR =
  "Password should contain at least one number (0123456789)";

export const TWEET_PER_PAGE = 3;
