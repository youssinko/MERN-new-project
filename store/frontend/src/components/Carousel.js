import Carousel from "react-bootstrap/Carousel";
import { useState } from "react";

export default function ControlledCarousel() {
    const [index, setIndex] = useState(0);
  
    const handleSelect = (selectedIndex, e) => {
      setIndex(selectedIndex);
    };
  
    return (
      <Carousel activeIndex={index} onSelect={handleSelect} >
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="../shirtss.webp"
            alt="Second slide"
            
          />
  
          <Carousel.Caption>
            <h3>Personalized Shirts</h3>
          
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="../graffiti.jpeg"
            alt="Third slide"
          />
  
          <Carousel.Caption>
            <h3>Personalized Stickers</h3>
          
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
        
          <img
            className="d-block w-100"
            // src="../sticker.jpeg"
            src="../tum3.jpg"
            alt="First slide"
          />
      
          <Carousel.Caption>
            <h3>Personalized Tumblers</h3>
            
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    );
  }
  