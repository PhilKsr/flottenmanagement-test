import Vehicle from "../../types/Vehicle";
import VehicleType from "../../types/VehicleType";

interface Props {
  vehicles: Vehicle[];
  vehicleTypes: VehicleType[];
}

export default function Home({ vehicles, vehicleTypes }: Props) {
  console.log(vehicleTypes);
  console.log(vehicles);
  return (
    <ul className='m-12'>
      {vehicleTypes.map((type) => (
        <li key={type.id} className='mb-8 border-b flex'>
          <span className=' basis-9/12'>{type.name}</span>
          <ul className='flex flex-col basis-4/12'>
            {vehicles
              .filter((vehicle) => vehicle.fahrzeugtyp.id === type.id)
              .map((vehicle) => (
                <>
                  <li key={vehicle.id}>{vehicle.name}</li>
                </>
              ))}
          </ul>
        </li>
      ))}
    </ul>
  );
}
