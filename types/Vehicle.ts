export default interface Vehicle {
  id: number;
  name: string;
  fahrzeugtypId: number;
  gewicht: number;
  istFahrbereit: boolean;
  anzahlAchsen: number;
  maxGeschwindigkeit: number;
  erstzulassung: string;
}
