import { useState } from "react";
import styled from "styled-components";
import DaumPostCode from "react-daum-postcode";
import Form from "../../common/form/Form";
import EmailFormContext from "../../components/slow/EmailFormContext";
import { BackgroundImage } from ".";
import { useSlowLetterInfo } from "../../stores/useSlowLetterInfo";
import AddressForm from "../../components/slow/AddressForm";
import SelectMethod from "../../components/slow/SelectMethod";
import { FieldValues } from "react-hook-form";
import EmailForm from "../../components/slow/EmailForm";
import { Router } from "next/router";
import { useRouter } from "next/navigation";
import PostCodeForm from "../../components/slow/PostCodeForm";

const PROCESS = {
  SELECT: "SELECT",
  EMAIL: "EMAIL",
  POSTCODE: "POSTCODE",
  ADDRESS: "ADDRESS",
  COMPLETE_EMAIL: "COMPLETE_EMAIL",
  COMPLETE_POST: "COMPLETE_POST",
};

function getInfo() {
  const [process, setProcess] = useState(PROCESS.SELECT);
  const router = useRouter();

  switch (process) {
    case PROCESS.SELECT:
      return (
        <SelectMethod
          selectMail={() => setProcess(PROCESS.EMAIL)}
          selectPost={() => setProcess(PROCESS.POSTCODE)}
        />
      );
    case PROCESS.EMAIL:
      return (
        <EmailForm
          complete={() => router.push("/slow-letter/write?type=email")}
        />
      );
    case PROCESS.POSTCODE:
      return <PostCodeForm complete={() => setProcess(PROCESS.ADDRESS)} />;
    case PROCESS.ADDRESS:
      return (
        <AddressForm
          complete={() => router.push("/slow-letter/write?type=post")}
        />
      );
  }
}

export default getInfo;

export const SelectContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 30px;

  h2 {
    position: relative;
    z-index: 1;
    margin: 0;

    width: 90%;
    top: 10%;
    left: 50%;
    transform: translateX(-50%);
  }
  Button {
    margin-bottom: 10px;
    position: relative;
    z-index: 1;
    width: 90%;
    left: 50%;
    transform: translateX(-50%);
    top: 90%;
  }

  form {
    position: relative;
    z-index: 1;
    width: 90%;
    left: 50%;
    transform: translateX(-50%);
    top: 10%;

    input {
      background-color: white;
    }

    Button {
      width: 100%;
      top: 0;
    }
  }

  .postcode-input {
    position: relative;
    z-index: 1;
    width: 90% !important;
    left: 50%;
    transform: translateX(-50%);
    top: 10%;
  }
`;
