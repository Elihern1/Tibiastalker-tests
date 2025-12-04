type Props = {
  size: number;
};

function TibiaLogo1({ size }: Props) {
  return (
    <img
      src="/logo/logo2.svg"
      alt="Tibia Logo"
      width={size}
      height={size}
      loading="lazy"  
      style={{ display: "block" }}
    />
  );
}

export default TibiaLogo1;
