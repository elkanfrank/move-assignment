import useApi from './useApi';
import Tag, {TagAddButton} from './Tag';
import type {TagRecord} from './Tag';
import {useCallback, useMemo, useState} from 'react';

export interface CustomStyleSheet {
	[key: string]: {
		[key in keyof React.CSSProperties]: React.CSSProperties[key];
	};
}

function App() {
	const tags = useApi<TagRecord[] | null>('/tags');
	const [deletedTags, setDeletedTags] = useState<string[]>([]);
	const [addedTags, setAddedTags] = useState<TagRecord[]>([]);

	const deleteTag = useCallback(
		(id: string) => {
			setDeletedTags([...deletedTags, id]);
		},
		[deletedTags]
	);

	const addTag = useCallback(() => {}, []);

	const taglist = useMemo(() => {
		if (!tags) {
			return null;
		}

		return [
			...tags?.map((tag) => {
				if (deletedTags.includes(tag.id)) {
					return null;
				}
				return <Tag onDelete={deleteTag} tag={tag} key={tag.id} />;
			}),
			<TagAddButton onClick={addTag} key={'0'} />,
		];
	}, [tags, deletedTags, addTag, deleteTag]);

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
		maxWidth: 380,
	},
};

export default App;
