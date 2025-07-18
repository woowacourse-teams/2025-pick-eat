import { SIZE_MAP, SizeType } from './constants';

type Props = {
  size: SizeType;
} & React.ImgHTMLAttributes<HTMLImageElement>;

function Trash({ size, ...props }: Props) {
  return (
    <img
      src="./images/trash.svg"
      alt="trash icon"
      width={SIZE_MAP[size]}
      {...props}
    />
  );
}

export default Trash;
