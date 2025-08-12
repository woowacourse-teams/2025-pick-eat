type Props = {
  value: string;
};

function ProgressBar({ value }: Props) {
  return <progress value={value} max="100" />;
}

export default ProgressBar;
