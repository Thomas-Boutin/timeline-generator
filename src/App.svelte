<script>
	import Modal from "./Modal.svelte";
	import SlotTalk from "./SlotTalk.svelte";

	let tracks = ["Tout"];
	let slots = [];
	let currentTrack;
	let currentSlots = [];
	let isModalOpen = false;
	let modalTalk = {};

	fetch("/csvjson.json", {cache: "no-store"})
		.then((response) => response.json())
		.then((response) => {
			slots = response;
			tracks = [...tracks,...new Set(response.map((talk) => talk.track))];
			selectTrack(0);
		});

	function selectTrack(index) {
		const groupBy = (x,f)=>x.reduce((a,b)=>((a[f(b)]||=[]).push(b),a),{});

		currentTrack = tracks[index];

		if (currentTrack === "Tout") {
			currentSlots = slots.filter((slot) => slot.type !== "break");
			currentSlots.sort((a, b) => {
				const hourA = parseInt(a.schedule.substring(0, a.schedule.indexOf('h'))); 
				const timeA = parseInt(a.schedule.substring(a.schedule.indexOf('h') + 1, a.length)); 
				const hourB = parseInt(b.schedule.substring(0, b.schedule.indexOf('h'))); 
				const timeB = parseInt(b.schedule.substring(a.schedule.indexOf('h') + 1, b.length));
				
				if (hourA > hourB) return 1;
				if (hourB > hourA) return -1;
				if (hourA == hourB && timeA > timeB) return 1;
				if (hourA == hourB && timeB > timeA) return -1;

				return 0;
			});
			currentSlots = Object.entries(groupBy(currentSlots, v => v.schedule.substring(0, v.schedule.indexOf('h'))));
		}
		if (currentTrack !== "Tout") {
			currentSlots = slots.filter((slot) => slot.track === currentTrack);
		}
	}

	function showTalkDetail(talk) {
		modalTalk = talk;
		isModalOpen = true;
	}

	function isTalkPositionEven(talk) {
		return currentSlots.filter(slot => slot.type == 'talk').indexOf(talk) % 2 === 0
	}
</script>

<timeline>
	<div class="tabs is-centered">
		<ul>
			{#each tracks as track, i}
				<li
					class:is-active={track === currentTrack}
					on:click={() => selectTrack(i)}
				>
					<a>{track}</a>
				</li>
			{/each}
		</ul>
	</div>
	<div class:is-centered="{currentTrack !== "Tout" && window.innerWidth > 768}" class="timeline">
		{#each currentSlots as slot}
			{#if slot.type === "talk" && currentTrack !== "Tout"}
				<SlotTalk talks={[slot]} currentTrack={currentTrack} isTalkPositionEven={isTalkPositionEven(slot)} onShowTalkDetail={showTalkDetail} />
			{/if}
			{#if currentTrack == "Tout" && slot[1][0].type === 'talk'}
				<SlotTalk talks={slot[1]} currentTrack={currentTrack} isTalkPositionEven={false} onShowTalkDetail={showTalkDetail} />
			{/if}
			{#if slot.type === "section"}
				<header class="timeline-header pt-5 pb-5">
					<span class="tag is-medium is-primary">{slot.label}</span>
				</header>
			{/if}
			{#if currentTrack == "Tout" && slot[1][0].type === 'section'}
				<header class="timeline-header pt-5 pb-5">
					<span class="tag is-medium is-primary">{slot[1][0].label}</span>
				</header>
			{/if}
			{#if slot.type === "break" && currentTrack !== "Tout"}
				<div class="timeline-item timeline-break">
					<div
						class="timeline-marker is-primary container is-image is-16x16 is-justify-content-center is-flex"
					/>
					<div class="timeline-content">
						<p>
							<small>Pause</small>
						</p>
					</div>
				</div>
			{/if}
		{/each}
	</div>
	<Modal
		isOpen={isModalOpen}
		talk={modalTalk}
		onDismiss={() => (isModalOpen = false)}
	/>
</timeline>

<svelte:head>
	<style src="app.scss"></style>
</svelte:head>
