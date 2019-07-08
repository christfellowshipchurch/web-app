import {
    mapEdgesToNodes, hexToRGB, getTextColorClass, renderContent, buttonClick, renderButtons
} from '../utils'
import renderer from 'react-test-renderer'



describe("Utility Methods", () => {
    it('maps a data object down to the node property', () => {
        const data = {
            edges: [
                {
                    node: { id: 1 }
                },
                {
                    node: { id: 2 }
                }
            ]
        }

        const expected = [{ id: 1 }, { id: 2 }]
        const mapped = mapEdgesToNodes(data)

        expect(mapped.length).toBe(2)
        expect(mapped).toEqual(expected)
    })

    it('converts a hex value to an RGB object', () => {
        const hex = '#ffffff'
        const rgb = { r: 255, g: 255, b: 255 }

        expect(hexToRGB(hex)).toEqual(rgb)
    })

    it('returns null because it recieves a non-valid hex code', () => {
        const tests = [
            'lkasdvoindoibasd',
            '1658498462198',
            '!)(*&#$%^&#',
            'asodivn80103!)#%&#)',
            '1'
        ]

        tests.forEach((n) => expect(hexToRGB(n)).toBe(null))
    })

    it('converts a shorthand hex value to an RGB object', () => {
        const hex = '#fff'
        const rgb = { r: 255, g: 255, b: 255 }

        expect(hexToRGB(hex)).toEqual(rgb)
    })

    it('converts a hex value with no hashtag to an RGB object', () => {
        const full = 'ffffff'
        const shorthand = 'fff'
        const rgb = { r: 255, g: 255, b: 255 }

        expect(hexToRGB(full)).toEqual(rgb)
        expect(hexToRGB(shorthand)).toEqual(rgb)
    })

    it('takes a hex value, returns text-color class', () => {
        const lightColor = '#EBFFFF'
        const darkColor = '#203131'
        const darkText = 'text-dark'
        const lightText = 'text-light'

        expect(getTextColorClass(lightColor)).toEqual(darkText)
        expect(getTextColorClass(darkColor)).toEqual(lightText)
    })

        //Snapshot Testing for Rendering Content//

    it('renders content with background layout', () => {
        const content = {
            backgroundColor: '#203131',
            imageAlt: 'image',
            coverImage: [{ sources: [{ uri: "my-img-url.com" }] }],
            imageRatio: '21by9',
            title: 'Title',
            body: 'Body',
            contentLayout: 'background',
            callsToAction: [{ call: 'call', action: 'action' }]
        }
        const tree = renderer.create(  
            renderContent(content)           
        )
        expect(tree).toMatchSnapshot()
    })

    it('renders content with original layout', ()=>{
        const content = {
            backgroundColor: '#203131',
            imageAlt: 'image',
            imageRatio: '21by9',
            title: 'Title',
            body: 'Body',
            contentLayout: 'original',
            callsToAction: [{ call: 'call', action: 'action' }]
        }
        const tree = renderer.create(  
            renderContent(content)
        )
        expect(tree).toMatchSnapshot()
    })

})