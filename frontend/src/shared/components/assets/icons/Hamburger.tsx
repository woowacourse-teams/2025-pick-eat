import { SIZE_MAP, SizeType } from './constants';

function Hamburger({ size }: { size: SizeType }) {
  return (
    <img src="./images/hamburger.svg" alt="menu icon" width={SIZE_MAP[size]} />
  );
}

export default Hamburger;
