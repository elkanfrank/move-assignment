import useApi from './useApi';
import Tag from './Tag';
import type {TagRecord} from './Tag';

export interface CustomStyleSheet {
	[key: string]: {
		[key in keyof React.CSSProperties]: React.CSSProperties[key];
	};
}

function App() {
	const tags = useApi<TagRecord[] | null>('/tags');

	if (!tags) {
		return <div>Loading...</div>;
	}

	const taglist = tags.map((tag) => <Tag tag={tag} key={tag.id} />);

	return (
		<div style={styles.containerStyle}>
			<div style={styles.tagListContainer}>{taglist}</div>
		</div>
	);
}

const styles: CustomStyleSheet = {
	containerStyle: {
		display: 'flex',
		flex: 1,
		height: '100vh',
		flexDirection: 'column',
		justifyContent: 'center',
		backgroundColor: '#2C8C99',
	},
	tagListContainer: {
		display: 'flex',
		flexWrap: 'wrap',
		alignSelf: 'center',
		maxWidth: 340,
	},
};

export default App;
