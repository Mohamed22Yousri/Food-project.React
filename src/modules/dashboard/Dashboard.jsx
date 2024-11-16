import Header from "../shared/Header/Header";
export default function Dashboard({loginData}) {
  return (
    <>
      <Header
        title={`Welcome ${loginData?.userName}`}
        desc={`This is a welcoming screen for the entry of the application , you can now see the options`}
      />

      <div>dashboard</div>
    </>
  );
}
