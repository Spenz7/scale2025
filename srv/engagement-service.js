const cds = require('@sap/cds')
const axios = require('axios')  // Only needed for real implementation

module.exports = cds.service.impl(async function () {
  this.on('sendOffer', async (req) => {
    const { passengerID, flightNumber } = req.data;

    // Get passenger and flight data
    const [passenger] = await SELECT.from('Passengers').where({ ID: passengerID });
    const [flight] = await SELECT.from('Flights').where({ FlightNumber: flightNumber });

    // Simple offer logic
    const discount = passenger.Tier === 'Gold' ? '20%' : '10%';

    // -------------------------------
    // MOCK: Real-world implementation
    // -------------------------------
    /*
    const srv = await cds.connect.to('destination');
    const destination = await srv.getDestination('notification-service');
    await axios.post(destination.url + '/send', {
      email: passenger.Email,
      message: `Special offer: ${discount} discount to ${flight.Destination}!`
    });
    */

    // -------------------------------
    // Local return for testing/demo
    // -------------------------------
    return {
      message: `Offer sent to ${passenger.Name} (${passenger.Email}): 
               "${discount} discount on ${flight.Destination} flight!"`
    };
  });
});
