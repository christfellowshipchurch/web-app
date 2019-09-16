import React from "react"
import renderer from "react-test-renderer"

import Feature from '../index'

describe("Feature", () => {

    // Email Capture
    it("renders the EmailCapture feature", () => {
        const tree = renderer.create(
            <Feature name="emailCapture" />
        )

        expect(tree).toMatchSnapshot()
    })

    // Email Capture
    it("renders the CampusSelect feature", () => {
        const tree = renderer.create(
            <Feature name="emailCapture" />
        )

        expect(tree).toMatchSnapshot()
    })

    // Default Feature
    it("renders a React Fragment when no feature is found", () => {
        const tree = renderer.create(
            <Feature name="doesNotExist" />
        )

        expect(tree).toMatchSnapshot()
    })

    it("renders a React Fragment when no feature name is passed in", () => {
        const tree = renderer.create(
            <Feature />
        )

        expect(tree).toMatchSnapshot()
    })

    // Property Passing
    it("passes properties into a feature", () => {
        const tree = renderer.create(
            <Feature name="someFeature" myProp="my-value" />
        )

        expect(tree).toMatchSnapshot()
    })
})