import React from 'react';
import styled from 'styled-components';

interface CardProps {
	title: string;
	text: string;
}

const CardContainer = styled.div`
	background-color: white;
	box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
	border-radius: 10px;
	width: 100%;
	padding: 16px;
`;

const Title = styled.h2`
	font-size: 24px;
	margin-bottom: 8px;
`;

const Text = styled.p`
	font-size: 16px;
`;

const Card: React.FC<CardProps> = ({ title, text }) => {
	return (
		<CardContainer>
			<Title>{title}</Title>
			<Text>{text}</Text>
		</CardContainer>
	);
};

export default Card;
