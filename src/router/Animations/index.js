import React, { useState } from 'react'
import classnames from 'classnames'

import {
    Block,
    Button
} from '../../ui'

const data = {
    callToAction: { call: "PLAN YOUR VISIT", action: "https://beta.christfellowship.church/plan-your-visit-page", __typename: "CallToAction" },
    contentLayout: "right",
    coverImage: { name: "Image", sources: Array(1), __typename: "ImageMedia" },
    htmlContent: "We know that going anywhere for the first time can be intimidating so here’s what you can expect when you visit any of our locations.",
    id: "WebsiteBlockItem:fa154cec75a349d44267b268a1f18189",
    imageAlt: "",
    imageRatio: "1by1",
    images: [{
        sources: [{
            uri: "https://cloudfront.christfellowship.church/GetImage.ashx?guid=16594ff1-0c0d-471c-a356-f6ef0ccbba4f"
        }]
    }],
    openLinksInNewTab: false,
    secondaryCallToAction: null,
    subtitle: "",
    title: "Here’s what you can expect when you visit Christ Fellowship",
}

const Router = () => {
    const [animate, setAnimate] = useState(false)
    const [preClass, setPreClass] = useState('opacity-0')

    return (
        <div className="container my-5">
            <div className="row">
                <div className="col text-center">
                    <Button
                        title="Animate"
                        disabled={animate}
                        onClick={() => {
                            setAnimate(true)
                            setPreClass(null)
                        }}
                    />
                </div>
                <div className="col text-center">
                    <Button
                        title="Reset"
                        disabled={!animate}
                        onClick={() => {
                            setAnimate(false)
                            setPreClass('opacity-0')
                        }}
                    />
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <Block
                        animate={animate}
                        className={preClass}
                        {...data}
                    />
                </div>
            </div>
        </div>
    )
}

export default Router