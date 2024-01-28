const express = require('express');
const bodyParser = require('body-parser');
const Seam = require('seamapi');

const app = express();
const port = 3000;

const SCHLAGE_API_KEY = 'your_schlage_api_key';

const SCHLAGE_DEVICE_ID = 'your_schlage_device_id';

const seam = new Seam();

app.use(bodyParser.json());

app.post('/webhooks/reservations', async (req, res) => {
  try {
    // Extract reservation data from Hostaway webhook payload
    const { reservationId, guestName, checkInDate, checkOutDate } = req.body;

    // Simulate authentication with Schlage API
    seam.authenticate(SCHLAGE_API_KEY);

    // Simulate setting a lock based on reservation data
    await seam.locks.lockDoor(SCHLAGE_DEVICE_ID);

    console.log(`Lock set for reservation ${reservationId} (${guestName}) from ${checkInDate} to ${checkOutDate}`);

    setTimeout(async () => {
      await seam.locks.unlockDoor(SCHLAGE_DEVICE_ID);

      console.log(`Lock released for reservation ${reservationId} (${guestName})`);

      res.status(200).json({ message: 'Lock set and released successfully' });
    }, 5000);
  } catch (error) {
    console.error('Error processing reservation:', error);
    res.status(500).json({ error: 'Error processing reservation' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
