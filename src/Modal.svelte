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
        ).replaceAll("<a", '<a target="_blank"');
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
                        <p class="is-size-7 mb-2 has-text-success-dark">
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
                            <small>
                                {#if !!talk.speakerJobTitle}
                                    {talk.speakerJobTitle}
                                {/if}
                                {#if !!talk.speakerJobTitle && !!talk.speakerCompany}
                                    @
                                {/if}
                                {#if !!talk.speakerCompany}
                                    {talk.speakerCompany}
                                {/if}
                            </small>
                            {#if !!talk.speakerTwitterURL}
                                <br />
                                {#if talk.speakerTwitterURL.startsWith("http")}
                                    <a target="_blank" href={talk.speakerTwitterURL}>
                                        <small
                                            ><i class="fa-brands fa-twitter" />
                                            {talk.speakerTwitterURL}</small
                                        >
                                    </a>
                                {:else}
                                    <small
                                        ><i class="fa-brands fa-twitter" />
                                        {talk.speakerTwitterURL}</small
                                    >
                                {/if}
                            {/if}
                            {#if !!talk.speakerLinkedInURL}
                                <br />
                                {#if talk.speakerLinkedInURL.startsWith("http")}
                                    <a target="_blank" href={talk.speakerLinkedInURL}>
                                        <small
                                            ><i class="fa-brands fa-linkedin" />
                                            {talk.speakerLinkedInURL}</small
                                        >
                                    </a>
                                {:else}
                                    <small
                                        ><i class="fa-brands fa-linkedin" />
                                        {talk.speakerLinkedInURL}</small
                                    >
                                {/if}
                            {/if}
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
                                <small>
                                    {#if !!talk.speaker2JobTitle}
                                        {talk.speaker2JobTitle}
                                    {/if}
                                    {#if !!talk.speaker2JobTitle && !!talk.speaker2Company}
                                        @
                                    {/if}
                                    {#if !!talk.speaker2Company}
                                        {talk.speaker2Company}
                                    {/if}
                                </small>
                                {#if !!talk.speaker2TwitterURL}
                                    <br />
                                    {#if talk.speaker2TwitterURL.startsWith("http")}
                                        <a target="_blank" href={talk.speaker2TwitterURL}>
                                            <small
                                                ><i class="fa-brands fa-twitter" />
                                                {talk.speaker2TwitterURL}</small
                                            >
                                        </a>
                                    {:else}
                                        <small
                                            ><i class="fa-brands fa-twitter" />
                                            {talk.speaker2TwitterURL}</small
                                        >
                                    {/if}
                                {/if}
                                {#if !!talk.speaker2LinkedInURL}
                                    <br />
                                    {#if talk.speaker2LinkedInURL.startsWith("http")}
                                        <a target="_blank" href={talk.speaker2LinkedInURL}>
                                            <small
                                                ><i class="fa-brands fa-linkedin" />
                                                {talk.speaker2LinkedInURL}</small
                                            >
                                        </a>
                                    {:else}
                                        <small
                                            ><i class="fa-brands fa-linkedin" />
                                            {talk.speaker2LinkedInURL}</small
                                        >
                                    {/if}
                                {/if}
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
