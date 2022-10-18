import { message, Table } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import FlightForm from "../../components/FlightForm";
import PageTitle from "../../components/PageTitle";
import { axiosInstance } from "../../helpers/axiosInstance";
import { HideLoading, ShowLoading } from "../../redux/alertsSlice";

const AdminFlights = () => {
  const dispatch = useDispatch();
  const [showFlightForm, setShowFlightForm] = React.useState(false);
  const [flights, setFlights] = useState([]);
  const [selectedFlight, setSelectedFlight] = useState(null);
  const getFlights = async () => {
    try {
      dispatch(ShowLoading());
      const response = await axiosInstance.post(
        "/api/flights/get-all-flights",
        {}
      );
      dispatch(HideLoading());
      if (response.data.success) {
        setFlights(response.data.data);
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  const deleteFlight = async (id) => {
    try {
      dispatch(ShowLoading());
      const response = await axiosInstance.post("/api/flights/delete-flight", {
        _id: id,
      });
      dispatch(HideLoading());
      if (response.data.success) {
        message.success(response.data.message);
        getFlights();
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Number",
      dataIndex: "number",
    },
    {
      title: "From",
      dataIndex: "from",
    },
    {
      title: "To",
      dataIndex: "to",
    },
    {
      title: "Journey Date",
      dataIndex: "journeyDate",
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (action, record) => (
        <div className="d-flex gap-3">
          <i
            class="ri-delete-bin-line"
            onClick={() => {
              deleteFlight(record._id);
            }}
          ></i>
          <i
            class="ri-pencil-line"
            onClick={() => {
              setSelectedFlight(record);
              setShowFlightForm(true);
            }}
          ></i>
        </div>
      ),
    },
  ];

  useEffect(() => {
    getFlights();
  }, []);

  return (
    <div>
      <div className="d-flex justify-content-between">
        <PageTitle title="Flights" />
        <button
          className="btn btn-primary btn-sm"
          onClick={() => setShowFlightForm(true)}
        >
          Add Flights
        </button>
      </div>
      <Table columns={columns} dataSource={flights} />

      {showFlightForm && (
        <FlightForm
          showFlightForm={showFlightForm}
          setShowFlightForm={setShowFlightForm}
        />
      )}
    </div>
  );
};

export default AdminFlights;
