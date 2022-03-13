import { Modal, Button } from "antd";
import VehicleType from "../../types/VehicleType";
import VehicleForm from "./VehicleForm";
import VehicleTypeForm from "./VehicleTypeForm";

interface Props {
  visible: boolean;
  handleAdd: Function;
  handleCancel: Function;
  handleChange: Function;
  vehicleTypes: VehicleType[];
  children: string;
  vehicleForm: boolean;
}

export default function FormModal({
  visible,
  handleCancel,
  handleAdd,
  handleChange,
  vehicleTypes,
  children,
  vehicleForm,
}: Props) {
  return (
    <>
      <Modal
        visible={visible}
        title={children}
        onOk={() => handleAdd()}
        onCancel={() => handleCancel()}
        footer={[
          <Button key='submit' type='primary' onClick={() => handleAdd()}>
            Hinzufügen
          </Button>,
          <Button key='back' onClick={() => handleCancel()}>
            Abbrechen
          </Button>,
        ]}>
        {vehicleForm ? (
          <VehicleForm
            handleChange={handleChange}
            vehicleTypes={vehicleTypes}
          />
        ) : (
          <VehicleTypeForm handleChange={handleChange} />
        )}
      </Modal>
    </>
  );
}
