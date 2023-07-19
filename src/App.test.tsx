import React from 'react';
import {render, screen, fireEvent} from '@testing-library/react';
import App from './App';

test('adding a tag', async () => {
	render(<App />);
	const button = await screen.findByText('+');
	expect(button).toBeDefined();
	fireEvent.click(button);

	screen.getByPlaceholderText('Add tag...');
});
