import styled from "styled-components";

const HeaderLayout = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
`;

const LayoutSpan = styled.span`
  width: 40px;
`;

const FormLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export { HeaderLayout, LayoutSpan, FormLayout };
