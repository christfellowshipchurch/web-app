# Media

![alt christ-fellowship-flat-ui](/docs/static/Media.png)

## About
The media object renders either a video or an image within the boundaries of an aspect ratio. The content is centered horizontally and vertically when cropped into the ratio. The component uses the package `react-image` in order to take advantage of the loading state so that there will be a loading graphic displayed while the image is loading. Currently, there is not support for overriding the loading graphic and it uses the [RingLoader](/docs/src/Loaders) from this package.

## Usage
When passing in both a video and an image, the video will be stacked on top of the image, although both will render.

The component accepts the following parameters
* ratio
* imageUrl
* imageAlt
* videoUrl

The following aspect ratios are currently supports
* 1by1
* 4by3
* 16by9
* 21by9

There are two different use cases for this component. It can be used without any children to just render media, or can have children passed in to render content overtop the media object.
```jsx
// Renders Video
<Media ratio="4by3" imageUrl="https://img.url" imageAlt="Image Alt" videoUrl="https://video.url" />

// Renders Img Only
<Media ratio="4by3" imageUrl="https://img.url" imageAlt="Image Alt" />

// Renders Content Overtop Media
<Media ratio="4by3" imageUrl="https://img.url" imageAlt="Image Alt" videoUrl="https://video.url">
    <h1>This is a title</h1>
    <ReactComponent>
        Here is a React Component that can be rendered on top of the media object
    </ReactComponent>
</Media>
```

## Testing
Flat UI Web using jest snapshots for testing.

Running `yarn test` runs a test and outputs the result. When run at the _root_, it will run tests for the entire project. Running at a specific directory will run tests for that directory.

Running `yarn test -u` will update snapshots. **Only do this if you are positive that snapshots need to be updated**.

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate. Commits without tests are not likely to be taken into consideration.

## Authors and acknowledgment
[Caleb Panza](https://github.com/calebpanza)

## License
[MIT](https://choosealicense.com/licenses/mit/)