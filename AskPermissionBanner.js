import { useState, useEffect } from "react";
import styled from "styled-components";

export const AskPermissionBanner = ({ setPermission }) => {
  const [hasAsked, setHasAsked] = useState(false);
  return (
    <Wrapper>
      {hasAsked ? (
        <P>
          Need permission to device sensors.{"\n"}Please clear site settings in
          'settings' {"=>"} 'Safari' and reload the page.
        </P>
      ) : (
        <RequestButton
          onClick={() => {
            if (
              typeof DeviceOrientationEvent.requestPermission === "function"
            ) {
              DeviceOrientationEvent.requestPermission()
                .then((permissionState) => {
                  console.log({ permissionState });
                  if (permissionState === "granted") {
                    setPermission(true);
                  } else {
                    setHasAsked(true);
                  }
                })
                .catch(console.error);
            } else {
              // handle regular non iOS 13+ devices
              setPermission(true);
              // window.addEventListener("deviceorientation", () => {});
            }
          }}
        >
          Enter
        </RequestButton>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  background-color: black;
  z-index: 11;
  justify-content: center;
  padding: 0 20px;
`;

const RequestButton = styled.button`
  background-color: white;
  color: black;
  width: 300px;
  height: 100px;
  font-size: 30px;
  pointer-events: all;
`;

const P = styled.p`
  color: white;
  text-align: center;
  white-space: break-spaces;
  font-size: 30px;
`;
