import { Button, Col, message, Row } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import BookingBtn from "../components/BookingBtn";
import { axiosInstance } from "../helpers/axiosInstance";
import { HideLoading, ShowLoading } from "../redux/alertsSlice";
import "../resources/bookBtn.css";
import SeatSelection from "../components/SeatSelection";
import "../resources/flightseat.css";

const BookNow = () => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [flight, setFlight] = useState(null);
  const getFlight = async () => {
    try {
      dispatch(ShowLoading());
      const response = await axiosInstance.post("/api/flights/get-flight-by-id", {
        _id: params.id,
      });
      dispatch(HideLoading());
      if (response.data.success) {
        setFlight(response.data.data);
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };
  
  const bookNow = async () => {
    try {
      dispatch(ShowLoading());
      const response = await axiosInstance.post("/api/bookings/book-seat", {
        flight: flight._id,
        seats: selectedSeats,
        
      });
      dispatch(HideLoading());
      if (response.data.success) {
        message.success(response.data.message);
        navigate("/");
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  
  useEffect(() => {
    getFlight();
  }, []);
  return (
    <div>
      {flight && (
        <Row gutter={[30]}>
          <Col lg={12} xs={24} sm={24}>
            <h1 className="text-2xl primary-text">{flight.name}</h1>
            <h1 className="text-md">
              {flight.from} - {flight.to}
            </h1>
            <hr />
            <div className="container">
              <div className="row">
                <div className="">
                  <div className="flex flex-col gap-2">
                    <p className="text-md">
                      Jourey Date : {flight.journeyDate}
                    </p>
                    <p className="text-md">Fare : $ {flight.fare} /-</p>
                    <p className="text-md">
                      Departure Time : {flight.departure}
                    </p>
                    <p className="text-md">Arrival Time : {flight.arrival}</p>
                    <p className="text-md">Capacity : {flight.capacity}</p>
                    <p className="text-md">
                      Seats Left : {flight.capacity - flight.seatsBooked.length}
                    </p>
                  </div>
                  <p className="text-2xl">
                    Selected Seats : {selectedSeats.join(", ")}
                  </p>
                  <h1 className="text-2xl mt-2">
                    Fare : {flight.fare * selectedSeats.length} /-
                  </h1>
                </div>
               
              </div>
            </div>

            <hr />
          </Col >
          <Col lg={12} xs={24} sm={24}>
            <SeatSelection
              selectedSeats={selectedSeats}
              setSelectedSeats={setSelectedSeats}
              flight={flight}
            />
          </Col>
          <Col lg={23} xs={24} sm={24}> 
         
                 
                  
                      <Button onClick={bookNow}
         
                      >
                        <BookingBtn />
                      </Button>
                  
               
                
          </Col>
        </Row>
        
      )}
    </div>
  );
};

export default BookNow;
