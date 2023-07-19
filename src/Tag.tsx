import type {CustomStyleSheet} from './App';

export interface TagRecord {
	id: string;
	name: string;
}

interface TagProps {
	tag: TagRecord;
}

const Tag: React.FunctionComponent<TagProps> = (props) => {
	return (
		<div style={styles.tagStyle}>
			<p>{props.tag.name}</p>
			<button style={styles.buttonStyle}>x</button>
		</div>
	);
};

const styles: CustomStyleSheet = {
	tagStyle: {
		display: 'flex',
		flexDirection: 'row',
		backgroundColor: '#F1FFFA',
		borderRadius: '15px',
		margin: 5,
		padding: 5,
	},
	buttonStyle: {
		backgroundColor: '#CCCCCC',
		border: 'none',
		borderRadius: '50%',
		width: 25,
		height: 25,
		padding: 5,
		marginLeft: 5,
		cursor: 'pointer',
	},
};

export default Tag;
