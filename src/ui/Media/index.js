import Item from './MediaContainer'
import Image from './Image'
import Video from './Video'

const MediaItem = Item
MediaItem.Image = Image
MediaItem.Video = Video

export default MediaItem
