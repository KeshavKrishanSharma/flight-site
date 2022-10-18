import React from "react";

const Loader = () => {
  return (
    <div>
      <div className="spinner-main">
        <div className="spinner-border" role="status"></div>
      </div>
     
      <div >
        <img className="spinner-img " src="https://i0.wp.com/alistapart.com/wp-content/uploads/2013/01/ALA322_doodles_300.png?fit=1200%2C408&ssl=1">
        </img>
      </div>
     
    </div>
  );
};

export default Loader;
