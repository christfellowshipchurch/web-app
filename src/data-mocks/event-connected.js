import { GET_EVENT } from '../router/Events/queries';

export const TEST_EVENT_JSON = {
  id: 'EventContentItem:7599c1977d3e517b75adeebc411d51ed',
  title: 'Vision Weekend',
  summary: 'The Movement is Now',
  htmlContent:
    "<p>It's a movement of miracles</p><p>It's a movement of freedom</p><p>It's a movement of restoration</p><p>It's a movement of Impact</p><p>It's a movement of life change</p><p>It's a movement of new beginnings</p><p>It's a movement of hope</p><p>It's a movement of God</p><p><br /></p>",
  coverImage: {
    name: 'Image',
    sources: [
      {
        uri:
          'https://cloudfront.christfellowship.church/GetImage.ashx?guid=cb136dd3-83d9-41ae-912a-53266646edaf',
      },
    ],
  },
  tags: ['Vision'],
  callsToAction: [],
  openLinksInNewTab: false,
  events: [
    {
      start: '2020-02-22T23:30:00.000Z',
      end: '2020-02-22T23:30:01.000Z',
      campuses: [
        {
          name: 'Palm Beach Gardens',
        },
        {
          name: 'Downtown West Palm Beach',
        },
        {
          name: 'Stuart',
        },
        {
          name: 'Boynton Beach',
        },
        {
          name: 'Church Online',
        },
        {
          name: 'Belle Glade',
        },
        {
          name: 'Okeechobee',
        },
        {
          name: 'Port St Lucie',
        },
        {
          name: 'Jupiter',
        },
      ],
      location: '',
    },
    {
      start: '2020-02-23T23:30:00.000Z',
      end: '2020-02-23T23:30:01.000Z',
      campuses: [
        {
          name: 'Palm Beach Gardens',
        },
        {
          name: 'Downtown West Palm Beach',
        },
        {
          name: 'Stuart',
        },
        {
          name: 'Boynton Beach',
        },
        {
          name: 'Church Online',
        },
        {
          name: 'Belle Glade',
        },
        {
          name: 'Okeechobee',
        },
        {
          name: 'Port St Lucie',
        },
        {
          name: 'Jupiter',
        },
      ],
      location: '',
    },
    {
      start: '2020-02-29T23:30:00.000Z',
      end: '2020-02-29T23:30:01.000Z',
      campuses: [
        {
          name: 'Palm Beach Gardens',
        },
        {
          name: 'Downtown West Palm Beach',
        },
        {
          name: 'Stuart',
        },
        {
          name: 'Boynton Beach',
        },
        {
          name: 'Church Online',
        },
        {
          name: 'Belle Glade',
        },
        {
          name: 'Okeechobee',
        },
        {
          name: 'Port St Lucie',
        },
        {
          name: 'Jupiter',
        },
      ],
      location: '',
    },
    {
      start: '2020-03-01T23:30:00.000Z',
      end: '2020-03-01T23:30:01.000Z',
      campuses: [
        {
          name: 'Palm Beach Gardens',
        },
        {
          name: 'Downtown West Palm Beach',
        },
        {
          name: 'Stuart',
        },
        {
          name: 'Boynton Beach',
        },
        {
          name: 'Church Online',
        },
        {
          name: 'Belle Glade',
        },
        {
          name: 'Okeechobee',
        },
        {
          name: 'Port St Lucie',
        },
        {
          name: 'Jupiter',
        },
      ],
      location: '',
    },
  ],
};

export const EMPTY_SCHEDULE_EVENT = {
  id: 'EventContentItem:7599c1977d3e517b75adeebc411d51ed',
  title: 'Vision Weekend',
  summary: 'The Movement is Now',
  htmlContent:
    "<p>It's a movement of miracles</p><p>It's a movement of freedom</p><p>It's a movement of restoration</p><p>It's a movement of Impact</p><p>It's a movement of life change</p><p>It's a movement of new beginnings</p><p>It's a movement of hope</p><p>It's a movement of God</p><p><br /></p>",
  coverImage: {
    name: 'Image',
    sources: [
      {
        uri:
          'https://cloudfront.christfellowship.church/GetImage.ashx?guid=cb136dd3-83d9-41ae-912a-53266646edaf',
      },
    ],
  },
  tags: ['Vision'],
  callsToAction: [
    {
      call: 'Register Here',
      action: '/#',
    },
  ],
  openLinksInNewTab: false,
  events: [],
};

export const EVENT_MOCK = {
  request: {
    query: GET_EVENT,
    variables: {
      title: 'vision-weekend',
    },
  },
  result: {
    data: {
      getEventContentByTitle: TEST_EVENT_JSON,
    },
  },
};

export const CURRENT_USER_CAMPUS = {
  request: {
    query: GET_EVENT,
    variables: {
      title: 'vision-weekend',
    },
  },
  result: {
    data: {
      currentUser: {
        profile: {
          campus: {
            name: 'Palm Beach Gardens',
          },
        },
      },
    },
  },
};

export const EVENT_ERROR = {
  request: {
    query: GET_EVENT,
    variables: {
      title: 'vision-weekend',
    },
  },
  error: new Error('There was an error'),
};
