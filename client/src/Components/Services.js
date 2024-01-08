import React, { useRef, useState } from "react";
import "../Styles/Services.css";
import Card from "./Card";
import Navbar1 from "./Navbar1";

const Services = () => {
  const scrollContainerRef = useRef(null);
  const [selectedCardIndex, setSelectedCardIndex] = useState(0);

  const handleRadioButtonChange = (index) => {
    setSelectedCardIndex(index);
    scrollToCard(index);
  };

  const scrollToCard = (cardIndex) => {
    const cardElement = scrollContainerRef.current.children[cardIndex];
    cardElement.scrollIntoView({ behavior: "smooth", inline: "start" });
  };

  return (
    <>
        <Navbar1 />
        <div className="services-body-head">
          <h1>Services</h1>
        </div>
        <div className="services-body" style={{marginLeft:'20px'}}>
          <div className="services-card-container" ref={scrollContainerRef}>
            <Card
              imageSrc="https://img.freepik.com/premium-vector/man-hand-holds-smartphone-with-city-map-gps-navigator-smartphone-screen-mobile-navigation-concept-modern-simple-flat-design-web-banners-web-infographics-flat-cartoon-illustration_505557-741.jpg?w=740"
              title="Live location of buses"
              description="Passengers can detect live location of a relevant bus ride in a relevant bus route via our application."
            />
            <Card
              imageSrc="https://img.freepik.com/free-vector/flat-design-time-management-concept_23-2148813012.jpg?size=626&ext=jpg&ga=GA1.1.352460022.1680024062&semt=ais"
              title="Bus time schedules and bus fares"
              description="Passengers can search live bus schedules and bus fares accurately via our application."
            />
             <Card
              imageSrc="https://img.freepik.com/premium-vector/traveler-female-character-claim-her-bag-lost-found-luggage-office-airport-happy-passenger-lose-baggage-woman-receive-clutch-from-worker-service-stall-cartoon-people-vector-illustration_87771-14735.jpg?w=740"
              title="Lost and found items"
              description="Passengers can search their lost items and can give update on found items via our application."
            />
            <Card
              imageSrc="https://www.ivartravels.com/assets/images/services-bus.png"
              title="Seat and luggage reservation"
              description="Passengers can reserve seat and luggage for any destination via our application."
            />
            <Card
              imageSrc="https://www.hopkinsmedicine.org/-/media/project/jhm/icons/covidcare/phone-icon.ashx?h=900&iar=0&w=900&hash=F9C33D3BA28791F1BA65D9925277E2A6"
              title="Other services"
              description="Passengers can inform and complain about any unauthorized situations and security issues via our application."
            />
          </div>
        </div>
        <div className="radio-buttons-container">
          <input
            type="radio"
            id="radio-btn-1"
            name="card-radio-buttons"
            checked={selectedCardIndex === 0}
            onChange={() => handleRadioButtonChange(0)}
          />
          <label htmlFor="radio-btn-1"></label>
          <input
            type="radio"
            id="radio-btn-2"
            name="card-radio-buttons"
            checked={selectedCardIndex === 1}
            onChange={() => handleRadioButtonChange(1)}
          />
          <label htmlFor="radio-btn-2"></label>
          <input
            type="radio"
            id="radio-btn-3"
            name="card-radio-buttons"
            checked={selectedCardIndex === 2}
            onChange={() => handleRadioButtonChange(2)}
          />
          <label htmlFor="radio-btn-3"></label>
          <input
            type="radio"
            id="radio-btn-4"
            name="card-radio-buttons"
            checked={selectedCardIndex === 3}
            onChange={() => handleRadioButtonChange(3)}
          />
          <label htmlFor="radio-btn-4"></label>
          <input
            type="radio"
            id="radio-btn-5"
            name="card-radio-buttons"
            checked={selectedCardIndex === 4}
            onChange={() => handleRadioButtonChange(4)}
          />
          <label htmlFor="radio-btn-5"></label>
        </div>


    </>
  );
};

export default Services;