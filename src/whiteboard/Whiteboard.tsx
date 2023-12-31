/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useRef } from "react";
import {
  ExcalidrawApp,
  serializeAsJSON,
  restore,
  restoreElements,
  generateCollaborationLinkData,
  //convertToExcalidrawElements, // not implemented in version 0.15 of @jitsi/excalidraw as its too far behind main.
} from "@jitsi/excalidraw";

import type { WhiteboardProps } from "../../types/types";

(window as any).excalidrawUtils = {
  restoreElements,
  restore,
  serializeAsJSON,
  generateCollaborationLinkData,
};

// final url wss://excalidraw-backend.jitsi.net/socket.io/?room=186e926f3fb2349e466f2b20ca82f115&EIO=3&transport=websocket

//const collabServerBaseUrl = "http://localhost:3002"; // local development testings
const collabServerBaseUrl = "https://excalidraw-backend.ffmuc.net"; // experimenting with a live public jitsi server

const Whiteboard = ({ collabDetails }: WhiteboardProps): JSX.Element => {
  const excalidrawRef = useRef<any>(null);
  const excalidrawAPIRef = useRef<any>(null);
  const collabAPIRef = useRef<any>(null);

  const getExcalidrawAPI = useCallback((excalidrawAPI: any) => {
    if (excalidrawAPIRef.current) {
      return;
    }
    excalidrawAPIRef.current = excalidrawAPI;
    (window as any).excalidrawUtils.excalidrawAPI = excalidrawAPI;

    // function to export as json
    function exportToJSON() {
      const elements = excalidrawAPI.getSceneElementsIncludingDeleted() || [];
      const json = JSON.stringify(elements);
      return json;
    }

    // function to import from json // TODO: this is not working yet
    function importFromJSON(json: string) {
      const elements = JSON.parse(json);
      excalidrawAPI.updateScene({ elements });

      // get all scene Elements with deleted
      const allElements = excalidrawAPI.getSceneElementsIncludingDeleted();

      // publish all elements to the collab server
      collabAPIRef.current.syncElements(allElements);
    }

    (window as any).excalidrawUtils.exportToJSON = exportToJSON;
    (window as any).excalidrawUtils.importFromJSON = importFromJSON;
  }, []);

  const getCollabAPI = useCallback((collabAPI: any) => {
    if (collabAPIRef.current) {
      return;
    }
    collabAPIRef.current = collabAPI;
    (window as any).excalidrawUtils.collabAPI = collabAPI;
    collabAPIRef.current.setUsername("Whiteboard Bot");
  }, []);

  return (
    <div
      className="whiteboard"
      style={{
        height: "95vh",
        width: "95vw",
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
