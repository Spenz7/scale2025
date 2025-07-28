const express = require('express')
const app = express()
const port = 4005

// Enable CORS and JSON parsing
app.use(express.json())
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', '*')
  res.header('Access-Control-Allow-Headers', '*')
  next()
})

// Metadata endpoint (must return XML)
app.get('/engagement/$metadata', (req, res) => {
  res.type('application/xml')
  res.send(`
    <edmx:Edmx Version="4.0" xmlns:edmx="http://docs.oasis-open.org/odata/ns/edmx">
      <edmx:DataServices>
        <Schema Namespace="EngagementService" xmlns="http://docs.oasis-open.org/odata/ns/edm">
          <EntityType Name="Passenger">
            <Key><PropertyRef Name="ID"/></Key>
            <Property Name="ID" Type="Edm.Int32" Nullable="false"/>
            <Property Name="Name" Type="Edm.String"/>
            <Property Name="Email" Type="Edm.String"/>
          </EntityType>
          <EntityType Name="Flight">
            <Key><PropertyRef Name="FlightNumber"/></Key>
            <Property Name="FlightNumber" Type="Edm.String" Nullable="false"/>
            <Property Name="Destination" Type="Edm.String"/>
          </EntityType>
          <Action Name="sendOffer" IsBound="true">
            <Parameter Name="service" Type="EngagementService.EntityContainer"/>
            <Parameter Name="passengerID" Type="Edm.Int32"/>
            <Parameter Name="flightNumber" Type="Edm.String"/>
          </Action>
        </Schema>
      </edmx:DataServices>
    </edmx:Edmx>
  `)
})

// Mock data endpoints (must return JSON with "value" array)
app.get('/engagement/Passengers', (req, res) => {
  res.json({
    value: [
      { ID: 1, Name: "Demo Passenger", Email: "demo@skylink.com" },
      { ID: 2, Name: "Test User", Email: "test@skylink.com" }
    ]
  })
})

app.get('/engagement/Flights', (req, res) => {
  res.json({
    value: [
      { FlightNumber: "SKY001", Destination: "Paris" },
      { FlightNumber: "SKY002", Destination: "London" }
    ]
  })
})

// Action endpoint
app.post('/engagement/sendOffer', (req, res) => {
  res.json({
    message: `Offer sent to passenger ${req.body.passengerID} for flight ${req.body.flightNumber}`
  })
})

app.listen(port, () => {
  console.log(`Mock server running on http://localhost:${port}`)
  console.log(`Test endpoints:
  - http://localhost:${port}/engagement/$metadata
  - http://localhost:${port}/engagement/Passengers
  - http://localhost:${port}/engagement/Flights`)
})