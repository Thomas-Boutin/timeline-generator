import MarkdownIt from "markdown-it";

function stringToHtml(markdown) {
    var md = new MarkdownIt({
        linkify: true,
        html: true,
        typographer: true,
        breaks: false,
    });

    if (!markdown) return "";

    console.log(markdown);

    return md.render(
        markdown.replaceAll("\\n", "\n").replaceAll(/\t/g, "&nbsp;&nbsp;&nbsp;&nbsp;").replaceAll(/]\s*\(/gim, "](")
    ).replaceAll(/\n/g, '<br>').replaceAll("<a", '<a target="_blank"');
}

export default stringToHtml;