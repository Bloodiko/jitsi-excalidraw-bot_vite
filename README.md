This APP is WIP 

Its supposed to allow for Easy Copy Paste from Jitsi Excalidraw Board.

## How to use

1. Open Jitsi Meeting
2. Open Excalidraw Board
3. Go to the Dev Console and execute the following code:
```javascript
APP.store.getState()['features/whiteboard'].collabDetails
```
4. Copy the result and paste it into Whiteboard.tsx
5. Run the APP (currently bun run dev or npm run start)

## TODO
This is going to be improved.

Excalidraw API and some other functions are attached to the window object for now. 