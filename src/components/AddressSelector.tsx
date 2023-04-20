import { addressObject, setFormDataType, setStateBoolean } from './Postcode';
import { formData } from './Form';
import { Form } from 'react-bootstrap';
import { Dispatch, SetStateAction } from 'react';
import { JsxElement } from 'typescript';

interface addressSelectorProps {
  setFormData: setFormDataType;
  setIsPostcodeVerified: setStateBoolean;
  setSelectedAddress: Dispatch<SetStateAction<addressObject>>;
  setAddresses: Dispatch<SetStateAction<addressObject[]>>;
  selectedAddress: addressObject;
  addresses: addressObject[];
}

export default function AddressSelector({
  setFormData,
  setSelectedAddress,
  setAddresses,
  setIsPostcodeVerified,
  addresses,
  selectedAddress,
}: addressSelectorProps) {
  const handleAddressChange = (addressObject: addressObject): void => {
    /* takes an addressObject and sets the address in the form data to be the value of the object
    removes addresses from addresses array state to clear addresses from the DOM
    */
    setFormData((formData: formData) => ({
      ...formData,
      addressSlug: addressObject.slug,
    }));
    setSelectedAddress(addressObject);
    setAddresses([]);
    setIsPostcodeVerified(true);
  };

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
