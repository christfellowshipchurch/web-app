import React from 'react'
import Layout from '..'
import renderer from 'react-test-renderer'

describe('Layout', () => {
    it('renders Layout in default layout without media', () => {
        const tree = renderer.create(
            <Layout
                ratio="21by9"
                layout="default"
            >
                <h1>Title</h1>
                <p>Layout body.</p>
            </Layout>
        )

        expect(tree).toMatchSnapshot();
    })

    it('renders an image and Layout in default layout', () => {
        const tree = renderer.create(
            <Layout
                imageUrl="https://image.url.com"
                imageAlt="Image Alt"
                ratio="21by9"
                layout="default"
            >
                <h1>Title</h1>
                <p>Layout body.</p>
            </Layout>
        )

        expect(tree).toMatchSnapshot();
    })

    it('renders a subtitle in the Layout in the default size', () => {
        const tree = renderer.create(
            <Layout
                videoUrl="https://video.url.com"
                imageUrl="https://image.url.com"
                imageAlt="Image Alt"
                ratio="21by9"
                layout="default"
            >
                <h1>Title</h1>
                <h4>Subtitle</h4>
                <p>Layout body.</p>
            </Layout>
        )

        expect(tree).toMatchSnapshot()
    })

    it('renders a content Layout with the inverted layout', () => {
    const tree = renderer.create(
            <Layout
                videoUrl="https://video.url.com"
                imageUrl="https://image.url.com"
                imageAlt="Image Alt"
                ratio="21by9"
                layout="inverted"
            >
                <h1 larger>Title</h1>
                <h4 larger>Subtitle</h4>
                <p>Layout body.</p>
            </Layout>
        )

        expect(tree).toMatchSnapshot()
    })

    it('renders a content Layout with the right layout', () => {
        const tree = renderer.create(
                <Layout
                    videoUrl="https://video.url.com"
                    imageUrl="https://image.url.com"
                    imageAlt="Image Alt"
                    ratio="21by9"
                    layout="right"
                >
                    <h1>Title</h1>
                    <h4>Subtitle</h4>
                    <p>Layout body.</p>
                </Layout>
            )
    
            expect(tree).toMatchSnapshot()
        })

        it('renders a content Layout with the left layout', () => {
            const tree = renderer.create(
                    <Layout
                        videoUrl="https://video.url.com"
                        imageUrl="https://image.url.com"
                        imageAlt="Image Alt"
                        ratio="21by9"
                        layout="left"
                    >
                        <h1>Title</h1>
                        <h4>Subtitle</h4>
                        <p>Layout body.</p>
                    </Layout>
                )
        
                expect(tree).toMatchSnapshot()
            })
})