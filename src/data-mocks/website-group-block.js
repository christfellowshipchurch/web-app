import GET_GROUP_BLOCK from '../ui/GroupBlock/queries'
import { BLOCK_TEMPLATE } from './website-block'

export const GET_GROUP_ITEM_MOCK = {
    request: {
        query: GET_GROUP_BLOCK,
        variables: { id: "WebsiteGroupItem:1" }
    },
    result: {
        data: {
            node: {
                // __typename:'WebsiteGroupItem',
                id:'WebsiteGroupItem:1',
                title:'Group Block Title',
                htmlContent: 'html content',
                childContentItemsConnection: {
                    edges: [{
                        node: BLOCK_TEMPLATE,
                        node: BLOCK_TEMPLATE,
                        node: BLOCK_TEMPLATE,
                    }]
                }
            }
        }
    }
}