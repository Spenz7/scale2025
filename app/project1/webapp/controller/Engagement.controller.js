sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/m/MessageToast"
], function(Controller, MessageToast) {
  "use strict";

  return Controller.extend("project1.controller.Engagement", {
    onInit: function() {
      // Mock data model for demo without backend
      const mockModel = new sap.ui.model.json.JSONModel({
        Passengers: [
          { ID: 1, Name: "Demo Passenger", Email: "demo@skylink.com" },
          { ID: 2, Name: "Jane Smith", Email: "jane@skylink.com" }
        ],
        Flights: [
          { FlightNumber: "SKY001", Destination: "Paris" },
          { FlightNumber: "SKY002", Destination: "London" }
        ]
      });
      this.getView().setModel(mockModel, "engagement");
    },

    onSendOffer: function () {
      const passengerID = this.byId("passengerSelect").getSelectedKey();
      const flightNumber = this.byId("flightSelect").getSelectedKey();

      // Find selected passenger and flight details from mock model
      const passengers = this.getView().getModel("engagement").getProperty("/Passengers");
      const flights = this.getView().getModel("engagement").getProperty("/Flights");

      const passenger = passengers.find(p => p.ID == passengerID);
      const flight = flights.find(f => f.FlightNumber === flightNumber);

      const discount = passenger ? (passenger.Tier === 'Gold' ? '20%' : '10%') : '10%';

      const message = `Mock: Offer sent to ${passenger?.Name || 'Unknown'}: ${discount} discount to ${flight?.Destination || 'Unknown'}`;
      MessageToast.show(message);
    }
  });
});
