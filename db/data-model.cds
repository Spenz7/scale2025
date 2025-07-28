namespace skyengage;

entity Passenger {
  key ID      : Integer;
  Name        : String;
  Email       : String;
  Tier        : String;
  LastFlightDate : Date;
}

entity Flight {
  key FlightNumber : String;
  Destination     : String;
  DepartureDate   : Date;
  EmptySeats      : Integer;
}