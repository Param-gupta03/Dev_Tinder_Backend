const validator = require("validator");

const validateSignUpData = (req) => {
  const { firstName, lastName, emailId, password } = req.body;

  if (!firstName || !lastName) {
    throw new Error("Enter both first name and last name");
  }

  if (firstName.length < 4 || firstName.length > 40) {
    throw new Error("First name must contain 4–40 characters");
  }

  if (!validator.isEmail(emailId)) {
    throw new Error("Enter a valid email address");
  }

  if (!validator.isStrongPassword(password)) {
    throw new Error(
      "Password must be strong (min 8 chars, include uppercase, lowercase, number, and symbol)"
    );
  }
};

module.exports = { validateSignUpData };
