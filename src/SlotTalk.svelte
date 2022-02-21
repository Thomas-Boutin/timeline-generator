<script>
    export let talk;
    export let onShowTalkDetail;
	export let isTalkPositionEven;
</script>

<div class:talk-position-even={isTalkPositionEven} class:talk-position-odd={!isTalkPositionEven} class="timeline-item">
	<div
		class="timeline-marker is-primary container is-image is-32x32 is-justify-content-center is-flex"
	>
		{#if !!talk.speakerPictureURL}
			<img src={talk.speakerPictureURL} />
		{:else if !!talk.speaker2PictureURL}
			<img src={talk.speaker2PictureURL} />
		{:else}
			<div
				class="is-flex is-justify-content-center is-align-items-center"
			>
				<i class="fa fa-microphone-lines has-text-white" />
			</div>
		{/if}
	</div>
	<div class="timeline-content">
		<p class="heading">{talk.schedule} - <span class="is-size-7 has-text-success-dark is-capitalized"><i class="fa fa-tag"/> {talk.talkCategory}</span></p>
		<a on:click={() => onShowTalkDetail(talk)}>
			{talk.label}
		</a>
	</div>
</div>