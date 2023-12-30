import { useForm } from "react-hook-form";
import { useState } from "react";
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

function getInfo() {
  const [isSelectClick, setIsSelectClick] = useState({
    email: false,
    post: false,
  });
  const zonecodeRef = useRef<HTMLInputElement>();

  const defaultAddressRef = useRef<HTMLInputElement>();

  useEffect(() => {
    zonecodeRef.current = document.querySelector("input[name='zonecode']") as HTMLInputElement;

    defaultAddressRef.current = document.querySelector("input[name='defaultAddress']") as HTMLInputElement;
  }, []);

  const completeAddress = (data: any) => {
    let fullAddress = data.address;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress += extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }
    zonecodeRef.current.value = data.zonecode;
    defaultAddressRef.current.value = fullAddress;
  };

  function emailView() {
    return (
      <Form onSubmit={handleEmailSubmit} inputs={EmailFormContext.getContext()} buttonText={"확인"}>
        <h2>편지를 받을 이메일을 입력해주세요.</h2>
      </Form>
    );
  }

  function postView() {
    return (
      <>
        <h2>편지를 받을 주소 정보를 입력해주세요.</h2>
        <DaumPostCode autoClose onComplete={completeAddress} />
        <Form onSubmit={handleAddressSubmit} inputs={AddressFormContext.getContext()} buttonText={"확인"}></Form>
      </>
    );
  }

  const handleEmailSubmit = () => {};
  const handleAddressSubmit = () => {};
  return (
    <div>
      <SelectContainer isClick={isSelectClick.email || isSelectClick.post}>
        <h2>편지 수령 방식을 선택해주세요.</h2>
        <Button
          Style={GreenRightCorner}
          props={{
            onClick: () =>
              setIsSelectClick(prev => {
                return { ...prev, email: true };
              }),
          }}
        >
          메일로 받을게요.
        </Button>
        <Button
          Style={GreenRightCorner}
          props={{
            onClick: () =>
              setIsSelectClick(prev => {
                return { ...prev, post: true };
              }),
          }}
        >
          우편으로 받을게요.
        </Button>
      </SelectContainer>
      {isSelectClick.email && emailView()}
      {isSelectClick.post && postView()}
    </div>
  );
}

export default getInfo;

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;

  ${FormTitle} {
    margin-bottom: 8px;
  }
`;

const SelectContainer = styled.div<{ isClick: boolean }>`
  display: ${props => (props.isClick ? "none" : "block")};
  &Button {
    margin-bottom: 10px;
  }
`;
