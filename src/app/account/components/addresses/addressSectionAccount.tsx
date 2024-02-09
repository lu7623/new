import AddressSection from '@/app/registration/components/addresses/addressSection';
import { useState } from 'react';
import BigPopup from '../passwordChange/popup/passwordChangePopup';
import Wrapper from '../wrapper/wrapper';
import { ChangeAction, ChangeAddresAction, IMyAddress, IMyCustomer } from '@/service/api/CustomerService';
import { FaTrash } from 'react-icons/fa';

type IShippingAddressProps = {
  formShippingAddress: IMyAddress;
  addressType: 'Shipping' | 'Billing';
  handleSubmitChangeAddress: (
    action: ChangeAddresAction,
    actionRemove: ChangeAction,
    address: IMyAddress
  ) => (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
  deleteAddress: (
    action: ChangeAction,
    address: IMyAddress
  ) => (event: React.MouseEvent<HTMLButtonElement>) => Promise<void>;
  onUpdate: (address: IMyAddress, isDefault: boolean) => void;
};

export default function AddressSectionAccount({
  formShippingAddress,
  addressType,
  handleSubmitChangeAddress,
  deleteAddress,
}: IShippingAddressProps) {
  const [isOpen, setIsOpen] = useState(false);

  const [defaultShipping, setDefaultShipping] = useState(false);

  const [addresses, setAddresses] = useState<IMyAddress>(formShippingAddress);

  return (
    <>
      <button
        className="w-28	h-28 rounded outline-none shadow-[5px_7px_6px_1px_rgb(211,238,206,0.45)]"
        type="button"
        onClick={(event) => {
          event.preventDefault();
          setIsOpen(true);
        }}
      >
        {`Look your ${addressType} address`}
      </button>
      {isOpen && (
        <BigPopup
          onClose={(event) => {
            event.preventDefault();
            setIsOpen(false);
          }}
        >
          <div className="font-serif flex justify-center flex-col items-center w-full mt-14">
            <div className="lg:w-3/6 md:w-4/5 sm:w-4/5 min-[320px]:w-4/5">
              <Wrapper
                title={`${addressType} address`}
                handleSubmit={handleSubmitChangeAddress('changeAddress', `setDefault${addressType}Address`, addresses)}
              >
                <AddressSection
                  addressType={addressType}
                  formShippingAddress={addresses}
                  onUpdate={(address: IMyAddress, isDefault: boolean) => {
                    const newState = { ...address, [`default${addressType}Address`]: isDefault };
                    setAddresses({ ...address, ...newState });
                    setDefaultShipping(isDefault);
                  }}
                />
              </Wrapper>
              <button
                type="button"
                className="absolute xl:right-[300px] lg:right-[220px] md:right-[70px] min-[300px]:right-[70px]"
                onClick={deleteAddress('removeAddress', addresses)}
              >
                {<FaTrash style={{ color: '#276339' }} title="Delete" />}
              </button>
            </div>
          </div>
        </BigPopup>
      )}
    </>
  );
}
