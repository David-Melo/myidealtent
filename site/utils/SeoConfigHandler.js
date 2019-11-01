export default ({app,page}) => {

    const isPage = !!page;

    let canonical = !isPage ? `https://${app.domain}` : `https://${app.domain}/${page.slug}`;

    let appSeo = {
        title: app.name,
        tagline: app.tagline,
        canonical: canonical,
        description: app.description,
        og_image: app.og_image,
        og_image_width: app.og_image_width,
        og_image_height: app.og_image_height,
        twitter_handle: app.twitter_handle,
    };

    let pageSeo = page ? {
        title: page.title,
        tagline: page.tagline,
        canonical: canonical,
        description: page.description,
        og_image: page.og_image,
        og_image_width: page.og_image_width,
        og_image_height: page.og_image_height,
        twitter_handle: page.twitter_handle,
    } : {};

    let finalSeo = Object.assign({},appSeo,pageSeo);

    return {
        title: finalSeo.tagline,
        titleTemplate: !isPage ? `${app.name} | %s` : `${page.title} - ${app.name} | %s`,
        description: finalSeo.description,
        canonical: canonical,
        openGraph: {
            type: 'website',
            site_name: app.name,
            url: canonical,
            title: `${finalSeo.title} - ${finalSeo.tagline}`,
            description: finalSeo.description,
            images: [
                {
                    url: `https://s3.amazonaws.com/spectre-uploads/${finalSeo.og_image}`,
                    width: finalSeo.og_image_width,
                    height: finalSeo.og_image_height,
                    alt: !isPage ? `${app.title} - ${app.tagline}` : `${page.title} - ${app.title} - ${page.tagline}`,
                }
            ]
        },
        twitter: {
            handle: `@${finalSeo.twitter_handle}`,
            site: `@${finalSeo.twitter_handle}`,
            cardType: 'summary_large_image',
        },
    }

}