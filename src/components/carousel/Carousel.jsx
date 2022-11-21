import "Carousel.scss";
import { Fragment } from "react";
import "../CarouselBalls/CarouselBalls";

const Carousel = (props) => {
  return (
    <div>
      {props.imgs.map((img) => {
        return (
          <Fragment>
            <img />
            <button>COMPRAR</button>
          </Fragment>
        );
      })}
      <div id="">
        <button></button>
        <ui>
          <CarouselBalls />
        </ui>
        <button></button>
      </div>
    </div>
  );
};

export default Carousel;
