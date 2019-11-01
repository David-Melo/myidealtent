import React from "react";
import Link from 'next/link';

export const SplashViewItem = ({item}) => (
    <div className="splash-wrapper" style={{backgroundImage:`url(https://s3.amazonaws.com/spectre-uploads/${item.image})`}}>
        <div className="splash-inner">
            <img src={`https://s3.amazonaws.com/spectre-uploads/${item.splash_logo}`}/>
            <div className="content" dangerouslySetInnerHTML={{__html:item.content}} />
            <Link href="/home">
                <a className="splash-link">Get Started</a>
            </Link>
        </div>
    </div>
);

export const SplashView = ({view}) => (
    <React.Fragment>
        {view.collection && view.collection.pages.map(function(i,k){
            return <SplashViewItem key={k} item={i}/>;
        })}
        {view.page &&
        <SplashViewItem item={view.page}/>
        }
    </React.Fragment>
);
