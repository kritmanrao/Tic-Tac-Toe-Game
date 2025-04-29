
function Box({handleClick,val}) {
  let turn = "";
  let simbol;
  if (val == 1) {
    turn = "one";
    simbol = 'X'
  }
  if (val == 2) {
    turn = "two";
    simbol = 'O'
  }

  return <div className={` box  ${turn}`} onClick={handleClick}>
    {simbol}
  </div>;
}

export default Box;
