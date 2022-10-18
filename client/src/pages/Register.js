import React from "react";
import { Form, message } from "antd";
import {Link, useNavigate} from 'react-router-dom'
import axios from "axios";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../redux/alertsSlice";

function Register (){
  const navigate = useNavigate();
  const dispatch = useDispatch();
    const onFinish= async(values)=>{
      try {
        dispatch(ShowLoading());
        const response= await axios.post("/api/users/register", values )
        dispatch(HideLoading());
        if(response.data.success){
          message.success(response.data.message);
        navigate('/login');
        }else{
          message.error(response.data.message);
        }

      } catch (error) {
        dispatch(HideLoading());
        message.error(error.message);
      }

    };


  return (
    <div className="h-screen d-flex justify-content-center align-items-center">
      <div className="w-350 card p-3 ">
        <h3 className="text-xl font-e">K.Flight Registeration </h3>
        <hr></hr>
        <Form layout="vertical " onFinish={onFinish}>
          <Form.Item label="Name " name='name'>
            <input type="text" />
          </Form.Item>
          <Form.Item label="Emal" name='email'>
            <input type="email" />
          </Form.Item>
          <Form.Item label="Password" name='password'>
            <input type="password" />
          </Form.Item>

          <div className=" d-flex justify-content-between align-items-center m-3">
            <Link to="/login" className="text-lg">Login</Link>
            <button className="btn btn-a" type="submit">Register</button>
        </div>

        </Form>
      
      </div>
    </div>
  );
};

export default Register;
