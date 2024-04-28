import logoImage from "../assets/logo.jpg";
export default function Header() {
  return (
    <div id="main-header">
      <div id="title">
        <img src={logoImage} alt="food picture" />
        <h1>React Food</h1>
      </div>
      <button>Cart</button>
    </div>
  );
}
