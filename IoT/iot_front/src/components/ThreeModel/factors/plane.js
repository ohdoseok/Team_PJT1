import Cube_Grass_Single from "../models/Cube_Grass_Single";
import Bridge_Small from "../models/Bridge_Small";
import Cube_Dirt_Single from "../models/Cube_Dirt_Single";

const plane_1 = () => {
  const result = [];
  // for (let x = 0; x < 5; x++) {
  //   for (let z = -5; z < 4; z++) {
  //     if (x < -14 && z > -15) {
  //       result.push(
  //         <Cube_Grass_Single key={`x:${x},y:${z}`} position={[x, -5, z]} />
  //       );
  //       for (let y = -2; y > -5; y--) {
  //         result.push(
  //           <Cube_Dirt_Single
  //             key={`x:${x},y:${y},z:${z}`}
  //             position={[x, y, z]}
  //           />
  //         );
  //       }
  //     } else {
  //       result.push(
  //         <Cube_Grass_Single key={`x:${x},y:${z}`} position={[x, 1, z]} />
  //       );
  //       for (let y = 0; y > -5; y--) {
  //         result.push(
  //           <Cube_Dirt_Single
  //             key={`x:${x},y:${y},z:${z}`}
  //             position={[x, y, z]}
  //           />
  //         );
  //       }
  //     }
  //   }
  // }
  for (let x = -12; x < 13; x++) {
    for (let z = -40; z < -20; z++) {
      result.push(
        <Cube_Grass_Single key={`x:${x},y:${z}`} position={[x, -9, z]} />
      );
      for (let y = -11; y > -15; y--) {
        result.push(
          <Cube_Dirt_Single key={`x:${x},y:${y},z:${z}`} position={[x, y, z]} />
        );
      }
    }
  }
  return result;
};

// const plane_2 = () => {
//   const result = [];
//   for (let x = 0; x < 8; x++) {
//     for (let z = -20; z < -2; z++) {
//       result.push(
//         <Cube_Dirt_Single key={`drit : x:${x}, z:${z}`} position={[x, 1, z]} />
//       );
//       for (let y = 0; y > -5; y--) {
//         result.push(
//           <Cube_Dirt_Single key={`x:${x},y:${y},z:${z}`} position={[x, y, z]} />
//         );
//       }
//     }
//   }
//   return result;
// };

// const bridge = () => {
//   return <Bridge_Small position={[-2.8, 2, -6]} />;
// };

function Plane() {
  return <>{plane_1()}</>;
}

export default Plane;
