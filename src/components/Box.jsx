function Box({ val, handleClick, highlight }) {
  const symbol = val === 1 ? "X" : val === 2 ? "O" : "";

  let clickCss = "";

  if(val === 1){
    clickCss = "one";
  }else if(val === 2){
    clickCss = 'two';
  }

  return (
    <div
      className={`box ${highlight ? "highlight" : ""} ${clickCss} `}
      onClick={handleClick}
    >
      {symbol}
    </div>
  );
}

export default Box;
