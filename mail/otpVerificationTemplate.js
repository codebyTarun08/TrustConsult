exports.otpVerificationTemplate = (otp) => {
    return `
    <!DOCTYPE html>
<html>
  <body style="font-family: Arial, sans-serif; background:#f9f9f9; padding:20px;">
    <div style="max-width:600px; margin:auto; background:#ffffff; padding:20px; border-radius:8px;">
      <h2 style="color:#2c3e50;">Email Verification</h2>
      <p>Use the following OTP to complete your registration:</p>
      <h1 style="color:#3498db; text-align:center;">${otp}</h1>
      <p>This OTP is valid for <strong>5 minutes</strong>. If you didn't request this, you can safely ignore this email.</p>
      <br>
      <p> TrustConsult Team</p>
    </div>
  </body>
</html>
`}