import MarkdownIt from "markdown-it";

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

export default stringToHtml;