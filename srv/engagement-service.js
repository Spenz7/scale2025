const cds = require('@sap/cds')

// ADD THIS CORS MIDDLEWARE FIRST
cds.on('bootstrap', app => {
    app.use((req, res, next) => {
        res.set({
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': '*',
            'Access-Control-Allow-Headers': '*'
        })
        next()
    })
})

module.exports = cds.service.impl(async function() {
    this.on('sendOffer', async (req) => {
        try {
            const { passengerID, flightNumber } = req.data;
            
            // DEMO FALLBACK - Hardcoded values if DB fails
            const passenger = passengerID === 1 ? {
                Name: "Demo Passenger",
                Email: "demo@skylink.com",
                Tier: "Gold"
            } : await SELECT.one.from('Passengers').where({ ID: passengerID });
            
            const flight = flightNumber === "SKY001" ? {
                Destination: "Paris",
                FlightNumber: "SKY001"
            } : await SELECT.one.from('Flights').where({ FlightNumber: flightNumber });

            const discount = passenger.Tier === 'Gold' ? '20%' : '10%';
            
            return {
                success: true,
                message: `DEMO: Offer sent to ${passenger.Name}: ${discount} discount to ${flight.Destination}`
            };
        } catch (error) {
            return {
                success: false,
                message: "DEMO MODE: Mock offer sent (system offline)"
            }
        }
    });
});