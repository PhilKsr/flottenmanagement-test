import Vehicle from "../../types/Vehicle";
import VehicleType from "../../types/VehicleType";

export const saveVehicle = async (vehicle: any) => {
  const result = await fetch("http://localhost:3001/vehicles", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(vehicle),
  });
  return await result.json();
};

export const saveVehicleType = async (vehicleType: any) => {
  const result = await fetch("http://localhost:3001/vehicle-types", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(vehicleType),
  });
  return await result.json();
};

export const getVehicles = async () => {
  const res = await fetch("http://localhost:3001/vehicles");
  const data = await res.json();
  return data;
};

export const getVehicleTypes = async () => {
  const res = await fetch("http://localhost:3001/vehicle-types");
  const data = await res.json();
  return data;
};

export const updateVehicle = async (vehicle: Vehicle) => {
  const result = await fetch(`http://localhost:3001/vehicles/${vehicle.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(vehicle),
  });
  return await result.json();
};

export const updateVehicleType = async (vehicleType: VehicleType) => {
  const result = await fetch(
    `http://localhost:3001/vehicle-types/${vehicleType.id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(vehicleType),
    }
  );
  return await result.json();
};

export const deleteVehicle = async (vehicle: Vehicle) => {
  const result = await fetch(`http://localhost:3001/vehicles/${vehicle.id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(vehicle),
  });
  return await result.json();
};

export const deleteVehicleType = async (vehicleType: VehicleType) => {
  const result = await fetch(
    `http://localhost:3001/vehicle-types/${vehicleType.id}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(vehicleType),
    }
  );
  return await result.json();
};
