import { useEffect, useState } from "react";
import Header from "../shared/Header/Header";
import { axiosInstance, USER_RECIPES } from "../Services/Urls/Urls";
import NoData from "../shared/NoData/NoData";

const FavoretList = () => {
  const [favList, setFavList] = useState([]);
  const getFavList = async () => {
    let res = await axiosInstance.get(USER_RECIPES.GET_FAV_LIST);
    console.log(res.data);
    
    setFavList(res.data.data);
    
  };
  useEffect(() => {
    getFavList();
  }, []);

  return (
    <>
      <Header
        title={`Favorites Itmes!`}
        desc={`You can now add your items that any user can order it from the Application and you can edit`}
      />
      <div>
      {favList.length > 0 ? (
          <div className="row">
          <div className="col-md-4">
            <div>
              <img src="" alt="" />
              <h4>Hello</h4>
              <p>Lorem ipsum dolor sit.</p>
            </div>
          </div>
          </div>
        ) : (
          <NoData />
        )}
      </div>
    </>
  );
};

export default FavoretList;
