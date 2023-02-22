import { useEffect } from 'react';
export default function MyComponent({ text }) {
	const element = (<textarea></textarea>)
	useEffect(() => {
		// Have access to element here
	}, [text]);
	return element;
}