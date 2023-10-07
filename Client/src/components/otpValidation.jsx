import alert from "sweetalert";

let count = 0;
let genOtp = "";
let userOtp = "";
const OtpValidation = (otp) => {
  const verifyOtp = () => {
    if (genOtp === userOtp) {
      alert("Welcome", "Logged in Successfully", "success");
      window.location.href = "/dashboard";
    } else {
      alert("OTP didn't match", "Please enter valid OTP", "error");
      userOtp = 0;
    }
  };

  if (count === 0) {
    genOtp = otp;
    count++;
  } else {
    userOtp = otp;
    verifyOtp();
  }
  return userOtp;
};

export default OtpValidation;
