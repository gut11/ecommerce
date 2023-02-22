import "./Carousel.scss";
import { Fragment, useEffect, useRef, useState } from "react";


const Carousel = (props) => {
	const numberOfImages = props.imgs.length;
	let counter = -1;
	const [currentImage, currentImageSetter] = useState(0);
	const [rerenderTrigger, rerenderTriggerSetter] = useState(true);
	let animationTime = useRef(0);
	let numberImagesToMove = useRef(0);
	useEffect(() => {
		if (numberImagesToMove.current) {
			if (numberImagesToMove.current > 0) {
				arrowRight(currentImage, currentImageSetter, numberOfImages);
				numberImagesToMove.current--;
			} else if (numberImagesToMove.current < 0) {
				arrowLeft(currentImage, currentImageSetter, numberOfImages);
				numberImagesToMove.current++;
			}
		}
		//eslint-disable-next-line
	}, [numberImagesToMove.current])
	if (numberImagesToMove.current === 0)
		animationTime.current = 0;
	return (
		<div id="carousel-image-container">
			{chooseRightImages(currentImage, numberOfImages, animationTime.current)} <div id="carousel-controls-container">
				<button
					onClick={(_) => arrowLeft(currentImage, currentImageSetter, numberOfImages)}
					className="carousel-arrows"
				>
					&#60;
				</button>
				<ul>
					{props.imgs.map((_) => {
						counter++;
						return (
							(counter === currentImage) ?
								<li key={counter} className="carousel-balls current-ball" id={"carousel-ball-" + counter}>
									<button></button>
								</li>
								:
								<li key={counter} onClick={(event) => {
									const currentCounter = event.currentTarget.id.charAt(event.currentTarget.id.length - 1);
									numberImagesToMove.current = currentCounter - currentImage;
									animationTime.current = 400 / numberImagesToMove.current;
									rerenderTriggerSetter(!rerenderTrigger);
								}} className="carousel-balls" id={"carousel-ball-" + counter
								}>
									<button style={{ borderColor: "red" }}></button>
								</li>
						);
					})}
				</ul>
				<button
					onClick={(_) => arrowRight(currentImage, currentImageSetter, numberOfImages)}
					className="carousel-arrows"
				>
					&#62;
				</button>
			</div>
		</div>
	);
};

export default Carousel;

function chooseRightImages(currentImage, numberOfImages, animationTime) {
	let img_src = "assets/images/carousel/carousel";
	let nextImage;
	let previousImage;
	const styleBalls = { animationDuration: (animationTime ? Math.abs(animationTime) : 500) + "ms" };
	if (currentImage === numberOfImages - 1) {
		nextImage = 0;
		previousImage = currentImage - 1;
	} else if (currentImage === 0) {
		previousImage = numberOfImages - 1;
		nextImage = currentImage + 1;
	} else {
		previousImage = currentImage - 1;
		nextImage = currentImage + 1;
	}
	return (
		<Fragment>
			<div
				key={Date.now() + "0"}
				id="carousel-image-0"
				className="carousel-images"
				style={Object.assign({ backgroundImage: `url("` + img_src + previousImage + `.jpg")` }, styleBalls)}
			>
				<button>Comprar</button>
			</div>
			<div
				key={Date.now() + "1"}
				id="carousel-image-1"
				className="carousel-images"
				style={Object.assign({ backgroundImage: `url("` + img_src + currentImage + `.jpg")` }, styleBalls)}
			>
				<button>Comprar</button>
			</div>
			<div
				key={Date.now() + "2"}
				id="carousel-image-2"
				className="carousel-images"
				style={Object.assign({ backgroundImage: `url("` + img_src + nextImage + `.jpg")` }, styleBalls)}
			>
				<button>Comprar</button>
			</div>
		</Fragment>
	);
}

function arrowRight(currentImage, currentImageSetter, numberOfImages) {
	const carouselImage = document.getElementById("carousel-image-1");
	const animationName = "next-image";
	if (carouselImage.style.animationName !== "")
		return;
	insertAnimation(animationName);
	changeBallColors(true, currentImage, numberOfImages);
	carouselImage.addEventListener("animationend", () => {
		if (currentImage === numberOfImages - 1)
			currentImageSetter(0);
		else
			currentImageSetter(currentImage + 1);
	});
}

function arrowLeft(currentImage, currentImageSetter, numberOfImages) {
	const carouselImage = document.getElementById("carousel-image-1");
	if (carouselImage.style.animationName !== "")
		return;
	insertAnimation("previous-image");
	changeBallColors(false, currentImage, numberOfImages);
	carouselImage.addEventListener("animationend", () => {
		if (currentImage === 0)
			currentImageSetter(numberOfImages - 1);
		else
			currentImageSetter(currentImage - 1);
	});
}


function insertAnimation(AnimationName) {
	const imagesDivs = document.getElementsByClassName("carousel-images");
	Array.from(imagesDivs).forEach(div => {
		div.style.animationName = AnimationName;
	})
}

function changeBallColors(goingForward, currentImage, numberOfImages) {
	let nextImageNumber;
	document.querySelector(".current-ball button").style.borderColor = "red";
	if (goingForward) {
		if (currentImage === numberOfImages - 1)
			nextImageNumber = 0;
		else
			nextImageNumber = currentImage + 1;
		document.querySelector("#carousel-ball-" + nextImageNumber + " button").style.borderColor = "blue";
	}
	else {
		if (currentImage === 0)
			nextImageNumber = numberOfImages - 1;
		else {
			nextImageNumber = currentImage - 1;
		}
		document.querySelector("#carousel-ball-" + nextImageNumber + " button").style.borderColor = "blue"
	}
}


