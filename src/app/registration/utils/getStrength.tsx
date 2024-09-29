export const getStrength = (n: number) => {
  if (n < 4) return <span className=" text-red-600 font-bold">weak</span>;
  else if (n < 8) return <span className=" text-yellow-600 font-bold">medium</span>;
  else return <span className=" text-green-600 font-bold">strong</span>;
};
