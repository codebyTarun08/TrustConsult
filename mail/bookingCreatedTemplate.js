exports.bookingCreatedTemplate = (clientName,consultantName,date,category) => {
    return `
    <!DOCTYPE html>
<html>
  <body style="font-family: Arial, sans-serif; background:#f9f9f9; padding:20px;">
    <div style="max-width:600px; margin:auto; background:#ffffff; padding:20px; border-radius:8px;">
      <h2 style="color:#2c3e50;">New Booking Request</h2>
      <p>Hello <strong>${consultantName}</strong>,</p>
      <p>You have received a new booking request from <strong>${clientName}</strong>.</p>
      <ul>
        <li><strong>Date & Time:</strong> ${date}</li>
        <li><strong>Category:</strong> ${category}</li>
        <li><strong>Description:</strong> ${problemDescription}</li>
      </ul>
      <p>Please confirm or decline the request from your dashboard.</p>
      <br>
      <p>– TrustConsult Team</p>
    </div>
  </body>
</html>
`}