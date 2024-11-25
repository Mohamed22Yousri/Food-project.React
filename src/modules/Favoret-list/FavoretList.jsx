import { useEffect, useState } from "react";
import Header from "../shared/Header/Header";
import { axiosInstance, USER_RECIPES } from "../Services/Urls/Urls";
import NoData from "../shared/NoData/NoData";
import logoDelete from "../../assets/images/img-delet.png";

const FavoretList = () => {
  const [favList, setFavList] = useState([]);
  const getFavList = async () => {
    let res = await axiosInstance.get(USER_RECIPES.GET_FAV_LIST);
    console.log(res.data);

    setFavList(res.data.data);
  };
  const removeFavList = async (id) => {
     await axiosInstance.delete(USER_RECIPES.DELETE_FAV_LIST(id));
    getFavList()

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
      <div className="container-fluid">
        <div className="row">
          {favList.length > 0 ? (
            favList.map((favItem) => {
              return (
                <div className="col-md-4 col-sm-6 col-12" key={favItem.id}>
                  <div className="item-fav shadow-lg p-3 mb-5 bg-body-tertiary rounded rounded-5">
                    <div className="mt-2 mb-3 text-end">
                      {" "}
                      <i
                      onClick={()=>removeFavList(favItem.id)}
                        style={{
                          fontSize: "30px",
                          color: "red",
                          cursor: "pointer",
                        }}
                        className="fa fa-heart"
                      ></i>
                    </div>
                    {favItem?.recipe?.imagePath ? (
                      <div className="text-center">
                        <img
                          style={{ height: "350px" }}
                          className="img-fluid"
                          src={`https://upskilling-egypt.com:3006/${favItem?.recipe?.imagePath}`}
                          alt=""
                        />
                      </div>
                    ) : (
                      <img className="img-fluid" src={logoDelete} alt="" />
                    )}{" "}
                    <h4 className="my-3">{favItem?.recipe?.name}</h4>
                    <p className=" text-muted">
                      {favItem?.recipe?.description}
                    </p>
                  </div>
                </div>
              );
            })
          ) : (
            <NoData />
          )}
        </div>
      </div>
    </>
  );
};

export default FavoretList;
