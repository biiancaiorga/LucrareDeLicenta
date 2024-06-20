import React from 'react';
import '../styles/About.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Carousel } from 'react-bootstrap';
import photo1 from '../assets/bar.jpg';
import photo2 from '../assets/barr.jpg';
import photo3 from '../assets/home.jpg';

function About() {
    return (
      <div className="aboutPage container">
        <h1>About Us</h1>
        <div className="row">
          <div className="col-md-6 textSection">
            <div className="description">
              <p>
                Welcome to Gusto Casero Cafe & Bar! Our mission is to provide delicious homemade food in a warm and welcoming atmosphere. We take pride in using the freshest ingredients to create dishes that will make you feel at home.
              </p>
              <p>
                We are a family business that recently opened and offer the best quality foods and drinks, you can find lots of variety and even Romanian specific foods. We welcome anyone that wants a good drink to pass the time or even dine in.
              </p>
              <p>
              Out studd is very firendly and welcoming and the restaurant is also placed next to the tennis court, gym & sauna, the local pool, and even the commercial centre.
              </p>
            </div>
          </div>
          <div className="col-md-6">
            <Carousel className="carousel" interval={2000}>
              <Carousel.Item>
                <img className="sliderImage" src={photo1} alt="First slide" />
              </Carousel.Item>
              <Carousel.Item>
                <img className="sliderImage" src={photo2} alt="Second slide" />
              </Carousel.Item>
              <Carousel.Item>
                <img className="sliderImage" src={photo3} alt="Third slide" />
              </Carousel.Item>
            </Carousel>
          </div>
        </div>
      </div>
    );
  }
  
  export default About;