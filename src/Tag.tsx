import type {CustomStyleSheet} from './App';
import React, {useState} from 'react';

export interface TagRecord {
	id: string;
	name: string;
}

interface TagProps {
	tag: TagRecord;
	onDelete: (id: string) => void;
}

interface TagAddButtonProps {
	onClick: (name: string) => void;
}

export const TagAddButton: React.FunctionComponent<TagAddButtonProps> = (props) => {
	const [name, setName] = useState<string>('');
	const [isActive, setIsActive] = useState(false);

	const onClick = () => {
		if (isActive) {
			props.onClick(name);
			setIsActive(false);
			setName('');
		} else {
			setIsActive(true);
		}
	};

	return (
		<div style={{...styles.tagStyle, paddingLeft: isActive ? 8 : 0}}>
			{isActive && (
				<input
					style={{...styles.inputStyle, ...styles.textStyle}}
					type="text"
					value={name}
					onChange={(e) => setName(e.target.value)}
					placeholder="Type here..."
					autoFocus
				/>
			)}
			<button style={{...styles.buttonStyle, fontSize: 22, fontWeight: 'medium'}} onClick={onClick}>
				+
			</button>
		</div>
	);
};

const Tag: React.FunctionComponent<TagProps> = (props) => {
	return (
		<div style={styles.tagStyle}>
			<p>{props.tag.name}</p>
			<button style={{...styles.buttonStyle}} onClick={() => props.onDelete(props.tag.id)}>
				✕
			</button>
		</div>
	);
};

const styles: CustomStyleSheet = {
	tagStyle: {
		display: 'flex',
		flexDirection: 'row',
		backgroundColor: '#F1FFFA',
		borderRadius: '15px',
		alignItems: 'center',
		margin: 5,
		padding: 4,
		paddingLeft: 8,
	},
	buttonStyle: {
		backgroundColor: '#E0E0E0',
		border: 'none',
		borderRadius: '50%',
		width: 25,
		height: 25,
		marginLeft: 5,
		cursor: 'pointer',
		fontWeight: 'bold',
	},
	inputStyle: {
		display: 'flex',
		backgroundColor: 'transparent',
		border: 'none',
		outline: 'none',
		width: 80,
		maxWidth: 120,
	},
	textStyle: {
		fontSize: 16,
	},
};

export default Tag;
