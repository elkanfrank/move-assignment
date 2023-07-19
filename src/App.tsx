import useApi from './useApi';
import Tag from './Tag';
import TagAddButton from './TagAddButton';
import type {TagRecord} from './Tag';
import {useCallback, useEffect, useMemo, useState} from 'react';

function App() {
	const tags = useApi<TagRecord[] | null>('/tags');
	const [localTags, setLocalTags] = useState<TagRecord[]>([]);

	// Set local tags when the API call resolves
	useEffect(() => {
		if (!tags) {
			return;
		}
		setLocalTags(tags);
	}, [tags]);

	const deleteTag = useCallback(
		(id: string) => {
			setLocalTags([...localTags.filter((tag) => tag.id !== id)]);
		},
		[localTags]
	);

	const editTag = useCallback(
		(tag: TagRecord) => {
			setLocalTags([
				...localTags.map((oldTag) => {
					if (oldTag.id === tag.id) {
						return tag;
					}
					return oldTag;
				}),
			]);
		},
		[localTags]
	);

	const addTag = useCallback(
		(name: string) => {
			const lastId = parseInt(localTags[localTags.length - 1].id ?? 0);
			setLocalTags([
				...localTags,
				{
					name,
					id: (lastId + 1).toString(),
				},
			]);
		},
		[localTags]
	);

	const tagList = useMemo(() => {
		return [
			...localTags?.map((tag) => {
				return <Tag onDelete={deleteTag} onEdit={editTag} tag={tag} key={tag.id} />;
			}),
			<TagAddButton onClick={addTag} key={'add_tag'} />,
		];
	}, [localTags, addTag, editTag, deleteTag]);

	return (
		<main style={container}>
			<div style={tagListContainer}>{tagList}</div>
		</main>
	);
}

const container: React.CSSProperties = {
	display: 'flex',
	flex: 1,
	height: '100vh',
	flexDirection: 'column',
	justifyContent: 'center',
	backgroundColor: '#2C8C99',
};

const tagListContainer: React.CSSProperties = {
	display: 'flex',
	flexWrap: 'wrap',
	alignSelf: 'center',
	maxWidth: 720,
};

export default App;
