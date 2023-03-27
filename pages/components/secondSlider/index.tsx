import { Button } from 'antd';
import classNames from 'classnames';
import Card from './../card/index';

import React, { useRef, useState, useEffect } from 'react';

import styles from './styles.module.scss';

interface SliderProps extends React.HTMLAttributes<HTMLDivElement> {
	items: any;
	initialSlide: number;
}

const slideWidth = 272;

const TasksSlider = ({ tasks, initialSlide }) => {
	const [activeIdx, setActiveIdx] = useState(initialSlide);
	const [dragging, setDragging] = useState(false);
	const [startX, setStartX] = useState(0);
	const [currentTranslate, setCurrentTranslate] = useState(0);
	const [delta, setDelta] = useState(0);

	const sliderRef = useRef<HTMLDivElement>(null);

	const prevClick = () => {
		setActiveIdx(activeIdx - 1);
	};

	const nextClick = () => {
		setActiveIdx(activeIdx + 1);
	};

	const handleDotClick = (idx) => {
		setActiveIdx(idx);
	};

	const onMouseDown = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		setDragging(true);
		sliderRef.current!.style.transition = `none`;
		sliderRef.current!.style.cursor = 'grabbing';
		setStartX(event.pageX);
	};

	const onMouseMove = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		if (dragging) {
			const delta = startX - event.pageX;
			const translate = -activeIdx * slideWidth * 1.1 + 416 - delta;
			setDelta(delta);
			setCurrentTranslate(translate);
			console.log('delta_: ' + delta);
			console.log('trans_: ' + translate);
			sliderRef.current!.style.transform = `translateX(${translate}px)`;
		}
	};

	const onMouseUp = () => {
		setDragging(false);
		console.log('idx: ' + activeIdx);
		console.log('trans: ' + currentTranslate);
		console.log('delta: ' + delta);
		console.log('next-idx: ' + (currentTranslate - 416 + delta) / (slideWidth * 1.1));
		sliderRef.current!.style.transition = 'all 0.5s cubic-bezier(0.45, 0.05, 0.55, 0.95)';
		sliderRef.current!.style.cursor = 'grab';
	};

	useEffect(() => {
		if (!dragging) sliderRef.current!.style.transform = `translateX(${-activeIdx * slideWidth * 1.1 + 416}px)`;
	}, [activeIdx, dragging]);

	return (
		<>
			<div
				style={{
					position: 'relative',
					display: 'flex',
					flexDirection: 'column',
				}}>
				{/* {activeIdx > 0 && (
					<Button
						shape='circle'
						type='text'
						className={classNames(styles['carousel__btn'], styles['carousel__btn--prev'])}
						onClick={() => prevClick()}>
						<Icon symbol='chevron_left' />
					</Button>
				)} */
				/* style={{
											transform: `translateX(${slideWidth * (pos - activeIdx) + 23}rem)`,
										}} */}
				<div>
					<div className={styles['carousel__inner']}>
						<div className={styles['carousel__container']}>
							<div className={styles.flex} ref={sliderRef} onMouseDown={onMouseDown} onMouseMove={onMouseMove} onMouseUp={onMouseUp}>
								{tasks.map((task, pos) => (
									<div /*  onClick={() => setActiveIdx(pos)} */ style={{ width: `${slideWidth}px` }} key={pos}>
										<Card title={'Title ' + pos} text={'Lorem ipsum dolor sit amet'} />
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
				<div className={styles['carousel__dots']}>
					{tasks.map((task, pos) => (
						<button
							key={task.id}
							onClick={() => handleDotClick(pos)}
							className={classNames(styles.dot, pos === activeIdx && styles.active)}
						/>
					))}
				</div>
				<div className={styles.position}>
					{activeIdx + 1} of {tasks.length}
				</div>
				{/* {activeIdx < tasks.length - 1 && (
					<Button
						shape='circle'
						type='text'
						className={classNames(styles['carousel__btn'], styles['carousel__btn--next'])}
						onClick={() => nextClick()}>
						<Icon symbol='chevron_right' />
					</Button>
				)} */}
			</div>
		</>
	);
};

export default TasksSlider;
