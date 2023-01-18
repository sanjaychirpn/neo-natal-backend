import otpGenerator from 'otp-generator';

async function getSixDigitOTP() {
  let otp = await otpGenerator.generate(6, {
    digits: true,
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    specialChars: false,
  });
  console.log({ otp });
  return otp;
}

export { getSixDigitOTP };
