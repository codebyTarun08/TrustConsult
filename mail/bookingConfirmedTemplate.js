
exports.bookingConfirmedTemplate = (clientName,consultantName,date,category) => {
    return `
    <!DOCTYPE html>
<html>
  <body style="font-family: Arial, sans-serif; background:#f9f9f9; padding:20px;">
    <div style="max-width:600px; margin:auto; background:#ffffff; padding:20px; border-radius:8px;">
      <h2 style="color:#27ae60;">Booking Confirmed ✅</h2>
      <p>Hello <strong>${clientName}</strong>,</p>
      <p>Your booking with <strong>${consultantName}</strong> has been confirmed.</p>
      <ul>
        <li><strong>Date & Time:</strong> ${date}</li>
        <li><strong>Category:</strong> ${category}</li>
      </ul>
      <p>Please join the session at the scheduled time.</p>
      <br>
      <p>– TrustConsult Team</p>
    </div>
  </body>
</html>
`}