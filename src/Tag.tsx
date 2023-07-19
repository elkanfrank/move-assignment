import React, {useState} from 'react';
import styled from 'styled-components';

export const Button = styled.button`
	background-color: #e0e0e0;
	border: none;
	border-radius: 50%;
	width: 25px;
	height: 25px;
	margin-left: 5px;
	cursor: pointer;
	fontweight: bold;
	color: #525252;
`;

export interface TagRecord {
	id: string;
	name: string;
}

interface TagProps {
	tag: TagRecord;
	onDelete: (id: string) => void;
	onEdit: (tag: TagRecord) => void;
}

const Tag: React.FunctionComponent<TagProps> = (props) => {
	const [isActive, setIsActive] = useState(false);
	const [name, setName] = useState(props.tag.name);

	const onBlur = () => {
		if (name) {
			props.onEdit({id: props.tag.id, name});
		} else {
			props.onDelete(props.tag.id);
		}
		setIsActive(false);
	};

	return (
		<div style={tagStyle} onClick={() => setIsActive(true)}>
			{isActive ? (
				<input
					type="text"
					value={name}
					style={inputStyle}
					onChange={(e) => setName(e.target.value)}
					onBlur={onBlur}
					placeholder="Add tag..."
					autoFocus
				/>
			) : (
				<p>{props.tag.name}</p>
			)}
			<Button onClick={() => props.onDelete(props.tag.id)}>✕</Button>
		</div>
	);
};

export const tagStyle: React.CSSProperties = {
	backgroundColor: '#F1FFFA',
	display: 'flex',
	flexDirection: 'row',
	borderRadius: '15px',
	alignItems: 'center',
	margin: 5,
	padding: 4,
	paddingLeft: 8,
};

export const inputStyle: React.CSSProperties = {
	backgroundColor: 'transparent',
	border: 'none',
	outline: 'none',
	width: 80,
	maxWidth: 120,
	fontSize: 16,
};

export default Tag;
