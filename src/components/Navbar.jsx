import Login from './Login';

const Header = () => {
  return (
    <>
      <header className="header">
        <h3 className="header_title">React & Firebase Chat</h3>
        <Login />
      </header>
      <hr className="hr" />
    </>
  );
};

export default Header;
