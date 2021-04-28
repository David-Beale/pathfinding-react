import { useRef } from "react";
import { useSelector } from "react-redux";

export const useMouseHandler = (playerRef, cameraRef) => {
  const roadWorks = useSelector(({ roadWorks }) => roadWorks.setting);
  const clickStart = useRef(null);
  const prevCoords = useRef(null);

  //handle drawer resize
  const handleMouseDown = (e) => {
    const { clientX, clientY } = e;
    clickStart.current = { x: clientX, y: clientY };
    cameraRef.current.prev = { x: clientX, y: clientY };
    prevCoords.current = { x: clientX, y: clientY };
    document.addEventListener("mouseup", handleMouseUp, true);
    document.addEventListener("mousemove", handleMouseMove, true);
  };

  const handleMouseUp = (e) => {
    document.removeEventListener("mouseup", handleMouseUp, true);
    document.removeEventListener("mousemove", handleMouseMove, true);
    const { clientX, clientY } = e;
    const diffX = Math.abs(clickStart.current.x - clientX);
    const diffY = Math.abs(clickStart.current.y - clientY);
    if (diffX + diffY < 5) onClick(e);
  };

  const handleMouseMove = (e) => {
    if (roadWorks) {
      handleRoadWorks(e);
      return;
    }
    cameraRef.current.drag(e);
  };
  const handleRoadWorks = (e) => {
    // let xCoord = (e.pageX + tiles.cameraX) / tiles.cameraScale;
    //     let yCoord = (e.pageY + tiles.cameraY) / tiles.cameraScale;
    //     let clickX = Math.floor(xCoord / 50) * 50;
    //     let clickY = Math.floor(yCoord / 50) * 50;
    //     for (let i = 0; i < arrayOfVertices.length; i++) {
    //       let thisVertex = map.graphObj[arrayOfVertices[i]];
    //       if (thisVertex.x === clickX && thisVertex.y === clickY) {
    //         if (roadWorksAdd) {
    //           thisVertex.roadWorks = true;
    //         } else thisVertex.roadWorks = false;
    //         i = arrayOfVertices.length; //end loop when found
    //       }
    //     }
  };

  const onClick = (e) => {
    playerRef.current.click(e);
    //     //// If there is no player car already on the map and we are comparing paths:
    //     if (player.compare && !compareClickCount) {
    //       $("#text").html("Select a destination");
    //       compareClickCount = 1;
    //     }
    //     //If there is a player car on the map
    //     else if (player.compare && compareClickCount === 1) {
    //       $("#distance").removeClass("selected");
    //       $("#time").removeClass("selected");
    //       $("#text").html("Select a method");
    //       compareClickCount = 2;
  };

  const onWheel = (e) => {
    cameraRef.current.scroll(e);
  };
  return [handleMouseDown, onWheel];
};
