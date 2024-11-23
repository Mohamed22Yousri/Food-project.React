import { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import logoHeader from "../../../assets/images/category-logo.png";
import logoDelete from "../../../assets/images/img-delet.png";
import { axiosInstance, USERS_URLS } from "../../Services/Urls/Urls";
import Header from "../../shared/Header/Header";
import NoData from "../../shared/NoData/NoData";
import DeleteConformation from "../../shared/DeleteConformation/DeleteConformation";

export default function UserList() {
  const [nameValu, setNameValu] = useState("");
  const [countryValu, setCountryValu] = useState("");
  const [groupValu, setGroupValu] = useState("");
  const [userList, setuserList] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState();
  const [selectedUserDetails, setSelectedUserDetails] = useState(null);

  const closeDeleteModal = () => setShowDeleteModal(false);
  const closeDetailsModal = () => setShowDetailsModal(false);

  const openDeleteModal = (id) => {
    setShowDeleteModal(true);
    setSelectedUserId(id);
  };

  const openDetailsModal = async (id) => {
    setShowDetailsModal(true);
    try {
      const res = await axiosInstance.get(
        `${USERS_URLS.DELETE_AND_VIEW_USER(id)}`
      );
      setSelectedUserDetails(res.data);
    } catch (error) {
      console.log("Error fetching user details:", error);
    }
  };

  const deleteUser = async () => {
    try {
      await axiosInstance.delete(
        USERS_URLS.DELETE_AND_VIEW_USER(selectedUserId)
      );
      toast.success("User Deleted");
      getUser();
      closeDeleteModal();
    } catch (error) {
      toast.error("Failed to delete user");
      console.error(error);
    }
  };

  const getUser = async (name, country, group) => {
    try {
      const res = await axiosInstance.get(USERS_URLS.USERS_LIST, {
        params: {
          pageSize: 10,
          pageNumber: 1,
          userName: name,
          country: country,
          groups: group,
        },
      });

      setuserList(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getNameVal = (input) => {
    setNameValu(input.target.value);
    getUser(input.target.value, countryValu);
  };
  const getEmailVal = (input) => {
    setCountryValu(input.target.value);
    getUser(nameValu, input.target.value, groupValu);
  };
  const getGroupVal = (input) => {
    setGroupValu(input.target.value);
    getUser(nameValu, countryValu, input.target.value);
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      <Header
        title="User List"
        img={logoHeader}
        desc="You can now add your items that any user can order it from the Application and you can edit"
      />
      <div className="container-fluid my-4">
        <div className="pt-2 pb-3">
          <h4>Users Table Details</h4>
        </div>
        <div>
          <div className="row my-4">
            <div className="col-lg-6 col-sm-12">
              <input
                onChange={getNameVal}
                type="text"
                placeholder="User Name ..."
                className="form-control w-100"
              />
            </div>
            <div className="col-lg-3 col-sm-12">
              <input
                onChange={getEmailVal}
                type="text"
                placeholder="country ..."
                className="form-control w-100"
              />
            </div>
            <div className="col-lg-3 col-sm-12">
              <select
                onChange={getGroupVal}
                className="form-select py-2 w-100 "
                aria-label="Default select example"
              >
                <option selected value="">
                  Status
                </option>
                <option value="1">Admin</option>
                <option value="2">User</option>
              </select>{" "}
            </div>
          </div>
        </div>
        {userList.length > 0 ? (
          <div>
            <table className="table text-center mt-2 .table-container">
              <thead>
                <tr className="table-primary">
                  <th scope="col">UserName</th>
                  <th scope="col">Images</th>
                  <th scope="col">Email Address</th>
                  <th scope="col">Country</th>
                  <th scope="col">Status</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {userList.map((user) => (
                  <tr key={user?.id}>
                    <td className="align-middle">{user?.userName}</td>
                    <td style={{ width: "20%" }}>
                      <div className="p-0">
                        {user?.imagePath ? (
                          <img
                            className="w-25"
                            src={`https://upskilling-egypt.com:3006/${user?.imagePath}`}
                            alt=""
                          />
                        ) : (
                          <img className="w-25" src={logoDelete} alt="" />
                        )}
                      </div>
                    </td>
                    <td className="align-middle">{user?.email}</td>
                    <td className="w-25 align-middle">{user?.country}</td>
                    <td className="align-middle">{user?.group?.name}</td>
                    <td className="align-middle">
                      <i
                        onClick={() => openDetailsModal(user?.id)}
                        style={{ cursor: "pointer" }}
                        className="fa-solid fa-eye text-success mx-2"
                      ></i>
                      <i
                        onClick={() => openDeleteModal(user?.id)}
                        style={{ cursor: "pointer" }}
                        className="fa-solid fa-trash mx-2 text-danger"
                      ></i>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <NoData />
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <DeleteConformation
        show={showDeleteModal}
        deleteFun={deleteUser}
        handleClose={closeDeleteModal}
        deleteItem="User"
      />

      {selectedUserDetails && (
        <Modal show={showDetailsModal} onHide={closeDetailsModal} centered>
          <Modal.Header closeButton className="bg-success text-white">
            <Modal.Title>User Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="user-details-modal text-center">
              <div className="detail-item my-2">
                <strong className="px-2">UserName:</strong>
                <span>{selectedUserDetails.userName}</span>
              </div>
              <div className="detail-item my-2">
                <strong className="px-2">Email:</strong>
                <span>{selectedUserDetails.email}</span>
              </div>
              <div className="detail-item my-2">
                <strong className="px-2">Country:</strong>
                <span>{selectedUserDetails.country}</span>
              </div>
              <div className="detail-item my-2">
                <strong className="px-2">Status:</strong>
                <span>{selectedUserDetails.group?.name}</span>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeDetailsModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
}
