import { useState } from 'react';
import CheckboxAddress from '../../elements/checkbox/checkbox';
import CityValid from '../city/cityValid';
import PostalCode from '../postalCode/postalCode';
import SelectCountry from '../selectCountry/selectCountry';
import StreetValid from '../streetValid/streetValid';
import Label from '../../elements/wrapper';
import { IMyAddress } from '@/service/api/CustomerService';

interface IShippingAddressProps {
  addressType: string;
  formShippingAddress: IMyAddress;
  onUpdate: (address: IMyAddress, isDefault: boolean) => void;
}

export default function AddressSection({ addressType, formShippingAddress, onUpdate }: IShippingAddressProps) {
  const [isChecked, setIsChecked] = useState(false);

  const [address, setAddress] = useState(formShippingAddress);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const checked = event.target.checked;
    setIsChecked(checked);
  };

  return (
    <div className="adress-field mt-14">
      <h3 className="ml-2.5 lg:text-lg sm:text-base">Fill in the address fields for {addressType} address</h3>
      <div>
        <Label label="Street">
          <StreetValid
            streetName={address.streetName}
            onUpdate={(street: string) => {
              const newState = { ...address, streetName: street };
              setAddress(newState);
              onUpdate(newState, isChecked);
            }}
          />
        </Label>
      </div>
      <div>
        <Label label="City">
          <CityValid
            city={address.city}
            onUpdate={(city: string) => {
              const newState = { ...address, city: city };
              setAddress(newState);
              onUpdate(newState, isChecked);
            }}
          />
        </Label>
      </div>
      <div>
        <Label label="Country">
          <SelectCountry
            country={address.country}
            onUpdate={(country: string) => {
              const newState = { ...address, country: country };
              setAddress(newState);
              onUpdate(newState, isChecked);
            }}
          />
        </Label>
      </div>
      <div>
        <Label label="Postal code">
          <PostalCode
            country={address.country}
            postalCode={address.postalCode}
            onUpdate={(postalCode: string) => {
              const newState = { ...address, postalCode: postalCode };
              setAddress(newState);
              onUpdate(newState, isChecked);
            }}
          />
        </Label>
      </div>
      <CheckboxAddress label="Set as default address" checked={isChecked} onChange={handleCheckboxChange} />
    </div>
  );
}
