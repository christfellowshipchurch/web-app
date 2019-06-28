import React from 'react'
import Content from '../../Content'
import renderer from 'react-test-renderer'

describe('ContentContainer', () => {

    it('renders button with correct color', () => {
        const tree = renderer.create(
            <Content>
                videoUrl="https://video.url.com"
                imageUrl="https://image.url.com"
                imageAlt="Image Alt"
                ratio="21by9"
                layout="default"
            >

            </Content>
        )

        expect(tree).toMatchSnapshot()
    })
})