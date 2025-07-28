using skyengage from '../db/data-model';

service EngagementService {
  entity Passengers as projection on skyengage.Passenger;
  entity Flights as projection on skyengage.Flight;

  action sendOffer(passengerID: Integer, flightNumber: String) returns String;
}
