import { Carousel } from 'react-bootstrap';

export const Home = () => {

	return (
		<div className="home">
            <Carousel>
				<Carousel.Item>
					<img src='https://www.w3schools.com/w3images/la.jpg'></img>
					<Carousel.Caption>
						<h3>First slide label</h3>
						<p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
					</Carousel.Caption>
				</Carousel.Item>
				<Carousel.Item>
					<img src='https://www.w3schools.com/w3images/ny.jpg'></img>
					<Carousel.Caption>
						<h3>Second slide label</h3>
						<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
					</Carousel.Caption>
				</Carousel.Item>
			</Carousel>
        </div>
	);
};

export default Home;
