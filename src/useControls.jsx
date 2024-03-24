import { useEffect, useState } from "react";

export const useControls = (vehicleApi, chassisApi) => {
  let [controls, setControls] = useState({ });

  useEffect(() => {
    const keyDownPressHandler = (e) => {
      setControls((controls) => ({ ...controls, [e.key.toLowerCase()]: true }));
    }

    const keyUpPressHandler = (e) => {
      setControls((controls) => ({ ...controls, [e.key.toLowerCase()]: false }));
    }
    let scrollEndTimer = null;

    const handleScroll = (e) => {
      // Cancel the previous timer if the user is still scrolling
      clearTimeout(scrollEndTimer);

      // Set movement based on scroll direction
      setControls({ forward: e.deltaY < 0, backward: e.deltaY > 0 });

      // Set a new timer to stop the car after 100ms of inactivity
      scrollEndTimer = setTimeout(() => {
        setControls({ forward: false, backward: false });
      }, 100); // Adjust delay as needed
    }

    
    window.addEventListener("wheel", handleScroll, { passive: true });
    window.addEventListener("keydown", keyDownPressHandler);
    window.addEventListener("keyup", keyUpPressHandler);
    return () => {
      window.removeEventListener("keydown", keyDownPressHandler);
      window.removeEventListener("keyup", keyUpPressHandler);
      window.removeEventListener("wheel", handleScroll);
    }
  }, []);

  useEffect(() => {
    if(!vehicleApi || !chassisApi) return;

    if (controls.forward) {
      vehicleApi.applyEngineForce(250, 2);
      vehicleApi.applyEngineForce(250, 3);
    } else if (controls.backward) {
      vehicleApi.applyEngineForce(-150, 2);
      vehicleApi.applyEngineForce(-150, 3);
    } else {
      vehicleApi.applyEngineForce(0, 2);
      vehicleApi.applyEngineForce(0, 3);
    }

    


    if (controls.r) {
      chassisApi.position.set(-1.5, 0.5, 3);
      chassisApi.velocity.set(0, 0, 0);
      chassisApi.angularVelocity.set(0, 0, 0);
      chassisApi.rotation.set(0, 0, 0);
    }
  }, [controls, vehicleApi, chassisApi]);

  return controls;
}