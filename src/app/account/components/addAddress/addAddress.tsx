import { ChangeAction, ChangeAddresAction, IMyAddress } from '@/service/api/CustomerService';
import { useState } from 'react';
import BigPopup from '../passwordChange/popup/passwordChangePopup';
import Wrapper from '../wrapper/wrapper';
import AddressSection from '@/app/registration/components/addresses/addressSection';

interface AddAddressProps {
  addressType: 'Shipping' | 'Billing';
  handleSubmitAddAddress: (
    actionUpdate: ChangeAddresAction,
    actionRemove: ChangeAction,
    address: IMyAddress
  ) => (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
  onUpdate: (address: IMyAddress) => void;
}

export default function AddAddress({ addressType, handleSubmitAddAddress, onUpdate }: AddAddressProps) {
  const [addresses, setAddresses] = useState<IMyAddress>({
    id: '',
    streetName: '',
    city: '',
    postalCode: '',
    country: '',
    defaultShippingAddress: false,
  });
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        className="w-28	h-28 rounded outline-dashed outline-1 shadow-[5px_7px_6px_1px_rgb(211,238,206,0.45)] outline-[rgb(100,150,91)]"
        type="button"
        onClick={(event) => {
          event.preventDefault();
          setIsOpen(true);
        }}
      >
        Add address
      </button>
      {isOpen && (
        <BigPopup
          onClose={(event) => {
            event.preventDefault();
            setIsOpen(false);
          }}
        >
          <div className="font-serif flex justify-center flex-col items-center w-full">
            <div className="lg:w-3/6 md:w-4/5 sm:w-4/5 min-[320px]:w-4/5">
              <Wrapper
                title={addressType === 'Shipping' ? 'Shipping address' : 'Billing address'}
                handleSubmit={handleSubmitAddAddress('addAddress', `add${addressType}AddressId`, addresses)}
              >
                {addressType === 'Shipping' ? (
                  <AddressSection
                    addressType="Shipping"
                    formShippingAddress={addresses}
                    onUpdate={(address: IMyAddress, isDefault: boolean) => {
                      const newState = { ...address, defaultShippingAddress: isDefault };
                      setAddresses(newState);
                      onUpdate(newState);
                    }}
                  />
                ) : (
                  <AddressSection
                    addressType="Billing"
                    formShippingAddress={addresses}
                    onUpdate={(address: IMyAddress, isDefault: boolean) => {
                      const newState = { ...address, defaultBillingAddress: isDefault };
                      setAddresses(newState);
                      onUpdate(newState);
                    }}
                  />
                )}
              </Wrapper>
            </div>
          </div>
        </BigPopup>
      )}
    </>
  );
}
