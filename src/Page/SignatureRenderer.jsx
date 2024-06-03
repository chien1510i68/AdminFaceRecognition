 export const SignatureRenderer = ({ value }) => {
    if (value && value.length > 0) { // Check if value exists and has content
      return (
        <img
          src={`data:image/png;base64,${value}`}
          alt="signature"
          style={{ width: '100px', height: '40px' }}
        />
      );
    }
    return null; // Return null if no valid value
  };
  