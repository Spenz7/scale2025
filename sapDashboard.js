sap.ui.getCore().attachInit(function () {
  const tileData = [
    { title: "Booking Confirmation", info: "Confirmation Email", icon: "sap-icon://email", url: "booking.html" },
    { title: "Pre-Flight Engagement", info: "Upgrade Notification", icon: "sap-icon://flight", url: "preflight.html" },
    { title: "In-Flight Engagement", info: "Loyalty & Promotions", icon: "sap-icon://flight", url: "inflight.html" },
    { title: "Post-Flight Engagement", info: "Feedback & Thanks", icon: "sap-icon://customer-financial-fact-sheet", url: "postflight.html" },
    { title: "Loyalty & Retargeting", info: "Tailored Rewards", icon: "sap-icon://favorite", url: "loyalty.html" }
  ];

  const oFlexBox = new sap.m.FlexBox("tileContainer", {
    direction: "Row",
    wrap: "Wrap",
    justifyContent: "Center",
    alignItems: "Center",
    height: "100%",
    width: "100%",
    renderType: "Div",
    items: tileData.map(data =>
      new sap.m.StandardTile({
        title: data.title,
        info: data.info,
        icon: data.icon,
        press: () => window.location.href = data.url
      }).addStyleClass("tileWrapper")
    )
  });

  const oPage = new sap.m.Page({
    title: "Customer Engagement Dashboard",
    content: [oFlexBox],
    enableScrolling: false
  });

  oPage.placeAt("content");

  // Enable drag-and-drop with SortableJS
  oFlexBox.addEventDelegate({
    onAfterRendering: function () {
      const containerDom = oFlexBox.getDomRef();
      if (containerDom && !containerDom._sortableInit) {
        Sortable.create(containerDom, {
          animation: 150,
          ghostClass: 'sortable-ghost'
        });
        containerDom._sortableInit = true;
      }
    }
  });
});
