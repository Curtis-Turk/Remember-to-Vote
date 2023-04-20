import { addressObject, postcodeProps } from './Postcode';
import { formData } from './Form';
import { Form } from 'react-bootstrap';

export default function AddressSelector({
  setFormData,
  setSelectedAddress,
  setAddresses,
  setIsPostCodeVerified,
  addresses,
  selectedAddress,
}: postcodeProps) {
  const handleAddressChange = (addressObject: addressObject): void => {
    /* takes an addressObject and sets the address in the form data to be the value of the object
    removes addresses from addresses array state to clear addresses from the DOM
    */
    if (!(setFormData && setSelectedAddress && setAddresses && setIsPostCodeVerified)) return;
    setFormData((formData: formData) => ({
      ...formData,
      addressSlug: addressObject.slug,
    }));
    setSelectedAddress(addressObject);
    setAddresses([]);
    setIsPostCodeVerified(true);
  };

  if (!addresses) return;
  // only render the address selection if the address picker is returned by API
  let addressesFormSelect;
  if (addresses.length) {
    addressesFormSelect = (
      <Form.Select
        onChange={(event) => {
          if (event.target.value !== '') handleAddressChange(JSON.parse(event.target.value));
        }}
      >
        <option value={''}>Select your address here</option>
        {addresses.map((addressObject: addressObject) => (
          <option key={addressObject.address} value={JSON.stringify(addressObject)}>
            {addressObject.address}
          </option>
        ))}
      </Form.Select>
    );
  }

  if (selectedAddress.address.length) {
    addressesFormSelect = (
      <Form.Select disabled={true}>
        <option>{selectedAddress.address}</option>
      </Form.Select>
    );
  }

  if (addresses.length || selectedAddress.address.length) {
    return (
      <Form.Group>
        <Form.Label>Address</Form.Label>
        {addressesFormSelect}
      </Form.Group>
    );
  }
  return <></>;
}
