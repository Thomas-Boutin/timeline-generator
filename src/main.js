import App from './App.svelte';

const app = new App({
	target: document.getElementById('timeline'),
	props: {
		slotsEndpoint: document.getElementById('timeline').getAttribute('slots-endpoint')
	}
});

export default app;