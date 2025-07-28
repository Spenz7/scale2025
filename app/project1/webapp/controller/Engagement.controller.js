sap.ui.define(["sap/ui/core/mvc/Controller"], function(Controller) {
    return Controller.extend("Engagement.controller", {
      onSelectPassenger: function(oEvent) {
        this.selectedPassenger = oEvent.getSource().getBindingContext().getObject();
        this.byId("offerDialog").open();
      },
      
      onSendOffer: async function() {
        const flight = this.byId("flightSelect").getSelectedItem().getKey();
        const result = await this.getView().getModel().callFunction("/sendOffer", {
          method: "POST",
          urlParameters: {
            passengerID: this.selectedPassenger.ID,
            flightNumber: flight
          }
        });
        
        sap.m.MessageToast.show(result.message);
        this.byId("offerDialog").close();
      }
    });
  });