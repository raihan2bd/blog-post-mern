import React from "react";

import Card from "../../components/UI/Card/Card";

import "./UserPage.css";

const UserPage = props => {
  // const username = props.match.params.username;
  // // useEffect(() => {
  // //   const loadUser = async () => {
  // //     try {
  // //       const res = await axios.get(`/api/user/${username}`);
  // //       console.log(res.data);
  // //     } catch (err) {
  // //       console.log(err.response);
  // //     }
  // //   };
  // //   loadUser();
  // // }, [username]);
  return (
    <div>
      <Card>
        <h2 style={{ color: "red" }}>
          This page is under development. We will update this page soon!!
        </h2>
      </Card>
    </div>
  );
};

// const mapStateToProps = state => ({
//   isAuth: state.auth.isAuth
// });

export default UserPage;
