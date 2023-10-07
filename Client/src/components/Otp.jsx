import emailjs from "@emailjs/browser";
import OtpValidation from "./otpValidation";

export const Otp = ({ email }) => {
  const sendOTP = (email) => {
    const otp = Math.floor(100000 + Math.random() * 900000);
    const templateParams = {
      to_email: email,
      otp: otp,
    };
    emailjs
      .send(
        "service_g3k07am",
        "template_1zx7ll7",
        templateParams,
        "2W5PXCcN7EWc2n0E_"
      )
      .then(
        (response) => {
          console.log("OTP sent successfully!", response.status, response.text);
        },
        (error) => {
          console.log("Failed to send OTP", error);
        }
      );
    return otp;
  };
  const otp = sendOTP(email);
  OtpValidation(otp.toString());
  return otp;
};
export default Otp;
