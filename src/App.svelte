<script>
	import Modal from "./Modal.svelte";
	import SlotTalk from "./SlotTalk.svelte";

	let tracks = ["Tout"];
	let slots = [];
	let currentTrack;
	let currentSlots = [];
	let isModalOpen = false;
	let modalTalk = {};

	fetch("/csvjson.json")
		.then((response) => response.json())
		.then((response) => {
			slots = response;
			tracks = [...tracks,...new Set(response.map((talk) => talk.track))];
			selectTrack(0);
		});

	function selectTrack(index) {
		currentTrack = tracks[index];

		if (currentTrack === "Tout") {
			currentSlots = slots;
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
	<div class:is-centered="{currentTrack !== "Tout"}" class="timeline">
		{#each currentSlots as slot, i}
			{#if slot.type === "talk"}
				<SlotTalk talk={slot} isTalkPositionEven={isTalkPositionEven(slot)} onShowTalkDetail={showTalkDetail} />
			{/if}
			{#if slot.type === "section"}
				<header class="timeline-header">
					<span class="tag is-medium is-primary">{slot.label}</span>
				</header>
			{/if}
			{#if slot.type === "break"}
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
