import { useState, useEffect } from 'react';

export const Home = () => {

	const [arr, setArr] = useState([]);

	useEffect(() => {
		setArr([1, 2, 3]);
	}, [])
	
	return (
		<div className="home">
            <h1>Home</h1>
			{ arr && arr.map((item, index) => {
				return <div key={index}>{item}</div>
			})}
        </div>
	);
};

export default Home;
