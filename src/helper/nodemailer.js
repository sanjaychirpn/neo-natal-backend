const { SENDER_EMAIL, SENDER_PASSWORD } = process.env;

export let nodemailerConfig = {
  service: 'gmail',
  auth: {
    user: SENDER_EMAIL,
    pass: SENDER_PASSWORD,
  },
};

export let createMessage = (email, otp) => {
  let message = {
    from: SENDER_EMAIL,
    to: email,
    subject: 'OTP Verification Email',
    text: 'YOUR OTP IS: ' + otp,
  };
  return message;
};
