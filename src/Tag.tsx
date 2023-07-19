import type {CustomStyleSheet} from './App';
import React from 'react';

export interface TagRecord {
	id: string;
	name: string;
}

interface TagProps {
	tag: TagRecord;
	onDelete: (id: string) => void;
}

const TagDeleteButton: React.FunctionComponent<{id: string; onClick: (id: string) => void}> = (props) => {
	return (
		<button style={styles.buttonStyle} onClick={() => props.onClick(props.id)}>
			✕
		</button>
	);
};

export const TagAddButton: React.FunctionComponent<{onClick: () => void}> = (props) => {
	return (
		<div style={{...styles.tagStyle, paddingLeft: 0}}>
			<button style={{...styles.buttonStyle, fontSize: 16}} onClick={props.onClick}>
				+
			</button>
		</div>
	);
};

const Tag: React.FunctionComponent<TagProps> = (props) => {
	return (
		<div style={styles.tagStyle}>
			<p>{props.tag.name}</p>
			<TagDeleteButton id={props.tag.id} onClick={props.onDelete} />
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
		color: '#666666',
		border: 'none',
		borderRadius: '50%',
		width: 25,
		height: 25,
		marginLeft: 5,
		cursor: 'pointer',
		fontSize: 12,
		fontWeight: 'bold',
	},
};

export default Tag;
