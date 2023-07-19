import useApi from './useApi';
import Tag, {TagAddButton} from './Tag';
import type {TagRecord} from './Tag';
import {useCallback, useEffect, useMemo, useState} from 'react';

export interface CustomStyleSheet {
	[key: string]: {
		[key in keyof React.CSSProperties]: React.CSSProperties[key];
	};
}

function App() {
	const tags = useApi<TagRecord[] | null>('/tags');
	const [localTags, setLocalTags] = useState<TagRecord[] | null>(null);
	const [deletedTags, setDeletedTags] = useState<string[]>([]);

	useEffect(() => {
		if (!tags) {
			return;
		}
		setLocalTags(tags);
	}, [tags]);

	const deleteTag = useCallback(
		(id: string) => {
			setDeletedTags([...deletedTags, id]);
		},
		[deletedTags]
	);

	const addTag = useCallback(
		(name: string) => {
			if (localTags === null) {
				return;
			}

			const newTag: TagRecord = {
				name,
				id: localTags[localTags.length - 1].id + 1,
			};

			setLocalTags([...localTags, newTag]);
		},
		[localTags]
	);

	const tagList = useMemo(() => {
		if (!localTags) {
			return null;
		}

		return [
			...localTags?.map((tag) => {
				if (deletedTags.includes(tag.id)) {
					return null;
				}
				return <Tag onDelete={deleteTag} tag={tag} key={tag.id} />;
			}),
			<TagAddButton onClick={addTag} key={'0'} />,
		];
	}, [localTags, deletedTags, addTag, deleteTag]);

	console.log(localTags);
	return (
		<div style={styles.container}>
			<div style={styles.tagListContainer}>{tagList}</div>
		</div>
	);
}

const styles: CustomStyleSheet = {
	container: {
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
