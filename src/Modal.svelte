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
            <article class="media">
                <div class="media-left">
                    <figure
                        class="image is-64x64 has-background-primary is-flex is-justify-content-center is-align-items-center"
                    >
                        {#if !!talk.speaker1PictureURL}
                            <figure class="image is-primary is-64x64">
                                <img src={talk.speaker1PictureURL} />
                            </figure>
                        {:else if !!talk.speaker1FullName}
                            <figure
                                class="image is-primary is-flex is-64x64 is-align-items-center is-justify-content-center"
                            >
                                <div class="has-text-white is-size-4">
                                    {talk.speaker1FullName[0]}
                                </div>
                            </figure>
                        {:else if !!talk.title}}
                            <figure
                                class="image is-primary is-flex is-64x64 is-align-items-center is-justify-content-center"
                            >
                                <div class="has-text-white is-size-4">
                                    {talk.title[0]}
                                </div>
                            </figure>
                        {/if}
                    </figure>
                </div>
                <div class="media-content">
                    <div class="content">
                        <p>
                            <strong>{talk.speaker1FullName}</strong>
                            <small>
                                {#if !!talk.speaker1JobTitle}
                                    {talk.speaker1JobTitle}
                                {/if}
                                {#if !!talk.speaker1JobTitle && !!talk.speaker1Company}
                                    @
                                {/if}
                                {#if !!talk.speaker1Company}
                                    {talk.speaker1Company}
                                {/if}
                            </small>
                            {#if !!talk.speaker1TwitterURL}
                                <br />
                                {#if talk.speaker1TwitterURL.startsWith("http")}
                                    <a target="_blank" href={talk.speaker1TwitterURL}>
                                        <small
                                            ><i class="fa-brands fa-twitter" />
                                            {talk.speaker1TwitterURL}</small
                                        >
                                    </a>
                                {:else}
                                    <small
                                        ><i class="fa-brands fa-twitter" />
                                        {talk.speaker1TwitterURL}</small
                                    >
                                {/if}
                            {/if}
                            {#if !!talk.speaker1LinkedInURL}
                                <br />
                                {#if talk.speaker1LinkedInURL.startsWith("http")}
                                    <a target="_blank" href={talk.speaker1LinkedInURL}>
                                        <small
                                            ><i class="fa-brands fa-linkedin" />
                                            {talk.speaker1LinkedInURL}</small
                                        >
                                    </a>
                                {:else}
                                    <small
                                        ><i class="fa-brands fa-linkedin" />
                                        {talk.speaker1LinkedInURL}</small
                                    >
                                {/if}
                            {/if}
                        </p>
                        <div class="has-text-justified word-break break-word">
                            {@html stringToHtml(talk.speaker1Bio)}
                        </div>
                    </div>
                </div>
            </article>
            {#if !!talk.speaker2FullName}
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
                            {:else if !!talk.speaker2FullName}
                                <figure
                                    class="image is-primary is-flex is-64x64 is-align-items-center is-justify-content-center"
                                >
                                    <div class="has-text-white is-size-4">
                                        {talk.speaker2FullName[0]}
                                    </div>
                                </figure>
                            {:else if !!talk.title}
                                <figure
                                    class="image is-primary is-flex is-64x64 is-align-items-center is-justify-content-center"
                                >
                                    <div class="has-text-white is-size-4">
                                        {talk.title[0]}
                                    </div>
                                </figure>
                            {/if}
                        </figure>
                    </div>
                    <div class="media-content">
                        <div class="content">
                            <p>
                                <strong>{talk.speaker2FullName}</strong>
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
            {#if !!talk.speaker3FullName}
                <br />
                <article class="media">
                    <div class="media-left">
                        <figure
                            class="image is-64x64 has-background-primary is-flex is-justify-content-center is-align-items-center"
                        >
                            {#if !!talk.speaker3PictureURL}
                                <figure class="image is-primary is-64x64">
                                    <img src={talk.speaker3PictureURL} />
                                </figure>
                            {:else if !!talk.speaker3FullName}
                                <figure
                                    class="image is-primary is-flex is-64x64 is-align-items-center is-justify-content-center"
                                >
                                    <div class="has-text-white is-size-4">
                                        {talk.speaker3FullName[0]}
                                    </div>
                                </figure>
                            {:else if !!talk.title}
                                <figure
                                    class="image is-primary is-flex is-64x64 is-align-items-center is-justify-content-center"
                                >
                                    <div class="has-text-white is-size-4">
                                        {talk.title[0]}
                                    </div>
                                </figure>
                            {/if}
                        </figure>
                    </div>
                    <div class="media-content">
                        <div class="content">
                            <p>
                                <strong>{talk.speaker3FullName}</strong>
                                <small>
                                    {#if !!talk.speaker3JobTitle}
                                        {talk.speaker3JobTitle}
                                    {/if}
                                    {#if !!talk.speaker3JobTitle && !!talk.speaker3Company}
                                        @
                                    {/if}
                                    {#if !!talk.speaker3Company}
                                        {talk.speaker3Company}
                                    {/if}
                                </small>
                                {#if !!talk.speaker3TwitterURL}
                                    <br />
                                    {#if talk.speaker3TwitterURL.startsWith("http")}
                                        <a target="_blank" href={talk.speaker3TwitterURL}>
                                            <small
                                                ><i class="fa-brands fa-twitter" />
                                                {talk.speaker3TwitterURL}</small
                                            >
                                        </a>
                                    {:else}
                                        <small
                                            ><i class="fa-brands fa-twitter" />
                                            {talk.speaker3TwitterURL}</small
                                        >
                                    {/if}
                                {/if}
                                {#if !!talk.speaker3LinkedInURL}
                                    <br />
                                    {#if talk.speaker3LinkedInURL.startsWith("http")}
                                        <a target="_blank" href={talk.speaker3LinkedInURL}>
                                            <small
                                                ><i class="fa-brands fa-linkedin" />
                                                {talk.speaker3LinkedInURL}</small
                                            >
                                        </a>
                                    {:else}
                                        <small
                                            ><i class="fa-brands fa-linkedin" />
                                            {talk.speaker3LinkedInURL}</small
                                        >
                                    {/if}
                                {/if}
                            </p>
                            <div
                                class="has-text-justified word-break break-word"
                            >
                                {@html stringToHtml(talk.speaker3Bio)}
                            </div>
                        </div>
                    </div>
                </article>
            {/if}
        </section>
    </div>
</modal>
