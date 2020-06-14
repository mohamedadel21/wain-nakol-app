import axios from "axios";

import { GET_REST_ATTEMPING, GET_REST_FAILED, GET_REST_SUCCESS } from "./Types";

export const getRestauatntDetails = (location) => {
  return async (dispatch) => {
    dispatch({
      type: GET_REST_ATTEMPING,
    });

    var headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
    };

    axios
      .post(
        "https://wainnakel.com/api/v1/GenerateFS.php?uid="+location.latitude+","+location.longitude+"&g et_param=value",
        { headers: headers }
      )
      .then((res) => {
        if (res.data.lat) {
          //console.log(res.data);

          dispatch({
            type: GET_REST_SUCCESS,
            payload: res.data,
          });
        } else {
          dispatch({
            type: GET_REST_FAILED,
            payload: "No restuarants in this spot",
          });
        }
      })
      .catch((error) => {
        if (error) {
          dispatch({
            type: GET_REST_FAILED,
            payload: "No restuarants in this spot",
          });
        }
      });
  };
};
