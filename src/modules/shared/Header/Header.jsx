export default function Header({ title, desc , img }) {
  return (
    <>
      <div className="header-container px-5 mx-2 d-flex align-items-center justify-content-between">
        <div className="caption text-white w-50">
          <h4>{title}</h4>
          <p>{desc}</p>
        </div>
        <div className="logo-header">
          <img className="w-100" src={img} alt="" />
        </div>
      </div>
    </>
  );
}
