import React, {Fragment} from "react";

export const SetGoogleTags = (code) => {
    return {
        __html: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${code}');
      `
    };
};

export const TrackPageView = (url,code) => {
    try {
        window.gtag('config', code, {
            page_location: url
        });
    } catch (error) {
        console.log(error)
    }
};

export const GoogleAnalytics = ({code}) => (
    <Fragment>
        <script async src={`https://www.googletagmanager.com/gtag/js?id=${code}`}></script>
        <script dangerouslySetInnerHTML={SetGoogleTags(code)} />
    </Fragment>
);