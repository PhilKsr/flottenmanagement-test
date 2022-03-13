import { useState } from "react";
import Vehicle from "../../types/Vehicle";
import VehicleType from "../../types/VehicleTypes";
import {
  Table,
  Input,
  InputNumber,
  Popconfirm,
  Form,
  Typography,
  Checkbox,
  Select,
} from "antd";
import FormModal from "./Modal";

import { deleteVehicle, saveVehicle, updateVehicle } from "../lib/CRUD";

interface Props {
  vehicles: Vehicle[];
  vehicleTypes: VehicleType[];
  updateVehicles: Function;
}

export default function Vehicles({
  vehicles,
  vehicleTypes,
  updateVehicles,
}: Props) {
  const [newVehicle, setNewVehicle] = useState({
    name: "",
    fahrzeugtypId: 0,
    erstzulassung: "",
    gewicht: 0,
    istFahrbereit: false,
    anzahlAchsen: 0,
    maxGeschwindigkeit: 0,
  });

  const handleNewVehicleChange = (e: any) => {
    console.log(e);
    if (e.target.name === "istFahrbereit") {
      setNewVehicle({
        ...newVehicle,
        [e.target.name]: e.target.checked ? true : false,
      });
    } else {
      setNewVehicle({ ...newVehicle, [e.target.name]: e.target.value });
    }
  };

  const [visible, setVisible] = useState(false);
  const showModal = () => {
    setVisible(!visible);
  };

  const handleVehicleAdd = () => {
    saveVehicle(newVehicle);
    updateVehicles(newVehicle);
  };

  const handleCancel = () => {
    setVisible(!visible);
  };
  interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
    editing: boolean;
    dataIndex: string;
    title: any;
    inputType: "number" | "text" | "checkbox" | "select";
    record: any;
    index: number;
    children: React.ReactNode;
  }
  const EditableCell: React.FC<EditableCellProps> = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps
  }) => {
    const inputNode =
      inputType === "checkbox" ? (
        <Checkbox defaultChecked={record.istFahrbereit ? true : false} />
      ) : inputType === "select" ? (
        <Select>
          {vehicleTypes.map((type) => (
            <option key={type.id} value={type.id}>
              {type.name}
            </option>
          ))}
        </Select>
      ) : inputType === "text" ? (
        <Input />
      ) : (
        <InputNumber />
      );
    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item
            name={dataIndex}
            style={{
              margin: 0,
            }}
            rules={[
              {
                required: true,
                message: `Please Input ${title}!`,
              },
            ]}>
            {inputNode}
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  };

  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState<number>();

  const isEditing = (record: Vehicle) => record.id === editingKey;

  const edit = (record: Vehicle) => {
    form.setFieldsValue({ ...record });
    setEditingKey(record.id);
  };

  const cancel = () => {
    setEditingKey(0);
  };
  const save = async (key: number) => {
    try {
      let row = (await form.validateFields()) as Vehicle;

      const newData = [...vehicles];
      const index = newData.findIndex((item) => key === item.id);
      const checkbox: HTMLInputElement | null =
        document.querySelector("#istFahrbereit");
      row = { ...row, istFahrbereit: checkbox?.checked ? true : false };

      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        // UPDATE TO DB
        updateVehicle(newData[index]);
        updateVehicles(newData);
        setEditingKey(0);
      } else {
        newData.push(row);
        // UPDATE TO DB
        updateVehicle(newData[index]);
        updateVehicles(newData);
        setEditingKey(0);
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      editable: true,
    },
    {
      title: "Gewicht in Kg",
      dataIndex: "gewicht",
      key: "gewicht",
      editable: true,
    },
    {
      title: "Achsen",
      dataIndex: "anzahlAchsen",
      key: "anzahlAchsen",
      editable: true,
    },
    {
      title: "Geschwindigkeit in Km/h",
      dataIndex: "maxGeschwindigkeit",
      key: "maxGeschwindigkeit",
      editable: true,
    },
    {
      title: "Fahrzeugtyp",
      dataIndex: "fahrzeugtypId",
      key: "fahrzeugtypId",
      render: (fahrzeugtypId: number) => (
        <>{vehicleTypes.find((type) => type.id === fahrzeugtypId)}</>
      ),
      editable: true,
    },
    {
      title: "Fahrbereit",
      dataIndex: "istFahrbereit",
      key: "istFahrbereit",
      render: (istFahrbereit: boolean) => <>{istFahrbereit ? "🟢" : "🔴"}</>,
      editable: true,
    },
    {
      title: <Typography.Link onClick={showModal}>Add</Typography.Link>,
      dataIndex: "operation",
      render: (_: any, record: Vehicle) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record.id)}
              style={{ marginRight: 8 }}>
              Save
            </Typography.Link>
            <Popconfirm title='Sure to cancel?' onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <>
            <Typography.Link
              className='mr-8'
              disabled={editingKey !== 0}
              onClick={() => edit(record)}>
              Edit
            </Typography.Link>
            <Typography.Link
              onClick={() => {
                // Delete from DB
                deleteVehicle(record);
                updateVehicles(
                  vehicles.filter((vehicle) => vehicle.id !== record.id)
                );
              }}>
              Delete
            </Typography.Link>
          </>
        );
      },
    },
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: Vehicle) => ({
        record,
        inputType:
          col.dataIndex === "istFahrbereit"
            ? "checkbox"
            : col.dataIndex === "fahrzeugtypId"
            ? "select"
            : col.dataIndex === "name"
            ? "text"
            : "number",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  return (
    <>
      <Form form={form} component={false}>
        <Table
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          bordered
          dataSource={vehicles}
          columns={mergedColumns}
          rowClassName='editable-row'
          pagination={{
            onChange: cancel,
          }}
        />
      </Form>
      <FormModal
        visible={visible}
        handleCancel={handleCancel}
        handleChange={handleNewVehicleChange}
        vehicleTypes={vehicleTypes}
        handleAdd={handleVehicleAdd}
        vehicleForm={true}>
        Fahrzeug hinzufügen
      </FormModal>
    </>
  );
}
