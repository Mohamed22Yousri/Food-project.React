import Header from "../shared/Header/Header";
import logoDash from "../../assets/images/eating vegan food-rafiki.png"
export default function Dashboard({loginData}) {
  return (
    <>
      <Header
        title={`Welcome ${loginData?.userName}`}
        desc={`This is a welcoming screen for the entry of the application , you can now see the options`}
        img={logoDash}
      />

      <div>dashboard</div>
    </>
  );
}
