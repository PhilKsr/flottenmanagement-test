export default interface Vehicle {
  _id: string;
  name: string;
  fahrzeugtyp: string;
  gewicht: number;
  istFahrbereit: boolean;
  anzahlAchsen: number;
  maxGeschwindigkeit: number;
  erstzulassung: string;
}
