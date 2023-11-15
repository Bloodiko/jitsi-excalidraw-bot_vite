/* eslint-disable @typescript-eslint/no-explicit-any */
import Whiteboard from "./whiteboard/Whiteboard";

//import { Excalidraw } from "@jitsi/excalidraw";

import type { CollabDetails } from "../types/types";
import { useState } from "react";

function App() {
  const [collabDetails, setCollabDetails] = useState<CollabDetails | undefined>(
    undefined
  );

  (window as any).setCollabDetails = setCollabDetails;

  return (
    <>
      {collabDetails && <Whiteboard collabDetails={collabDetails}></Whiteboard>}
      {!collabDetails && <div>!Waiting for collab details</div>}
    </>
  );
}

export default App;
