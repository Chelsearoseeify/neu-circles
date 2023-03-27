import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import Slider from './components/slider/index';
import Card from './components/card/index';
import { useState } from 'react';
import TasksSlider from './components/secondSlider/index';

export default function Home() {
	const [list, setList] = useState([
		{ title: 'Title 1', text: 'Lorem ipsum dolor sit amet' },
		{ title: 'Title 2', text: 'Lorem ipsum dolor sit amet' },
		{ title: 'Title 3', text: 'Lorem ipsum dolor sit amet' },
		{ title: 'Title 4', text: 'Lorem ipsum dolor sit amet' },
		{ title: 'Title 5', text: 'Lorem ipsum dolor sit amet' },
	]);
	return (
		<div className={styles.container}>
			<TasksSlider tasks={list} initialSlide={0} />
		</div>
	);
}
