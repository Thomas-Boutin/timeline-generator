<script>
    import SpeakerDetail from './SpeakerDetail.svelte';
    import stringToHtml from './stringToHtml';

    export let talk;
    export let isOpen;
    export let onDismiss;

    let speakers = [];

    $: talk, getSpeakers();

    function getSpeakers() {
        speakers = [];
        let speakerIndex = 1;

        while (Object.keys(talk).indexOf('speaker' + speakerIndex + 'FullName') != -1 && talk['speaker' + speakerIndex + 'FullName']) {
            speakers.push(
                {
                    pictureURL: talk['speaker' + speakerIndex + 'PictureURL'],
                    fullName: talk['speaker' + speakerIndex + 'FullName'],
                    talkTitle: talk.title,
                    jobTitle: talk['speaker' + speakerIndex + 'JobTitle'],
                    company: talk['speaker' + speakerIndex + 'Company'],
                    twitterURL: talk['speaker' + speakerIndex + 'TwitterURL'],
                    linkedInURL: talk['speaker' + speakerIndex + 'LinkedInURL'],
                    bio: talk['speaker' + speakerIndex + 'Bio'],
                }
            )

            speakerIndex++;
        }
    }

</script>

<modal class:is-active={isOpen} class="modal">
    <div class="modal-background" />
    <div class="modal-card">
        <header class="modal-card-head has-background-primary">
            <p class="modal-card-title is-flex-shrink-1 has-text-white pr-3">
                {talk.title}
            </p>
            <button
                class="delete"
                aria-label="close"
                on:click={() => onDismiss()}
            />
        </header>
        <section class="modal-card-body">
            <p class="mb-3">
                <span class="tag is-primary is-light">
                    {talk.track}
                </span>
                {#if talk.language === 'French'}
                    <span class="tag">
                        {talk.language} 🇫🇷
                    </span>
                {/if}
                {#if talk.language === 'English'}
                    <span class="tag">
                        {talk.language} 🇬🇧
                    </span>
                {/if}
            </p>
            <article class="message is-black">
                <div class="message-header">
                    <p>Résumé du talk</p>
                </div>
                <div class="message-body">
                    {#if !!talk.category}
                        <p class="is-size-7 mb-2 has-text-success-dark">
                            <i class="fa fa-tag" />
                            {talk.category}
                        </p>
                    {/if}
                    <div class="has-text-justified word-break break-word">
                        {@html stringToHtml(talk.abstract)}
                    </div>
                </div>
            </article>
            <hr />
            {#each speakers as speaker}
                <SpeakerDetail speaker={speaker} />
                <br>
            {/each}
        </section>
    </div>
</modal>
