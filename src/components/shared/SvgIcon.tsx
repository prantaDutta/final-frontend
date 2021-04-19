interface SvgIconProps {
  classNames?: string;
  strokeWidth?: number;
  d: string;
}

const SvgIcon: React.FC<SvgIconProps> = ({
  d,
  strokeWidth = 2,
  classNames = "w-6 h-6",
}) => {
  return (
    <svg
      className={classNames}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={strokeWidth}
        d={d}
      />
    </svg>
  );
};

export default SvgIcon;
