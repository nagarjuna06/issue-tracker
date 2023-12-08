import { Button, Spinner } from "react-bootstrap";

const CustomButton = ({
  children,
  bg = "",
  styles,
  loading = false,
  ...props
}) => {
  return (
    <Button
      {...props}
      style={{
        minWidth: "5rem",
        backgroundColor: bg,
        border: 0,
        ...styles,
      }}
      disabled={loading || props.disabled}
      className={`d-flex justify-content-center align-items-center gap-1 ${props?.className}`}
    >
      {loading ? (
        <Spinner
          as="span"
          animation="border"
          size="sm"
          role="status"
          aria-hidden="true"
          className="m-1"
        />
      ) : (
        children
      )}
    </Button>
  );
};

export default CustomButton;
