import React, { useState } from 'react'
import { Feature } from '../features'
import { Tabs, ButtonRow, Button, Checkbox, Radio } from '../../ui'

import {
  Card,
  TileRowCard,
} from '../../ui'
import ContentCardConnected from '../../content-card-connected'
import classnames from 'classnames'

const data = [
  {
    "id": "ActionListAction:737c0fb68169e8184e5bb61934e585ff",
    "title": "Holy Land Tour",
    "action": "READ_EVENT",
    "image": {
      "sources": [
        {
          "uri": "https://cloudfront.christfellowship.church/GetImage.ashx?guid=3d181692-f527-439c-99c6-5c570980624f"
        }
      ]
    },
    "relatedNode": {
      "id": "EventContentItem:051a779ce5c61710dc6c43845e2b190c"
    }
  },
  {
    "id": "ActionListAction:fbce58f34cb30002d4445f4fd195f3d6",
    "title": "Guest Speaker – Dr. John Maxwell",
    "action": "READ_EVENT",
    "image": {
      "sources": [
        {
          "uri": "https://cloudfront.christfellowship.church/GetImage.ashx?guid=4cd939ab-92a6-4fab-84cf-ba5c9394ab69"
        }
      ]
    },
    "relatedNode": {
      "id": "EventContentItem:59a498de506704696a2a7b1ca21b3fff"
    }
  },
  {
    "id": "ActionListAction:ab55e42692de937cc7dbc6c5ca20d5c1",
    "title": "Brunch 🍳",
    "action": "READ_EVENT",
    "image": {
      "sources": [
        {
          "uri": "https://cloudfront.christfellowship.church/GetImage.ashx?guid=6eea6a50-6538-4c63-bdc7-2e2f6ae8ba16"
        }
      ]
    },
    "relatedNode": {
      "id": "EventContentItem:223e2015768c7ebadf0060f3cc046c32"
    }
  },
  {
    "id": "ActionListAction:f18af811833e53118187be824038b100",
    "title": "At The Movies – Christmas Edition",
    "action": "READ_EVENT",
    "image": {
      "sources": [
        {
          "uri": "https://cloudfront.christfellowship.church/GetImage.ashx?guid=57a96222-3304-4aa7-a73f-6667516de6e8"
        }
      ]
    },
    "relatedNode": {
      "id": "EventContentItem:657dd4deb97dcdc6672e9350c78ba248"
    }
  }
]

const DefaultPage = () => {
  const [enabled, setEnabled] = useState(false)
  const [gender, setGender] = useState('Male')


  return (
    <div className='container p-1 bg-light'>
      <div className='row'>
        <div className='col-12'>
          <Card>
            <div className="container-fluid">
              <div className="row">
                <div className="col">
                  <h3>
                    Title
                  </h3>
                </div>
              </div>
              <div className="row mx-n2">
                {data.map(({ relatedNode }, i) =>
                  <div
                    key={i}
                    className={classnames(
                      'col-12',
                      'col-md-6'
                    )}
                  >
                    <ContentCardConnected
                      contentId={relatedNode.id}
                      card={TileRowCard}
                    />
                  </div>
                )}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>

  )
}

DefaultPage.defaultProps = {
}

DefaultPage.propTypes = {
}

export default DefaultPage
