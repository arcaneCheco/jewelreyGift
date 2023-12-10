import { useEffect, useState } from "react";
import { UseMobileBanner } from "./UseMobileBanner";
import { UsePWABanner } from "./UsePWABanner";
import { Experience } from "./World";
import { RotateDeviceBanner } from "./RotateDeviceBanner";
import { AskPermissionBanner } from "./AskPermissionBanner";
import { MessagePopups } from "./MessagePopups";
import { Chatbot } from "./Chatbot";
import styled from "styled-components";

export const App = () => {
  const [isMobile, setIsMobile] = useState(true);
  const [isPWA, setIsPWA] = useState(true);
  const [isLandscape, setIsLandscape] = useState(
    !window.matchMedia("(orientation: portrait)").matches
  );
  const [isPermission, setIsPermission] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsMobile(navigator.userAgent.includes("iPhone"));
    setIsPWA(window.navigator.standalone);
  }, []);

  useEffect(() => {
    const handler = (e) => {
      const portrait = e.matches;
      console.log({ portrait });
      setIsLandscape(!portrait);
    };
    window
      .matchMedia("(orientation: portrait)")
      .addEventListener("change", handler);

    return window
      .matchMedia("(orientation: portrait)")
      .removeEventListener("change", handler);
  }, []);

  if (!isMobile) return <UseMobileBanner />;

  if (!isPWA) return <UsePWABanner />;

  if (!isPermission)
    return <AskPermissionBanner setPermission={setIsPermission} />;

  return (
    <Container>
      {!isLandscape && <RotateDeviceBanner />}
      <Experience setLoaded={setIsLoaded} />
      {isLoaded && <MessagePopups />}
      {isLoaded && <Chatbot />}
    </Container>
  );
};

const Container = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
`;
