import logoDelete from "../../../assets/images/img-delet.png";
export default function NoData() {
  return (
    <>
      <div className="text-center my-4">
        <img src={logoDelete} alt="" />
        <h4 className="mt-4 mb-2">No Data !</h4>
        <p className="text-muted">
          are you sure you want to delete this item ? if you are sure just click
          on delete it
        </p>
      </div>
    </>
  );
}
