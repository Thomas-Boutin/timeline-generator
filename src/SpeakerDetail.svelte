<script>
	import stringToHtml from './stringToHtml';

	export let speaker;
</script>

<article class="media">
	<div class="media-left">
		<figure
			class="image is-64x64 has-background-primary is-flex is-justify-content-center is-align-items-center"
		>
			{#if !!speaker.pictureURL}
				<figure class="image is-primary is-64x64">
					<img src={speaker.pictureURL} />
				</figure>
			{:else if !!speaker.fullName}
				<figure
					class="image is-primary is-flex is-64x64 is-align-items-center is-justify-content-center"
				>
					<div class="has-text-white is-size-4">
						{speaker.fullName[0]}
					</div>
				</figure>
			{:else if !!speaker.talkTitle}
				<figure
					class="image is-primary is-flex is-64x64 is-align-items-center is-justify-content-center"
				>
					<div class="has-text-white is-size-4">
						{speaker.talkTitle[0]}
					</div>
				</figure>
			{/if}
		</figure>
	</div>
	<div class="media-content">
		<div class="content">
			<p>
				<strong>{speaker.fullName}</strong>
				<small>
					{#if !!speaker.jobTitle}
						{speaker.jobTitle}
					{/if}
					{#if !!speaker.jobTitle && !!speaker.company}
						@
					{/if}
					{#if !!speaker.company}
						{speaker.company}
					{/if}
				</small>
				{#if !!speaker.twitterURL}
					<br />
					{#if speaker.twitterURL.startsWith("http")}
						<a target="_blank" href={speaker.twitterURL}>
							<small
								><i class="fa-brands fa-twitter" />
								{speaker.twitterURL}</small
							>
						</a>
					{:else}
						<small
							><i class="fa-brands fa-twitter" />
							{speaker.twitterURL}</small
						>
					{/if}
				{/if}
				{#if !!speaker.linkedInURL}
					<br />
					{#if speaker.linkedInURL.startsWith("http")}
						<a target="_blank" href={speaker.linkedInURL}>
							<small
								><i class="fa-brands fa-linkedin" />
								{speaker.linkedInURL}</small
							>
						</a>
					{:else}
						<small
							><i class="fa-brands fa-linkedin" />
							{speaker.linkedInURL}</small
						>
					{/if}
				{/if}
			</p>
			<div
				class="has-text-justified word-break break-word"
			>
				{@html stringToHtml(speaker.bio)}
			</div>
		</div>
	</div>
</article>