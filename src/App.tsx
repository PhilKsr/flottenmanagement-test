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
  const [vehicleTypes, setVehicleTypes] = useState<VehicleType[]>([]);

  const [vehicles, setVehicles] = useState<Vehicle[]>([]);

  // INITIALE DATEN:
  useEffect(() => {
    Promise.all([getVehicleTypes(), getVehicles()]).then(
      (data: [VehicleType[], Vehicle[]]) => {
        console.log(data);
        setVehicleTypes(data[0]);
        setVehicles(data[1]);
      }
    );
  }, []);

  const updateVehicles = (update: any) => {
    setVehicles([...vehicles, update]);
  };

  const updateVehicleTypes = (update: any) => {
    setVehicleTypes([...vehicleTypes, update]);
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
              updateVehicles={updateVehicles}
            />
          }
        />
        <Route
          path='/vehicletypes'
          element={
            <Types
              vehicleTypes={vehicleTypes}
              updateVehicleTypes={updateVehicleTypes}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
