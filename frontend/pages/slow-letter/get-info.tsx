import { useState } from "react";
import styled from "styled-components";
import AddressForm from "../../components/slow/AddressForm";
import SelectMethod from "../../components/slow/SelectMethod";
import EmailForm from "../../components/slow/EmailForm";
import { useRouter } from "next/navigation";
import PostCodeForm from "../../components/slow/PostCodeForm";
import SlowBackHeader from "../../components/slow/BackHeader";
import { BackgroundImage } from ".";

const PROCESS = {
  SELECT: "SELECT",
  EMAIL: "EMAIL",
  POSTCODE: "POSTCODE",
  ADDRESS: "ADDRESS",
};

function getInfo() {
  const [process, setProcess] = useState(PROCESS.SELECT);
  const router = useRouter();

  switch (process) {
    case PROCESS.SELECT:
      return (
        <>
          <SlowBackHeader onBackClick={() => router.push("/slow-letter")} />
          <SelectMethod
            selectMail={() => setProcess(PROCESS.EMAIL)}
            selectPost={() => setProcess(PROCESS.POSTCODE)}
          />
          <BackgroundImage src="/static/images/room-background.png" />
        </>
      );
    case PROCESS.EMAIL:
      return (
        <>
          <SlowBackHeader onBackClick={() => setProcess(PROCESS.SELECT)} />
          <EmailForm
            complete={() => router.push("/slow-letter/write?type=email")}
          />
          <BackgroundImage src="/static/images/room-background.png" />
        </>
      );
    case PROCESS.POSTCODE:
      return (
        <>
          <SlowBackHeader onBackClick={() => setProcess(PROCESS.SELECT)} />
          <PostCodeForm complete={() => setProcess(PROCESS.ADDRESS)} />
          <BackgroundImage src="/static/images/room-background.png" />
        </>
      );
    case PROCESS.ADDRESS:
      return (
        <>
          <SlowBackHeader onBackClick={() => setProcess(PROCESS.POSTCODE)} />
          <AddressForm
            complete={() => router.push("/slow-letter/write?type=post")}
          />
          <BackgroundImage src="/static/images/room-background.png" />
        </>
      );
  }
}

export default getInfo;

export const SelectContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 30px;

  h3 {
    position: relative;
    z-index: 1;
    margin: 0;
    width: 85%;
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
