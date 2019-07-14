const admin = require('firebase-admin');
require('dotenv').config();

const { sendTelegram } = require('./lib/telegram');
const serviceAccount = require('./serviceAccount.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
const now = new Date();
const bookings = db.collection('bookings').where('created', '>=', now);

async function send(booking) {
  if (booking.email === 'anton@ju60.de') return;

  let text = '';
  text += '<b>Es gibt eine neue Buchunganfrage!</b>\n\n';
  text += `Name: ${booking.name}\n`;
  text += `Email: ${booking.email}\n`;
  text += `Telefon: ${booking.phone}\n`;
  text += `Personen: ${booking.persons}\n\n`;
  text += `<pre>${booking.message}</pre>\n\n`;
  text += `<a href="https://rooster-on-the-sea.de/admin/booking/${booking.id}">Buchung öffnen</a>`;

  sendTelegram(text);
  // sendMail(text);
}

let observer = bookings.onSnapshot(querySnapshot => {
    querySnapshot.docChanges().forEach(change => {
      const booking = change.doc.data();
      booking.id = change.doc.id; 
      send(booking);
      console.log({ id: change.doc.id, type: change.type });
    });
  }, err => {
    console.log(`Encountered error: ${err}`);
  });

console.log('Rooster-backend started');
