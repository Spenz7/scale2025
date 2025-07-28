sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/m/MessageToast"
], function(Controller, MessageToast) {
  "use strict";

  return Controller.extend("project1.controller.Engagement", {
      onSendOffer: function() {
          const passenger = this.byId("passengerSelect").getSelectedKey();
          const flight = this.byId("flightSelect").getSelectedKey();
          
          this.getView().getModel("engagement").submit("/sendOffer", {
              data: {
                  passengerID: passenger,
                  flightNumber: flight
              }
          }).then(response => {
              MessageToast.show(response.message);
          }).catch(error => {
              MessageToast.show("Error: " + error.message);
          });
      }
  });
});