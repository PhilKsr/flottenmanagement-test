import VehicleType from "../../types/VehicleType";
import {
  deleteVehicleType,
  saveVehicleType,
  updateVehicleType,
} from "../lib/CRUD";
import { useState } from "react";
import { Table, Input, Popconfirm, Form, Typography } from "antd";
import FormModal from "./Modal";

interface Props {
  vehicleTypes: VehicleType[];
  setInitials: Function;
}

export default function Types({ vehicleTypes, setInitials }: Props) {
  const [newVehicleType, setNewVehicleType] = useState({
    name: "",
  });
  const [visible, setVisible] = useState(false);

  const showModal = () => {
    setVisible(!visible);
  };

  const handleVehicleTypeAdd = async () => {
    //AD TO DB
    await saveVehicleType(newVehicleType);
    setInitials();
    showModal();
  };

  const handleCancel = () => {
    setVisible(!visible);
  };

  const handleVehicleTypeChange = (e: any) => {
    setNewVehicleType({ ...newVehicleType, [e.target.name]: e.target.value });
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
    const inputNode = <Input />;
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
  const [editingKey, setEditingKey] = useState<number>(0);

  const isEditing = (record: VehicleType) => record.id === editingKey;

  const edit = (record: VehicleType) => {
    form.setFieldsValue({ ...record });
    setEditingKey(record.id);
  };

  const cancel = () => {
    setEditingKey(0);
  };
  const save = async (key: number) => {
    try {
      let row = (await form.validateFields()) as VehicleType;

      const newData = [...vehicleTypes];
      const index = newData.findIndex((item) => key === item.id);

      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        // UPDATE TO DB
        updateVehicleType(newData[index]);
        setInitials();
        setEditingKey(0);
      } else {
        newData.push(row);
        // UPDATE TO DB
        updateVehicleType(newData[index]);
        setInitials();
        setEditingKey(0);
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  const handleDelete = async (record: VehicleType) => {
    await deleteVehicleType(record);
    setInitials();
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      editable: true,
    },

    {
      title: <Typography.Link onClick={showModal}>Add</Typography.Link>,
      dataIndex: "operation",
      render: (_: any, record: VehicleType) => {
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
                // DELETE FROM DB
                handleDelete(record);
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
      onCell: (record: VehicleType) => ({
        record,
        inputType: "number",
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
          dataSource={vehicleTypes}
          columns={mergedColumns}
          rowClassName='editable-row'
          pagination={{
            onChange: cancel,
          }}
        />
      </Form>
      <FormModal
        visible={visible}
        handleChange={handleVehicleTypeChange}
        handleCancel={handleCancel}
        handleAdd={handleVehicleTypeAdd}
        vehicleForm={false}
        vehicleTypes={vehicleTypes}>
        Fahrzeug hinzufügen
      </FormModal>
    </>
  );
}
