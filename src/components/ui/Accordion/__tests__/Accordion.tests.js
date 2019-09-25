import React from 'react'
import renderer from 'react-test-renderer'
import Accordion from '../'

describe("Accordion", () => {
    // Rendering
    it("renders an Accordion without crashing", () => {
        const arr = [0, 1, 2, 3, 4]
        const tree = renderer.create(
            <Accordion>
                {arr.map((n, i) => (
                    <div title="Some Title" key={i}>
                        <h1>This is an item</h1>
                        <p>This is the text inside of that item.</p>
                    </div>
                ))}
            </Accordion>
        )

        expect(tree).toMatchSnapshot()
    })

    it("renders an Accordion with pagination", () => {
        const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
        const tree = renderer.create(
            <Accordion paginate>
                {arr.map((n, i) => (
                    <div title="Some Title" key={i}>
                        <h1>This is an item</h1>
                        <p>This is the text inside of that item.</p>
                    </div>
                ))}
            </Accordion>
        )

        expect(tree).toMatchSnapshot()
    })

    it("renders an Accordion with one single child", () => {
        const tree = renderer.create(
            <Accordion>
                <div title="Some Title" key={i}>
                    <h1>This is an item</h1>
                    <p>This is the text inside of that item.</p>
                </div>
            </Accordion>
        )

        expect(tree).toMatchSnapshot()
    })

    // Interactions

})