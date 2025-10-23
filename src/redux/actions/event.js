import axios from "axios";
import { server } from "../../server";
import toast from "react-hot-toast";
// create event
export const createevent = (newForm) => async (dispatch) => {
  try {
    dispatch({
      type: "eventCreateRequest",
    });
    const config = { headers: { "Content-Type": "multipart/form-data" } };

    const { data } = await axios.post(
      `${server}/event/create-event`,
      newForm,
      config
    );
    dispatch({
      type: "eventCreateSuccess",
      payload: data.event,
    });
  } catch (error) {
    dispatch({
      type: "eventCreateFail",
      payload: error.response.data.message,
    });
  }
};

// get All events of a shop
export const getAlleventsShop = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "getAlleventsShopRequest",
    });
    const { data } = await axios.get(
      `${server}/event/get-all-events/${id}`
    );
    dispatch({
      type: "getAlleventsShopSuccess",
      payload: data.events,
    });
  } catch (error) {
    dispatch({
      type: "getAlleventsShopFailed",
      payload: error.response.data.message,
    });
  }
};

// delete event of a shop
export const deleteEvent = (id) => async (dispatch) => {
  try {
    dispatch({ type: "deleteeventRequest" });

    const { data } = await axios.delete(
      `${server}/event/delete-shop-event/${id}`,
      { withCredentials: true }
    );

    dispatch({ type: "deleteeventSuccess", payload: id }); // send id
    toast.success(data.message);

  } catch (error) {
    dispatch({
      type: "deleteeventFailed",
      payload: error.response?.data?.message || "Error deleting event",
    });
    toast.error(error.response?.data?.message || "Error deleting event");
  }
};
