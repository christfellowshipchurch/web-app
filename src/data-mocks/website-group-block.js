import getGroupContentItems from '../queries/getGroupContentItems'
import GET_BLOCK_ITEM from '../data-mocks/website-block'

export const GET_GROUP_ITEM_MOCK = {
    request: {
        query: getGroupContentItems,
        variables: { id: "GroupBlock" }
    },
    result: {
        data: {
            node: {
                childContentItemsConnection: {
                    edges: [
                        { node: GET_BLOCK_ITEM }, 
                    ]
                }
            }
        },
    },
}