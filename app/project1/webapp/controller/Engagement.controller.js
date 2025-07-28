sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/m/MessageToast"
], function(Controller, MessageToast) {
  "use strict";

  return Controller.extend("project1.controller.Engagement", {
      onInit: function() {
          // Emergency mock data if backend fails
          if (!this.getView().getModel("engagement")) {
              const mockModel = new sap.ui.model.json.JSONModel({
                  Passengers: [
                      { ID: 1, Name: "Demo Passenger", Email: "demo@skylink.com" }
                  ],
                  Flights: [
                      { FlightNumber: "SKY001", Destination: "Paris" }
                  ]
              });
              this.getView().setModel(mockModel, "engagement");
          }
      },
      
      onSendOffer: function() {
          // DEMO MODE - Always show success
          MessageToast.show("DEMO: Offer sent successfully!");
          
          /* Real implementation (commented out for demo)
          const passenger = this.byId("passengerSelect").getSelectedKey();
          const flight = this.byId("flightSelect").getSelectedKey();
          
          this.getView().getModel("engagement").submit("/sendOffer", {
              data: { passengerID: passenger, flightNumber: flight }
          }).then(response => {
              MessageToast.show(response.message);
          });
          */
      }
  });
});