import React from "react";
import styled from "styled-components";

interface Props {
  onClick: () => void;
}

function PlusIcon({ onClick }: Props) {
  return (
    <Container onClick={onClick} className="dont-save">
      <svg
        width="52"
        height="52"
        viewBox="0 0 52 52"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g filter="url(#filter0_d_12_2578)">
          <circle cx="24" cy="24" r="20" fill="#0ECA92" />
        </g>
        <line
          x1="24"
          y1="18"
          x2="24"
          y2="32"
          stroke="white"
          strokeWidth="6"
          strokeLinecap="round"
        />
        <line
          x1="17"
          y1="24"
          x2="31"
          y2="24"
          stroke="white"
          strokeWidth="6"
          strokeLinecap="round"
        />
        <defs>
          <filter
            id="filter0_d_12_2578"
            x="0"
            y="0"
            width="52"
            height="52"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feMorphology
              radius="1"
              operator="dilate"
              in="SourceAlpha"
              result="effect1_dropShadow_12_2578"
            />
            <feOffset dx="2" dy="2" />
            <feGaussianBlur stdDeviation="2.5" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0.241962 0 0 0 0 0.306636 0 0 0 0 0.320833 0 0 0 0.4 0"
            />
            <feBlend
              mode="normal"
              in2="BackgroundImageFix"
              result="effect1_dropShadow_12_2578"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow_12_2578"
              result="shape"
            />
          </filter>
        </defs>
      </svg>
    </Container>
  );
}

export default PlusIcon;

const Container = styled.span`
  position: fixed;
  right: 0;
  bottom: 8%;
  transform: translate(-50%, -50%);
  z-index: 5;

  @media ${({ theme }) => theme.device.large} {
    position: relative;
    left: 600px;
    top: 450px;
  }

  @media ${({ theme }) => theme.device.small} {
    right: 3%;
    bottom: 7%;
    svg {
      width: 40px;
    }
  }
`;
