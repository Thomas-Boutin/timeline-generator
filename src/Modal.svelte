<script>
    import MarkdownIt from "markdown-it";

    export let talk;
    export let isOpen;
    export let onDismiss;

    function stringToHtml(markdown) {
        var md = new MarkdownIt({
            linkify: true,
            html: true,
            typographer: true,
            breaks: true,
        });

        if (!markdown) return "";

        return md.render(
            markdown.replaceAll("\\n", "\n").replaceAll(/]\s*\(/gim, "](")
        );
    }
</script>

<modal class:is-active={isOpen} class="modal">
    <div class="modal-background" />
    <div class="modal-card">
        <header class="modal-card-head has-background-primary">
            <p class="modal-card-title is-flex-shrink-1 has-text-white pr-3">
                {talk.label}
            </p>
            <button
                class="delete"
                aria-label="close"
                on:click={() => onDismiss()}
            />
        </header>
        <section class="modal-card-body">
            <p class="tag is-primary is-light mb-3">
                {talk.track}
            </p>
            <article class="message is-black">
                <div class="message-header">
                    <p>Résumé du talk</p>
                </div>
                <div class="message-body">
                    {#if !!talk.talkCategory}
                        <p class="is-size-7 has-text-success-dark">
                            <i class="fa fa-tag" />
                            {talk.talkCategory}
                        </p>
                    {/if}
                    <div class="has-text-justified word-break break-word">
                        {@html stringToHtml(talk.talkDescription)}
                    </div>
                </div>
            </article>
            <hr />
            <article class="media">
                <div class="media-left">
                    <figure
                        class="image is-64x64 has-background-primary is-flex is-justify-content-center is-align-items-center"
                    >
                        {#if !!talk.speakerPictureURL}
                            <figure class="image is-primary is-64x64">
                                <img src={talk.speakerPictureURL} />
                            </figure>
                        {:else if !!talk.speakerName}
                            <figure
                                class="image is-primary is-flex is-64x64 is-align-items-center is-justify-content-center"
                            >
                                <div class="has-text-white is-size-4">
                                    {talk.speakerName[0]}
                                </div>
                            </figure>
                        {:else if !!talk.label}}
                            <figure
                                class="image is-primary is-flex is-64x64 is-align-items-center is-justify-content-center"
                            >
                                <div class="has-text-white is-size-4">
                                    {talk.label[0]}
                                </div>
                            </figure>
                        {/if}
                    </figure>
                </div>
                <div class="media-content">
                    <div class="content">
                        <p>
                            <strong>{talk.speakerName}</strong>
                            <small>@johnsmith</small>
                        </p>
                        <div class="has-text-justified word-break break-word">
                            {@html stringToHtml(talk.speakerBio)}
                        </div>
                    </div>
                </div>
            </article>
            {#if !!talk.speaker2Name}
                <br />
                <article class="media">
                    <div class="media-left">
                        <figure
                            class="image is-64x64 has-background-primary is-flex is-justify-content-center is-align-items-center"
                        >
                            {#if !!talk.speaker2PictureURL}
                                <figure class="image is-primary is-64x64">
                                    <img src={talk.speaker2PictureURL} />
                                </figure>
                            {:else if !!talk.speaker2Name}
                                <figure
                                    class="image is-primary is-flex is-64x64 is-align-items-center is-justify-content-center"
                                >
                                    <div class="has-text-white is-size-4">
                                        {talk.speaker2Name[0]}
                                    </div>
                                </figure>
                            {:else if !!talk.label}
                                <figure
                                    class="image is-primary is-flex is-64x64 is-align-items-center is-justify-content-center"
                                >
                                    <div class="has-text-white is-size-4">
                                        {talk.label[0]}
                                    </div>
                                </figure>
                            {/if}
                        </figure>
                    </div>
                    <div class="media-content">
                        <div class="content">
                            <p>
                                <strong>{talk.speaker2Name}</strong>
                                <small>@johnsmith</small>
                            </p>
                            <div
                                class="has-text-justified word-break break-word"
                            >
                                {@html stringToHtml(talk.speaker2Bio)}
                            </div>
                        </div>
                    </div>
                </article>
            {/if}
        </section>
    </div>
</modal>
