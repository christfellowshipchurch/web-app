import React from "react"
import renderer from "react-test-renderer"

import CampusSelect from '../index'

describe("CampusSelect", () => {
    it("renders the CampusSelect feature", () => {
        const tree = renderer.create(
            <CampusSelect />
        )

        expect(tree).toMatchSnapshot()
    })

    it("renders the CampusSelect feature with an alternate background color", () => {
        const tree = renderer.create(
            <CampusSelect background="bg-light" />
        )

        expect(tree).toMatchSnapshot()
    })
})