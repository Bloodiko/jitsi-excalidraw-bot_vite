/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useRef } from "react";
import { ExcalidrawApp, serializeAsJSON, restore } from "@jitsi/excalidraw";

(window as any).serializeAsJSON = serializeAsJSON;
(window as any).restore = restore;

const collabDetails = {
  roomId: "colouredspicesexperiencelong",
  roomKey: "KCkByxCRfqTK8MY7-BSYkg",
};

(window as any).collabDetails = collabDetails;

// final url wss://excalidraw-backend.jitsi.net/socket.io/?room=186e926f3fb2349e466f2b20ca82f115&EIO=3&transport=websocket

const collabServerBaseUrl = "https://excalidraw-backend.jitsi.net";

const Whiteboard = (): JSX.Element => {
  const excalidrawRef = useRef<any>(null);
  const excalidrawAPIRef = useRef<any>(null);
  const collabAPIRef = useRef<any>(null);

  const getExcalidrawAPI = useCallback((excalidrawAPI: any) => {
    if (excalidrawAPIRef.current) {
      return;
    }
    excalidrawAPIRef.current = excalidrawAPI;
    (window as any).excalidrawAPI = excalidrawAPI;
  }, []);

  const getCollabAPI = useCallback((collabAPI: any) => {
    if (collabAPIRef.current) {
      return;
    }
    collabAPIRef.current = collabAPI;
    (window as any).collabAPI = collabAPI;
    collabAPIRef.current.setUsername("Whiteboard Bot");
  }, []);

  return (
    <div
      className="whiteboard"
      style={{
        height: "80vh",
        width: "80vw",
        display: "block",
      }}
    >
      <div
        style={{
          height: "100%",
        }}
        className="excalidraw-wrapper"
      >
        {
          /*
           * Excalidraw renders a few lvl 2 headings. This is
           * quite fortunate, because we actually use lvl 1
           * headings to mark the big sections of our app. So make
           * sure to mark the Excalidraw context with a lvl 1
           * heading before showing the whiteboard.
           */
          <span aria-level={1} className="sr-only" role="heading">
            Whiteboard
          </span>
        }
        <ExcalidrawApp
          collabDetails={collabDetails}
          collabServerUrl={collabServerBaseUrl}
          excalidraw={{
            isCollaborating: true,

            // @ts-expect-error -- any type in ref not bothering.
            ref: excalidrawRef,
            theme: "light",
          }}
          getCollabAPI={getCollabAPI}
          getExcalidrawAPI={getExcalidrawAPI}
        />
      </div>
    </div>
  );
};

export default Whiteboard;
