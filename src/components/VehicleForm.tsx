import { Checkbox, Form, Input } from "antd";
import VehicleType from "../../types/VehicleTypes";

interface Props {
  handleChange: Function;
  vehicleTypes?: VehicleType[];
}

export default function VehicleForm({ handleChange, vehicleTypes }: Props) {
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
      <Form.Item
        name='gewicht'
        label='Gewicht in Kg'
        rules={[
          {
            required: true,
          },
        ]}>
        <input
          type='number'
          name='gewicht'
          id='gewicht'
          onChange={(e) => handleChange(e)}
          className=' border rounded-sm'
        />
      </Form.Item>
      <Form.Item
        name='anzahlAchsen'
        label='Achsen'
        rules={[
          {
            required: true,
          },
        ]}>
        <input
          type='number'
          name='anzahlAchsen'
          id='anzahlAchsen'
          onChange={(e) => handleChange(e)}
          className=' border rounded-sm'
        />
      </Form.Item>
      <Form.Item
        name='maxGeschwindigkeit'
        label='Geschwindigkeit in Km/h'
        rules={[
          {
            required: true,
          },
        ]}>
        <input
          type='number'
          name='maxGeschwindigkeit'
          id='maxGeschwindigkeit'
          onChange={(e) => handleChange(e)}
          className=' border rounded-sm'
        />
      </Form.Item>
      <Form.Item
        name='erstzulassung'
        label='Erstzulassung'
        rules={[
          {
            required: true,
          },
        ]}>
        <input
          type='date'
          name='erstzulassung'
          id=''
          onChange={(e) => handleChange(e)}
          className=' border rounded-sm'
        />
      </Form.Item>
      <Form.Item
        name='fahrzeugtypId'
        label='Fahrzeugtyp'
        rules={[
          {
            required: true,
          },
        ]}>
        <select name='fahrzeugtypId' onChange={(e: any) => handleChange(e)}>
          {/*           <option placeholder='Wähle den Fahrzeugtyp'>
            Wähle den Fahrzeugtyp
          </option> */}
          {vehicleTypes?.map((type) => (
            <option value={type.id}>{type.name}</option>
          ))}
        </select>
      </Form.Item>
      <Form.Item name='istFahrbereit' label='Fahrbereit?'>
        <Checkbox name='istFahrbereit' onChange={(e) => handleChange(e)} />
      </Form.Item>
    </Form>
  );
}
