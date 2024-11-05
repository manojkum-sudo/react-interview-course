const ProgressBar = ({ progress, bgColor }: any) => {
  return (
    <div style={{ border: "1px solid #000", width: 500, borderRadius: "10px" }}>
      <div
        style={{
          backgroundColor: bgColor,
          borderRadius: "10px",
          width: progress * 5,
        }}
      >
        {progress}
      </div>
    </div>
  );
};

export default ProgressBar;
