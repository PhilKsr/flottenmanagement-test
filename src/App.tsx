import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Vehicles from "./components/Vehicles";
import Types from "./components/Types";
import Navbar from "./components/Navbar";
import Vehicle from "../types/Vehicle";
import VehicleType from "../types/VehicleTypes";
import { getVehicles, getVehicleTypes } from "./lib/CRUD";

function App() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([
    {
      _id: "1",
      name: "Mercedes-Benz Apropos",
      fahrzeugtyp: "6",
      erstzulassung: "2021-04-18T07:04:05.182+00:00",
      gewicht: 41,
      istFahrbereit: true,
      anzahlAchsen: 4,
      maxGeschwindigkeit: 85,
    },
    {
      _id: "2",
      name: "Mercedes-Benz Actros",
      fahrzeugtyp: "6",
      erstzulassung: "2021-04-18T07:04:05.182+00:00",
      gewicht: 41,
      istFahrbereit: true,
      anzahlAchsen: 4,
      maxGeschwindigkeit: 85,
    },
    {
      _id: "3",
      name: "Bahn XYZ",
      fahrzeugtyp: "5",
      erstzulassung: "2021-04-18T07:04:05.182+00:00",
      gewicht: 41,
      istFahrbereit: true,
      anzahlAchsen: 4,
      maxGeschwindigkeit: 85,
    },
    {
      _id: "4",
      name: "Fiat 500",
      fahrzeugtyp: "7",
      erstzulassung: "2021-04-18T07:04:05.182+00:00",
      gewicht: 41,
      istFahrbereit: false,
      anzahlAchsen: 4,
      maxGeschwindigkeit: 85,
    },
    {
      _id: "9",
      name: "Batmobil",
      fahrzeugtyp: "7",
      erstzulassung: "2021-04-18T07:04:05.182+00:00",
      gewicht: 41,
      istFahrbereit: false,
      anzahlAchsen: 4,
      maxGeschwindigkeit: 85,
    },
  ]);
  const [vehicleTypes, setVehicleTypes] = useState<VehicleType[]>([
    {
      _id: "5",
      name: "Bahngerät",
    },
    {
      _id: "6",
      name: "LKW",
    },
    {
      _id: "7",
      name: "PKW",
    },
  ]);

  // INITIALE DATEN:
  /*   useEffect(() => {
    const initialVehicleTypes = getVehicleTypes();
    setVehicleTypes(initialVehicleTypes);
    const initialVehicles = getVehicles();
    setVehicles(initialVehicles);
  }, []); */

  const updateLocalVehicles = (updatedVehicles: Vehicle[]) => {
    setVehicles(updatedVehicles);
  };

  const updateLocalVehicleTypes = (updatedVehicleTypes: VehicleType[]) => {
    setVehicleTypes(updatedVehicleTypes);
  };

  return (
    <div className='App'>
      <Navbar />
      <Routes>
        <Route
          path='/'
          element={<Home vehicles={vehicles} vehicleTypes={vehicleTypes} />}
        />
        <Route
          path='/vehicles'
          element={
            <Vehicles
              vehicles={vehicles}
              vehicleTypes={vehicleTypes}
              updateLocalVehicles={updateLocalVehicles}
            />
          }
        />
        <Route
          path='/vehicletypes'
          element={
            <Types
              vehicleTypes={vehicleTypes}
              updateLocalVehicleTypes={updateLocalVehicleTypes}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
