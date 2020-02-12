import getWebPageBlockItems from '../queries/getWebPageBlockItems'

export const GET_BLOCK_ITEM_MOCK = {
    request: {
        query: getWebPageBlockItems,
        variables: { id: "WebsiteBlock" }
    },
    result: {
        data: {
            title: 'WebsiteBlock-Title'
        },
    },
}