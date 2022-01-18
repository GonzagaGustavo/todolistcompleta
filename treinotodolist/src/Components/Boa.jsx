import React, { useState, useEffect } from "react";
import "./Boa.css";
import { MdOutlineArrowBack } from 'react-icons/md'
import { useHistory } from 'react-router-dom'

function Boa() {
  const date = new Date();
  const [d, setD] = useState({
    hours: date.getHours(),
  });
  const history = useHistory();

  useEffect(() => {
    const timer = setInterval(() => {
      const date = new Date();
      setD({
        hours: date.getHours(),
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  function clickback() {
    history.goBack()
  }

  if (d.hours < 12) {
    return (
      <div>
          <MdOutlineArrowBack className="back" onClick={clickback}/>
        <img
          className="img"
          src="https://i1.wp.com/mensagensdeamorcomimagens.com.br/wp-content/uploads/2020/09/figurinhas-de-bom-dia-9.jpg?ssl=1"
          alt=""
        />
      </div>
    );
  } else if (d.hours <= 18) {
    return (
      <div>
          <MdOutlineArrowBack className="back" onClick={clickback}/>
        <img
          className="img"
          src="https://th.bing.com/th/id/OIP.MZIUTTnr80aaNzTLFQ_D2wHaE7?pid=ImgDet&rs=1"
          alt=""
        />
      </div>
    );
  } else if(d.hours >= 17 & d.hours < 5){
    return (
      <div>
          <MdOutlineArrowBack className="back" onClick={clickback}/>
        <img
          className="img"
          src="https://th.bing.com/th/id/OIP.01BGvNXtbVvvDetlnOMFZgHaIs?pid=ImgDet&rs=1"
          alt=""
        />
      </div>
    );
  }
}

export default Boa;
