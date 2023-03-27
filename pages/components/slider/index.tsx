import React, { useRef, useState } from 'react';

interface SliderProps {
	children: React.ReactNode;
	slideWidth: number;
}

const Slider: React.FC<SliderProps> = ({ children, slideWidth }) => {
	const [dragging, setDragging] = useState(false);
	const [startX, setStartX] = useState(0);
	const [currentTranslate, setCurrentTranslate] = useState(0);
	const [prevTranslate, setPrevTranslate] = useState(0);

	const sliderRef = useRef<HTMLDivElement>(null);

	const onMouseDown = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		setDragging(true);
		setStartX(event.pageX - sliderRef.current!.offsetLeft);
		setPrevTranslate(currentTranslate);
	};

	const onMouseMove = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		if (dragging) {
			const currentX = event.pageX - sliderRef.current!.offsetLeft;
			const translate = prevTranslate + currentX - startX;
			setCurrentTranslate(translate);
			sliderRef.current!.style.transform = `translateX(${translate}px)`;
		}
	};

	const onMouseUp = () => {
		setDragging(false);
	};

	const onTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
		setDragging(true);
		setStartX(event.touches[0].clientX - sliderRef.current!.offsetLeft);
		setPrevTranslate(currentTranslate);
	};

	const onTouchMove = (event: React.TouchEvent<HTMLDivElement>) => {
		if (dragging) {
			const currentX = event.touches[0].clientX - sliderRef.current!.offsetLeft;
			const translate = prevTranslate + currentX - startX;
			setCurrentTranslate(translate);
			sliderRef.current!.style.transform = `translateX(${translate}px)`;
		}
	};

	const onTouchEnd = () => {
		setDragging(false);
	};

	const onPrevClick = () => {
		const translate = currentTranslate + slideWidth;
		setCurrentTranslate(translate);
		sliderRef.current!.style.transform = `translateX(${translate}px)`;
	};

	const onNextClick = () => {
		const translate = currentTranslate - slideWidth;
		setCurrentTranslate(translate);
		sliderRef.current!.style.transform = `translateX(${translate}px)`;
	};

	return (
		<div
			className='slider'
			onMouseDown={onMouseDown}
			onMouseMove={onMouseMove}
			onMouseUp={onMouseUp}
			onTouchStart={onTouchStart}
			onTouchMove={onTouchMove}
			onTouchEnd={onTouchEnd}
			ref={sliderRef}
			style={{ display: 'flex', gap: '2rem' }}>
			{children}
			<button onClick={onPrevClick}>Prev</button>
			<button onClick={onNextClick}>Next</button>
		</div>
	);
};

export default Slider;
