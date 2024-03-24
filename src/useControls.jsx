import { useEffect, useState } from "react";

export const useControls = (vehicleApi, chassisApi, resetSignal, isVisible) => {
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
      setControls({ forward: e.deltaY > 0, backward: e.deltaY < 0 });

      // Set a new timer to stop the car after 100ms of inactivity
      scrollEndTimer = setTimeout(() => {
        setControls({ forward: false, backward: false });
      }, 300); // Adjust delay as needed
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
    if(!vehicleApi || !chassisApi || !isVisible) return;

    if (controls.forward || controls.w) {
      vehicleApi.applyEngineForce(400, 2);
      vehicleApi.applyEngineForce(400, 3);
      // vehicleApi.setBrake(0, 2);
      // vehicleApi.setBrake(0, 3);
    } else if (controls.backward || controls.s) {
      vehicleApi.applyEngineForce(-150, 2);
      vehicleApi.applyEngineForce(-150, 3);
    } else {
      // const vel = chassisApi.vecl;
      // const unsub = chassisApi.velocity.subscribe((v) => {
      //   const [vx, vy, vz] = v;
      //   chassisApi.velocity.set(vx , vy , vz - 0.1 * Math.sign(vz))
      //   if (Math.abs(vz) < 0.1) {
      //     chassisApi.velocity.set(0, 0,0)
      //     unsub();
      //   }
      // })

      // console.log(vel)
      // chassisApi.velocity.set(vel.x/2, vel.y/2, vel.z/2)
      vehicleApi.applyEngineForce(0, 2);
      vehicleApi.applyEngineForce(0, 3);
      // for (let i = 0; i < 4; i++) {
      //   vehicleApi.setBrake(100, i);
      // }
      // vehicleApi.setBrake(10, 2);
      // vehicleApi.setBrake(10, 3);
    }

    


    if (controls.r || resetSignal) {
      chassisApi.position.set(-1.5, 0.5, 3);
      chassisApi.velocity.set(0, 0, 0);
      chassisApi.angularVelocity.set(0, 0, 0);
      chassisApi.rotation.set(0, 0, 0);
      console.log(vehicleApi)
    }
  }, [controls, vehicleApi, chassisApi]);

  return controls;
}