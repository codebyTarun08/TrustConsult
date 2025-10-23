exports.bookingCompletedTemplate = (clientName, consultantName, paymentLink, reviewLink) => {
    return `
    <!DOCTYPE html>
<html>
  <body style="font-family: Arial, sans-serif; background:#f9f9f9; padding:20px;">
    <div style="max-width:600px; margin:auto; background:#ffffff; padding:20px; border-radius:8px;">
      <h2 style="color:#2c3e50;">Consultation Completed</h2>
      <p>Hello <strong>${clientName}</strong>,</p>
      <p>Your consultation with <strong>${consultantName}</strong> has been marked as <strong>Completed</strong>.</p>
      <p>Please complete your payment and leave a review.</p>
      <p>
        <a href="${paymentLink}" style="background:#e67e22; color:#fff; padding:10px 20px; text-decoration:none; border-radius:4px;">Complete Payment</a>
        <a href="${reviewLink}" style="background:#3498db; color:#fff; padding:10px 20px; text-decoration:none; border-radius:4px; margin-left:10px;">Leave Review</a>
      </p>
      <br>
      <p>Thank you for using TrustConsult!</p>
    </div>
  </body>
</html>
`}