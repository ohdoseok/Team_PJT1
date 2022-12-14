import Grass_2 from "../models/Grass_2";
import Grass_3 from "../models/Grass_3";
import Tree from "../models/Tree";

const grass_selector = () => {
  const minx = -8;
  const maxx = 8;

  const minz = -4;
  const maxz = 6;

  const x = Math.floor(Math.random() * (maxx - minx) + minx);
  const z = Math.floor(Math.random() * (maxz - minz) + minz);

  const type = Math.floor(Math.random());
  const grass = [
    <Grass_2 key={Date.now()} position={[x, -4, z]} />,
    <Grass_3 key={Date.now()} position={[x, -4, z]} />,
  ];
  return grass[type];
};

const grass = () => {
  const result = [];
  const cloud_length = Math.floor(Math.random() * 40 + 20);
  let x = 0;
  while (x < cloud_length) {
    result.push(grass_selector());
    x++;
  }
  return result;
};

function Grass() {
  return (
    <>
      <Tree position={[-1, -8, -40]} />
      <Tree position={[-3, -8, -40]} />
      <Tree position={[-5, -8, -40]} />
      <Tree position={[-7, -8, -40]} />
      <Tree position={[-9, -8, -40]} />
      <Tree position={[-9, -8, -40]} />
      <Tree position={[-7, -8, -40]} />

      <Tree position={[8, -8, -40]} />
      <Tree position={[11, -8, -40]} />
      <Tree position={[13, -8, -40]} />
      <Tree position={[-7, -8, -40]} />
      <Tree position={[-7, -8, -40]} />
      <Tree position={[-7, -8, -40]} />
      <Tree position={[-7, -8, -40]} />
    </>
  );
}

export default Grass;
