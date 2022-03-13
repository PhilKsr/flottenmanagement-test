import { Checkbox, DatePicker, Form, Input, InputNumber, Select } from "antd";
import VehicleType from "../../types/VehicleType";

interface Props {
  handleChange: Function;
}

export default function VehicleTypeForm({ handleChange }: Props) {
  const [form] = Form.useForm();

  return (
    <Form form={form} name='control-hooks'>
      <Form.Item
        name='name'
        label='Name'
        rules={[
          {
            required: true,
          },
        ]}>
        <Input name='name' onChange={(e) => handleChange(e)} />
      </Form.Item>
    </Form>
  );
}
