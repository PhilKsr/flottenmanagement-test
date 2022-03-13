import VehicleType from "./VehicleType";

export default interface Vehicle {
  id: number;
  name: string;
  fahrzeugtyp: VehicleType;
  gewicht: number;
  istFahrbereit: boolean;
  anzahlAchsen: number;
  maxGeschwindigkeit: number;
  erstzulassung: string;
}
