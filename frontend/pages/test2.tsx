import { useForm } from "react-hook-form";
import styled from "styled-components";
import Button from "../common/button/Button";
import { GreenRightCorner } from "../common/button/ButtonStyle";
import { LeftButton } from "../styles/components/Button";
import DaumPostCode from "react-daum-postcode";
import { FormTitle, Input, InputContainer } from "../styles/components/Form";
import Form from "../common/form/Form";
import EmailFormContext from "../components/slow/EmailFormContext";
import AddressFormContext from "../components/slow/AddressFormContext";
import { useEffect, useRef } from "react";

function test2() {
  const zonecodeRef = useRef<HTMLInputElement>();

  const defaultAddressRef = useRef<HTMLInputElement>();

  useEffect(() => {
    zonecodeRef.current = document.querySelector(
      "input[name='zonecode']"
    ) as HTMLInputElement;

    defaultAddressRef.current = document.querySelector(
      "input[name='defaultAddress']"
    ) as HTMLInputElement;
  }, []);

  const completeAddress = (data: any) => {
    let fullAddress = data.address;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }
    zonecodeRef.current.value = data.zonecode;
    defaultAddressRef.current.value = fullAddress;
  };

  const handleEmailSubmit = () => {};
  const handleAddressSubmit = () => {};
  return (
    <div>
      <h2>편지 수령 방식을 선택해주세요.</h2>
      <Button Style={GreenRightCorner}>메일로 받을게요.</Button>
      <Form
        onSubmit={handleEmailSubmit}
        inputs={EmailFormContext.getContext()}
        buttonText={"확인"}
      >
        <h2>편지를 받을 이메일을 입력해주세요.</h2>
      </Form>
      <Button Style={GreenRightCorner}>우편으로 받을게요.</Button>
      <DaumPostCode autoClose onComplete={completeAddress} />
      <Form
        onSubmit={handleAddressSubmit}
        inputs={AddressFormContext.getContext()}
        buttonText={"확인"}
      >
        편지를 받을 주소 정보를 입력해주세요.
      </Form>
    </div>
  );
}

export default test2;

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;

  ${FormTitle} {
    margin-bottom: 8px;
  }
`;
