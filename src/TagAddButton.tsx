import {useState} from 'react';
import {Button, tagStyle, inputStyle} from './Tag';

interface TagAddButtonProps {
	onClick: (name: string) => void;
}

const TagAddButton: React.FunctionComponent<TagAddButtonProps> = (props) => {
	const [name, setName] = useState<string>('');
	const [isActive, setIsActive] = useState(false);
	const paddingLeft = isActive ? 8 : 0;

	const onClick = () => {
		if (isActive) {
			commitChanges();
			setIsActive(false);
		} else {
			setIsActive(true);
		}
	};

	const commitChanges = () => {
		if (name) {
			props.onClick(name);
			setName('');
		}
	};

	return (
		<div style={{...tagStyle, paddingLeft}}>
			{isActive && (
				<input
					type="text"
					value={name}
					style={inputStyle}
					onChange={(e) => setName(e.target.value)}
					onBlur={() => {
						commitChanges();
						setIsActive(false);
					}}
					placeholder="Add tag..."
					autoFocus
				/>
			)}
			<Button style={{fontSize: 22}} onClick={onClick}>
				+
			</Button>
		</div>
	);
};

export default TagAddButton;
