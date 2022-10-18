import { message, Col, Row } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { HideLoading, ShowLoading } from '../redux/alertsSlice';
import Flight from "../components/Flight";
import { axiosInstance } from "../helpers/axiosInstance";

const Home = () => {
  const { user } = useSelector((state) => state.users);
  const [filters = {}, setFilters] = useState({});
  const dispatch = useDispatch();
  const [flights, setFlights] = useState([]);
  const getFlights = async () => {
    const tempFilters = {};
    Object.keys(filters).forEach((key) => {
      if (filters[key]) {
        tempFilters[key] = filters[key];
      }
    });
    try {
      dispatch(ShowLoading());
      const response = await axios.post(
        "/api/flights/get-all-flights",
        tempFilters,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
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

  useEffect(() => {
    getFlights();
  }, []);

  return (
    <div>Home
{user && <h1>Welcome {user.name}</h1>}
<div className="my-3 py-1">
        <Row gutter={10} align="center">
          <Col lg={6} sm={24}>
            <input
              type="text"
              placeholder="From"
              value={filters.from}
              onChange={(e) => setFilters({ ...filters, from: e.target.value })}
            />
          </Col>
          <Col lg={6} sm={24}>
            <input
              type="text"
              placeholder="To"
              value={filters.to}
              onChange={(e) => setFilters({ ...filters, to: e.target.value })}
            />
          </Col>
          <Col lg={6} sm={24}>
            <input
              type="date"
              placeholder="Date"
              value={filters.journeyDate}
              onChange={(e) =>
                setFilters({ ...filters, journeyDate: e.target.value })
              }
            />
          </Col>
          <Col lg={6} sm={24}>
            <div className="d-flex gap-2">
              <button className="primary-btn" onClick={() => getFlights()}>
                Filter
              </button>
              <button
                className="outlined px-3"
                onClick={() =>
                  setFilters({
                    from: "",
                    to: "",
                    journeyDate: "",
                  })
                }
              >
                Clear
              </button>
            </div>
          </Col>
        </Row>
      </div>
      <div>
        <Row gutter={[15, 15]}>
          {flights
            .filter((flight) => flight.status === "Yet To Start")
            .map((flight) => (
              <Col lg={12} xs={24} sm={24}>
                <Flight flight={flight} />
              </Col>
            ))}
        </Row>
      </div>
    </div>
  )
}

export default Home