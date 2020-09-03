import { GET_EVENTS } from '../router/Events/queries';

export const EVENT_LIST_MOCK = {
  request: {
    query: GET_EVENTS,
  },
  result: {
    data: {
      allEvents: [
        {
          __typename: 'EventContentItem',
          id: 'EventContentItem:569c5cbfe8d109f8d7db5f9dd9fa6ee6',
          title: 'Baptism Weekend',
          summary: 'Take your next step',
          nextOccurrence: '2020-02-22T22:00:00.000Z',
          coverImage: {
            name: 'Image',
            sources: [
              {
                uri:
                  'https://cloudfront.christfellowship.church/GetImage.ashx?guid=55fd9771-62ff-41ab-913f-97618b5a749f',
              },
            ],
          },
          sharing: {
            url: 'https://apollosrock.newspring.cc',
            title: 'Share via ...',
            message: 'Baptism Weekend - Take your next step',
          },
          events: [
            {
              start: '2020-02-22T22:00:00.000Z',
            },
            {
              start: '2020-02-23T22:00:00.000Z',
            },
          ],
        },
        {
          __typename: 'EventContentItem',
          id: 'EventContentItem:7599c1977d3e517b75adeebc411d51ed',
          title: 'Vision Weekend',
          summary: 'The Movement is Now',
          nextOccurrence: '2020-02-22T23:30:00.000Z',
          coverImage: {
            name: 'Image',
            sources: [
              {
                uri:
                  'https://cloudfront.christfellowship.church/GetImage.ashx?guid=cb136dd3-83d9-41ae-912a-53266646edaf',
              },
            ],
          },
          sharing: {
            url: 'https://apollosrock.newspring.cc',
            title: 'Share via ...',
            message: 'Vision Weekend - The Movement is Now',
          },
          events: [
            {
              start: '2020-02-22T23:30:00.000Z',
            },
            {
              start: '2020-02-23T23:30:00.000Z',
            },
            {
              start: '2020-02-29T23:30:00.000Z',
            },
            {
              start: '2020-03-01T23:30:00.000Z',
            },
          ],
        },
        {
          __typename: 'EventContentItem',
          id: 'EventContentItem:75e68071e125ce1418af9336e54e3373',
          title: 'Easter at CF',
          summary:
            'Come Celebrate EasterAre you looking for a place to celebrate Easter?',
          nextOccurrence: '2020-04-11T21:00:00.000Z',
          coverImage: {
            name: 'Image',
            sources: [
              {
                uri:
                  'https://cloudfront.christfellowship.church/GetImage.ashx?guid=af2046eb-7000-48f0-b9c9-f80f64be3a70',
              },
            ],
          },
          sharing: {
            url: 'https://apollosrock.newspring.cc',
            title: 'Share via ...',
            message:
              'Easter at CF - Come Celebrate EasterAre you looking for a place to celebrate Easter?',
          },
          events: [
            {
              start: '2020-04-11T21:00:00.000Z',
            },
            {
              start: '2020-04-12T22:00:00.000Z',
            },
          ],
        },
        {
          __typename: 'EventContentItem',
          id: 'EventContentItem:ebe739b319f9ea85253ad2d699371d90',
          title: 'Freedom',
          summary: 'Your Journey to Freedom Starts Here',
          nextOccurrence: '2020-03-15T14:00:00.000Z',
          coverImage: {
            name: 'Image',
            sources: [
              {
                uri:
                  'https://cloudfront.christfellowship.church/GetImage.ashx?guid=1aa64b8a-eb72-40c7-9740-3d46254d7280',
              },
            ],
          },
          sharing: {
            url: 'https://apollosrock.newspring.cc',
            title: 'Share via ...',
            message: 'Freedom - Your Journey to Freedom Starts Here',
          },
          events: [
            {
              start: '2020-03-15T14:00:00.000Z',
            },
            {
              start: '2020-03-21T14:00:00.000Z',
            },
          ],
        },
        {
          __typename: 'EventContentItem',
          id: 'EventContentItem:b4bd53873e28223e8d8d2e4e130fc1d9',
          title: 'Kingdom Builders',
          summary: 'Learn more about Kingdom Builders',
          nextOccurrence: '2020-04-01T04:00:00.000Z',
          coverImage: {
            name: 'Image',
            sources: [
              {
                uri:
                  'https://cloudfront.christfellowship.church/GetImage.ashx?guid=78b4e4c9-b3bd-41f8-b230-7c1be7de959a',
              },
            ],
          },
          sharing: {
            url: 'https://apollosrock.newspring.cc',
            title: 'Share via ...',
            message: 'Kingdom Builders - Learn more about Kingdom Builders',
          },
          events: [
            {
              start: '2020-04-01T04:00:00.000Z',
            },
            {
              start: '2020-04-01T04:00:00.000Z',
            },
          ],
        },
        {
          __typename: 'EventContentItem',
          id: 'EventContentItem:bfc1c94e10360f9a8ae1bb866ee0cc4f',
          title: 'Prep for Marriage',
          summary:
            'Even more important than preparing to get married is preparing to be married!',
          nextOccurrence: '2020-04-12T14:00:00.000Z',
          coverImage: {
            name: 'Image',
            sources: [
              {
                uri:
                  'https://cloudfront.christfellowship.church/GetImage.ashx?guid=2261730e-878b-4212-8da2-43b7b7e561eb',
              },
            ],
          },
          sharing: {
            url: 'https://apollosrock.newspring.cc',
            title: 'Share via ...',
            message:
              'Prep for Marriage - Even more important than preparing to get married is preparing to be married!',
          },
          events: [
            {
              start: '2020-04-12T14:00:00.000Z',
            },
            {
              start: '2020-04-12T14:00:00.000Z',
            },
          ],
        },
        {
          __typename: 'EventContentItem',
          id: 'EventContentItem:dc527151fddce2bc05550816976bc44d',
          title: 'Baby Blessing Celebration',
          summary:
            'One of the very special things about Christ Fellowship is the way we nurture children and young people.',
          nextOccurrence: '2020-02-21T19:57:56.145Z',
          coverImage: {
            name: 'Image',
            sources: [
              {
                uri:
                  'https://cloudfront.christfellowship.church/GetImage.ashx?guid=af2e35df-e395-4cd3-985c-41be4fa5bb8d',
              },
            ],
          },
          sharing: {
            url: 'https://apollosrock.newspring.cc',
            title: 'Share via ...',
            message:
              'Baby Blessing Celebration - One of the very special things about Christ Fellowship is the way we nurture children and young people.',
          },
          events: [],
        },
        {
          __typename: 'EventContentItem',
          id: 'EventContentItem:d0bcc4959a9cb0ef920db0c543f4ec8c',
          title: 'CFKids Vision Experience',
          summary:
            'Come get a glimpse of the fun we have and how you can help make a difference in the lives of kids and families as a member of our volunteer Dream Team.',
          nextOccurrence: '2020-02-21T19:57:56.146Z',
          coverImage: {
            name: 'Image',
            sources: [
              {
                uri:
                  'https://cloudfront.christfellowship.church/GetImage.ashx?guid=cd68cb98-c5d8-4435-8b08-d368889dee11',
              },
            ],
          },
          sharing: {
            url: 'https://apollosrock.newspring.cc',
            title: 'Share via ...',
            message:
              'CFKids Vision Experience - Come get a glimpse of the fun we have and how you can help make a difference in the lives of kids and families as a member of our volunteer Dream Team.',
          },
          events: [],
        },
        {
          __typename: 'EventContentItem',
          id: 'EventContentItem:de4fa4c054e27fbe5d7f4578c4fe158e',
          title: 'Starting Line',
          summary:
            'Have your children been asking questions about accepting Christ or being baptized?',
          nextOccurrence: '2020-02-21T19:57:56.148Z',
          coverImage: {
            name: 'Image',
            sources: [
              {
                uri:
                  'https://cloudfront.christfellowship.church/GetImage.ashx?guid=2395ff24-e324-40ab-adb5-80d1b327a998',
              },
            ],
          },
          sharing: {
            url: 'https://apollosrock.newspring.cc',
            title: 'Share via ...',
            message:
              'Starting Line - Have your children been asking questions about accepting Christ or being baptized?',
          },
          events: [],
        },
        {
          __typename: 'EventContentItem',
          id: 'EventContentItem:7a24b32c32da017d09844ba5f26791d7',
          title: 'CF Students',
          summary:
            'Experience worship, teaching, and connecting with other students through Life Groups.',
          nextOccurrence: '2020-02-21T19:57:56.149Z',
          coverImage: {
            name: 'Image',
            sources: [
              {
                uri:
                  'https://cloudfront.christfellowship.church/GetImage.ashx?guid=397b0503-fd6d-4f14-957a-c50190d1302c',
              },
            ],
          },
          sharing: {
            url: 'https://apollosrock.newspring.cc',
            title: 'Share via ...',
            message:
              'CF Students - Experience worship, teaching, and connecting with other students through Life Groups.',
          },
          events: [],
        },
        {
          __typename: 'EventContentItem',
          id: 'EventContentItem:769c1f5b75e7a468902d09a53703489a',
          title: 'Student Leadership University 101',
          summary:
            'Student Leadership University 101 provides a year’s worth of leadership development in just 4 days.',
          nextOccurrence: '2020-02-21T19:57:56.150Z',
          coverImage: {
            name: 'Image',
            sources: [
              {
                uri:
                  'https://cloudfront.christfellowship.church/GetImage.ashx?guid=8fc925e7-7698-4344-9cc1-5d182c5af339',
              },
            ],
          },
          sharing: {
            url: 'https://apollosrock.newspring.cc',
            title: 'Share via ...',
            message:
              'Student Leadership University 101 - Student Leadership University 101 provides a year’s worth of leadership development in just 4 days.',
          },
          events: [],
        },
        {
          __typename: 'EventContentItem',
          id: 'EventContentItem:600400fe4729532e3960943e087ed360',
          title: 'CF Young Adults',
          summary: 'Thursdays at 7PMGet connected to our weekly gatherings!',
          nextOccurrence: '2020-02-21T19:57:56.152Z',
          coverImage: {
            name: 'Image',
            sources: [
              {
                uri:
                  'https://cloudfront.christfellowship.church/GetImage.ashx?guid=79baca40-85d4-4f51-9381-67b0aa776622',
              },
            ],
          },
          sharing: {
            url: 'https://apollosrock.newspring.cc',
            title: 'Share via ...',
            message:
              'CF Young Adults - Thursdays at 7PMGet connected to our weekly gatherings!',
          },
          events: [],
        },
        {
          __typename: 'EventContentItem',
          id: 'EventContentItem:dbe524a6a406d40eec1fe220af51f562',
          title: 'WAKE',
          summary: 'A life-changing event for young adults in South Florida.',
          nextOccurrence: '2020-02-21T19:57:56.154Z',
          coverImage: {
            name: 'Image',
            sources: [
              {
                uri:
                  'https://cloudfront.christfellowship.church/GetImage.ashx?guid=4915ea36-1ab5-49f6-bf58-8549e00cd58d',
              },
            ],
          },
          sharing: {
            url: 'https://apollosrock.newspring.cc',
            title: 'Share via ...',
            message: 'WAKE - A life-changing event for young adults in South Florida.',
          },
          events: [],
        },
        {
          __typename: 'EventContentItem',
          id: 'EventContentItem:bc8b548828ceb2e14f4a14da61a4d9ab',
          title: 'Financial Peace University',
          summary: 'Take Control of your Finances',
          nextOccurrence: '2020-02-21T19:57:56.154Z',
          coverImage: {
            name: 'Image',
            sources: [
              {
                uri:
                  'https://cloudfront.christfellowship.church/GetImage.ashx?guid=40ebb3f8-0e07-476a-9cf1-8c6ac61e79b0',
              },
            ],
          },
          sharing: {
            url: 'https://apollosrock.newspring.cc',
            title: 'Share via ...',
            message: 'Financial Peace University - Take Control of your Finances',
          },
          events: [],
        },
        {
          __typename: 'EventContentItem',
          id: 'EventContentItem:e4d4b085fcfecd5c92717b744335ee37',
          title: 'Financial Planning Ministry',
          summary: 'Plan your legacy',
          nextOccurrence: '2020-02-21T19:57:56.154Z',
          coverImage: {
            name: 'Image',
            sources: [
              {
                uri:
                  'https://cloudfront.christfellowship.church/GetImage.ashx?guid=af96bc8b-6c01-433d-bf68-1296735b0071',
              },
            ],
          },
          sharing: {
            url: 'https://apollosrock.newspring.cc',
            title: 'Share via ...',
            message: 'Financial Planning Ministry - Plan your legacy',
          },
          events: [],
        },
        {
          __typename: 'EventContentItem',
          id: 'EventContentItem:70d5b57fb8dbc686a49196afbbce0b61',
          title: 'Smart Money, Smart Kids',
          summary: 'Teaching parents how to help their kids win with money and life',
          nextOccurrence: '2020-02-21T19:57:56.155Z',
          coverImage: {
            name: 'Image',
            sources: [
              {
                uri:
                  'https://cloudfront.christfellowship.church/GetImage.ashx?guid=d1f93875-fc4b-4cc9-9f26-ae0513a5b84c',
              },
            ],
          },
          sharing: {
            url: 'https://apollosrock.newspring.cc',
            title: 'Share via ...',
            message:
              'Smart Money, Smart Kids - Teaching parents how to help their kids win with money and life',
          },
          events: [],
        },
        {
          __typename: 'EventContentItem',
          id: 'EventContentItem:b18c4d205147fb0543bd25cc7cc25ca1',
          title: 'Crew Nights',
          summary:
            'Crew is a movement of guys from all generations committed to growing in their faith and becoming the men God created them to be.',
          nextOccurrence: '2020-02-21T19:57:56.155Z',
          coverImage: {
            name: 'Image',
            sources: [
              {
                uri:
                  'https://cloudfront.christfellowship.church/GetImage.ashx?guid=56b47aa0-2b90-4930-a0fa-bdf5eeeab177',
              },
            ],
          },
          sharing: {
            url: 'https://apollosrock.newspring.cc',
            title: 'Share via ...',
            message:
              'Crew Nights - Crew is a movement of guys from all generations committed to growing in their faith and becoming the men God created them to be.',
          },
          events: [],
        },
        {
          __typename: 'EventContentItem',
          id: 'EventContentItem:ea4aa1c63df29b10bd820fc79f38c823',
          title: 'Prep for Marriage',
          summary: 'A 6-week interactive class',
          nextOccurrence: '2020-02-21T19:57:56.156Z',
          coverImage: {
            name: 'Image',
            sources: [
              {
                uri:
                  'https://cloudfront.christfellowship.church/GetImage.ashx?guid=5c9a70d8-ab8b-429c-bb11-8a432d8c4003',
              },
            ],
          },
          sharing: {
            url: 'https://apollosrock.newspring.cc',
            title: 'Share via ...',
            message: 'Prep for Marriage - A 6-week interactive class',
          },
          events: [],
        },
        {
          __typename: 'EventContentItem',
          id: 'EventContentItem:fcee1cd05eb779eee0442454ceff5947',
          title: 'Ignite',
          summary:
            'Ignite is a marriage event for all Married People and will take place on Saturday, March 21, 2020.',
          nextOccurrence: '2020-02-21T19:57:56.156Z',
          coverImage: {
            name: 'Image',
            sources: [
              {
                uri:
                  'https://cloudfront.christfellowship.church/GetImage.ashx?guid=0fe3db7d-ac33-4820-8466-cdf000f5f4b6',
              },
            ],
          },
          sharing: {
            url: 'https://apollosrock.newspring.cc',
            title: 'Share via ...',
            message:
              'Ignite - Ignite is a marriage event for all Married People and will take place on Saturday, March 21, 2020.',
          },
          events: [],
        },
        {
          __typename: 'EventContentItem',
          id: 'EventContentItem:0da3a1b9ef3b88e8c86b071737e25542',
          title: 'Worship Team Auditions',
          summary: 'Join the team',
          nextOccurrence: '2020-02-21T19:57:56.157Z',
          coverImage: {
            name: 'Image',
            sources: [
              {
                uri:
                  'https://cloudfront.christfellowship.church/GetImage.ashx?guid=fc4f36f2-0fb7-41f2-aa1f-4bd468273d56',
              },
            ],
          },
          sharing: {
            url: 'https://apollosrock.newspring.cc',
            title: 'Share via ...',
            message: 'Worship Team Auditions - Join the team',
          },
          events: [],
        },
        {
          __typename: 'EventContentItem',
          id: 'EventContentItem:d7b142e452e325de7cd5294439d7a85a',
          title: 'One Day Journey',
          summary: 'Your First Step',
          nextOccurrence: '2020-03-07T18:30:00.000Z',
          coverImage: {
            name: 'Image',
            sources: [
              {
                uri:
                  'https://cloudfront.christfellowship.church/GetImage.ashx?guid=59751e6c-428e-4344-bc1d-50a01504a268',
              },
            ],
          },
          sharing: {
            url: 'https://apollosrock.newspring.cc',
            title: 'Share via ...',
            message: 'One Day Journey - Your First Step',
          },
          events: [
            {
              start: '2020-03-07T18:30:00.000Z',
            },
          ],
        },
      ],
      featuredEvents: {
        edges: [
          {
            node: {
              __typename: 'EventContentItem',
              id: 'EventContentItem:569c5cbfe8d109f8d7db5f9dd9fa6ee6',
              title: 'Baptism Weekend',
              summary: 'Take your next step',
              nextOccurrence: '2020-02-22T22:00:00.000Z',
              coverImage: {
                name: 'Image',
                sources: [
                  {
                    uri:
                      'https://cloudfront.christfellowship.church/GetImage.ashx?guid=55fd9771-62ff-41ab-913f-97618b5a749f',
                  },
                ],
              },
              sharing: {
                url: 'https://apollosrock.newspring.cc',
                title: 'Share via ...',
                message: 'Baptism Weekend - Take your next step',
              },
              events: [
                {
                  start: '2020-02-22T22:00:00.000Z',
                },
                {
                  start: '2020-02-23T22:00:00.000Z',
                },
              ],
            },
          },
          {
            node: {
              __typename: 'EventContentItem',
              id: 'EventContentItem:7599c1977d3e517b75adeebc411d51ed',
              title: 'Vision Weekend',
              summary: 'The Movement is Now',
              nextOccurrence: '2020-02-22T23:30:00.000Z',
              coverImage: {
                name: 'Image',
                sources: [
                  {
                    uri:
                      'https://cloudfront.christfellowship.church/GetImage.ashx?guid=cb136dd3-83d9-41ae-912a-53266646edaf',
                  },
                ],
              },
              sharing: {
                url: 'https://apollosrock.newspring.cc',
                title: 'Share via ...',
                message: 'Vision Weekend - The Movement is Now',
              },
              events: [
                {
                  start: '2020-02-22T23:30:00.000Z',
                },
                {
                  start: '2020-02-23T23:30:00.000Z',
                },
                {
                  start: '2020-02-29T23:30:00.000Z',
                },
                {
                  start: '2020-03-01T23:30:00.000Z',
                },
              ],
            },
          },
          {
            node: {
              __typename: 'EventContentItem',
              id: 'EventContentItem:75e68071e125ce1418af9336e54e3373',
              title: 'Easter at CF',
              summary:
                'Come Celebrate EasterAre you looking for a place to celebrate Easter?',
              nextOccurrence: '2020-04-11T21:00:00.000Z',
              coverImage: {
                name: 'Image',
                sources: [
                  {
                    uri:
                      'https://cloudfront.christfellowship.church/GetImage.ashx?guid=af2046eb-7000-48f0-b9c9-f80f64be3a70',
                  },
                ],
              },
              sharing: {
                url: 'https://apollosrock.newspring.cc',
                title: 'Share via ...',
                message:
                  'Easter at CF - Come Celebrate EasterAre you looking for a place to celebrate Easter?',
              },
              events: [
                {
                  start: '2020-04-11T21:00:00.000Z',
                },
                {
                  start: '2020-04-12T22:00:00.000Z',
                },
              ],
            },
          },
          {
            node: {
              __typename: 'EventContentItem',
              id: 'EventContentItem:dc527151fddce2bc05550816976bc44d',
              title: 'Baby Blessing Celebration',
              summary:
                'One of the very special things about Christ Fellowship is the way we nurture children and young people.',
              nextOccurrence: '2020-02-21T19:57:55.908Z',
              coverImage: {
                name: 'Image',
                sources: [
                  {
                    uri:
                      'https://cloudfront.christfellowship.church/GetImage.ashx?guid=af2e35df-e395-4cd3-985c-41be4fa5bb8d',
                  },
                ],
              },
              sharing: {
                url: 'https://apollosrock.newspring.cc',
                title: 'Share via ...',
                message:
                  'Baby Blessing Celebration - One of the very special things about Christ Fellowship is the way we nurture children and young people.',
              },
              events: [],
            },
          },
        ],
      },
    },
  },
};

export const EVENT_LIST_ERROR = {
  request: {
    query: GET_EVENTS,
  },
  error: new Error('There was an error'),
};
