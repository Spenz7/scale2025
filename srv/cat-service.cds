using skyengage as my from '../db/data-model';

service MaintenanceService {
  @readonly
  entity Passenger as projection on my.Passenger;

  @readonly
  entity Flight as projection on my.Flight;

  
}

// Example annotations for Passenger entity
annotate MaintenanceService.Passenger with @(
  UI.LineItem : [
    { Value: ID, Label: 'Passenger ID' },
    { Value: Name, Label: 'Name' },
    { Value: Email, Label: 'Email' },
    { Value: Tier, Label: 'Tier' },
    { Value: LastFlightDate, Label: 'Last Flight Date' }
  ]
);
