import React from "react";
import { Form, message } from "antd";
import {Link} from 'react-router-dom'
import axios from "axios";

function Register (){
     
    const onFinish= async(values)=>{
      try {
        const response= await axios.post("/api/users/register", values )
        if(response.data.success){
          message.success(response.data.message);
        }else{
          message.error("error in els");
        }

      } catch (error) {
        message.error("error in catch");
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
