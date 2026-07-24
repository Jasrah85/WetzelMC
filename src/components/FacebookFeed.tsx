/**
 * Facebook Page timeline embed via Meta's Page Plugin (iframe form).
 * No API keys, app review, or SDK required. Note: the plugin is not
 * customizable (colors/layout are fixed by Facebook) and only renders
 * for visitors who aren't blocking Facebook domains — so we keep a
 * fallback link underneath.
 *
 * If richer styling is needed later, swap this component for a
 * third-party widget (EmbedSocial, SmashBalloon) or a Graph API
 * integration — see the rebuild plan document.
 */
export default function FacebookFeed({ height = 600 }: { height?: number }) {
  const pageUrl = encodeURIComponent("https://www.facebook.com/wetzelland/");
  const src = `https://www.facebook.com/plugins/page.php?href=${pageUrl}&tabs=timeline&width=500&height=${height}&small_header=true&adapt_container_width=true&hide_cover=false&show_facepile=false`;

  return (
    <div className="w-full max-w-[500px]">
      <iframe
        src={src}
        width="100%"
        height={height}
        style={{ border: "none", overflow: "hidden" }}
        scrolling="no"
        frameBorder="0"
        allowFullScreen
        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
        title="Wetzelland on Facebook"
      />
      <p className="mt-2 text-sm text-zinc-400">
        Feed not loading?{" "}
        <a
          href="https://www.facebook.com/wetzelland/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-orange-500 hover:underline"
        >
          Visit us on Facebook →
        </a>
      </p>
    </div>
  );
}
