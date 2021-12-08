function Spacer({ axis, size }) {
  const styles = {
    display: axis === 'horizontal' ? 'inline' : 'block',
    width: axis === 'horizontal' ? size : 0,
    height: axis === 'horizontal' ? 0 : size,
  };

  return (
    <hr style={{ ...styles, border: 'none', margin: '0', padding: '0' }} />
  );
}

export default Spacer;
