import React from "react";
import { FieldValues } from "react-hook-form";
import Form from "../../common/form/Form";
import { BackgroundImage } from "../../pages/slow-letter";
import { SelectContainer } from "../../pages/slow-letter/get-info";
import { Address, useSlowLetterInfo } from "../../stores/useSlowLetterInfo";
import AddressFormContext from "./AddressFormContext";

interface Props {
  complete: Function;
}

function AddressForm({ complete }: Props) {
  const {
    address: { zonecode, defaultAddress },
    setAddress,
  } = useSlowLetterInfo();

  const handleAddressSubmit = (data: FieldValues) => {
    setAddress(data as Address);
    complete();
  };

  return (
    <SelectContainer>
      <h2>편지를 받을 주소 정보를 입력해주세요.</h2>
      <Form
        defaultValues={{ zonecode, defaultAddress }}
        onSubmit={handleAddressSubmit}
        inputs={AddressFormContext.getContext()}
        buttonText={"확인"}
      ></Form>
      <BackgroundImage src="/static/images/room-background.png" />
    </SelectContainer>
  );
}

export default AddressForm;
