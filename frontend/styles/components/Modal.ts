import styled from "styled-components";

const Overlay = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: calc(var(--vh, 1vh) * 100);

  background: rgba(111, 111, 111, 0.8);

  z-index: 20;
`;

const Modal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 80%;
  height: 20%;

  background: white;
  border-radius: 10px;
  color: #222222;

  z-index: 30;
`;

export { Overlay, Modal };
