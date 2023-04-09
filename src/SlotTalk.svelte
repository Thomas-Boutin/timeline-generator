<script>
	export let talks;
	export let onShowTalkDetail;
	export let isTalkPositionEven;
	export let currentTrack;
</script>

<div
	class:talk-position-even={isTalkPositionEven}
	class:talk-position-odd={!isTalkPositionEven}
	class="timeline-item"
>
	<div
		class="timeline-marker is-primary container is-image is-32x32 is-justify-content-center is-flex"
	>
		<div class="is-flex is-justify-content-center is-align-items-center">
			<i class="fa fa-microphone-lines has-text-white" />
		</div>
	</div>
	<div class="timeline-content">
		{#if talks.length > 1}
			<div class="talk-group-schedule">
				À partir de {talks[0].schedule.substring(
					0,
					talks[0].schedule.indexOf("h")
				)}h
			</div>
		{/if}
		<div class="columns is-multiline">
			{#each talks as talk}
				<div
					class:is-clickable={!!talk.abstract}
					class="column is-clickable"
					class:is-one-third={talks.length > 1}
					on:click={() =>
						!!talk.abstract && onShowTalkDetail(talk)}
				>
					<div class="box">
						<article class="media">
							<div class="media-left">
								{#if !!talk.speaker1PictureURL}
									<figure class="image is-primary is-64x64">
										<img src={talk.speaker1PictureURL} />
									</figure>
								{:else if !!talk.speaker2PictureURL}
									<figure class="image is-primary is-64x64">
										<img src={talk.speaker2PictureURL} />
									</figure>
								{:else if !!talk.speakerName}
									<figure
										class="image is-primary is-flex is-64x64 is-align-items-center is-justify-content-center"
									>
										<div class="has-text-white is-size-4">
											{talk.speaker1fullName[0]}
										</div>
									</figure>
								{:else}
									<figure
										class="image is-primary is-flex is-64x64 is-align-items-center is-justify-content-center"
									>
										<div class="has-text-white is-size-4">
											{talk.title[0]}
										</div>
									</figure>
								{/if}
							</div>
							<div class="media-content">
								<div class="content">
									<p>
										<strong>{talk.schedule}</strong>
										{#if !!talk.category}
											-
											<span
												class="is-size-7 has-text-success-dark is-capitalized"
												><i class="fa fa-tag" />
												{talk.category}</span
											>
										{/if}
										<br />
										<small class="is-justify-content-center"
											>{talk.title}</small
										>
									</p>
									<p>
										{#if currentTrack === "Tout"}
											<span
												class="tag is-primary is-light"
											>
												{talk.track}
											</span>
										{/if}
										{#if talk.language === "French"}
											<span class="tag">
												{talk.language} 🇫🇷
											</span>
										{/if}
										{#if talk.language === "English"}
											<span class="tag">
												{talk.language} 🇬🇧
											</span>
										{/if}
									</p>
								</div>
							</div>
						</article>
					</div>
				</div>
			{/each}
		</div>
	</div>
</div>

<style lang="scss">
	.talk-group-schedule {
		font-weight: bold;
		margin-top: 8px;
		margin-bottom: 1em;
	}
</style>
