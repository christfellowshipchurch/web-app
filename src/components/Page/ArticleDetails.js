import React from 'react'
import {
  useQuery
} from 'react-apollo'
import { get } from 'lodash'
import { Media, Block } from '@christfellowshipchurch/web-ui-kit'

const DefaultPage = () => {

  const article = {
    title: 'Why do bad things happen to good people?',
    subtitle: 'Bone cancer in children? What’s that about? How dare You? How dare You create a world in which there is such misery?',
    image: 'https://picsum.photos/id/196/800/400',
    authImage: 'https://picsum.photos/id/195/80/80',
    authName: 'Ryan McDermott',
    date: 'March 14',
    timeStamp: '5 min',
    htmlContent:"Lorem ipsum is a pseudo-Latin text used in web design, typography, layout, and printing in place of English to emphasise design elements over content. It's also called placeholder (or filler) text. It's a convenient tool for mock-ups. It helps to outline the visual elements of a document or presentation, eg typography, font, or layout. Lorem ipsum is mostly a part of a Latin text by the classical author and philosopher Cicero. Its words and letters have been changed by addition or removal, so to deliberately render its content nonsensical; it's not genuine, correct, or comprehensible Latin anymore. While lorem ipsum's still resembles classical Latin, it actually has no meaning whatsoever. As Cicero's text doesn't contain the letters K, W, or Z, alien to latin, these, and others are often inserted randomly to mimic the typographic appearence of European languages, as are digraphs not to be found in the original. In a professional context it often happens that private or corporate clients corder a publication to be made and presented with the actual content still not being ready. Think of a news blog thats filled with content hourly on the day of going live. However, reviewers tend to be distracted by comprehensible content, say, a random text copied from a newspaper or the internet. The are likely to focus on the text, disregarding the layout and its elements. Besides, random text risks to be unintendedly humorous or offensive, an unacceptable risk in corporate environments. Lorem ipsum and its many variants have been employed since the early 1960ies, and quite likely since the sixteenth century.Lorem Ipsum: common examples layout based on Lorem Ipsum Most of its text is made up from sections 1.10.32–3 of Cicero's De finibus bonorum et malorum (On the Boundaries of Goods and Evils; finibus may also be translated as purposes). Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit is the first known  It was found by Richard McClintock, a philologist, director of publications at Hampden-Sydney College in Virginia; he searched for citings of consectetur in classical Latin literature, a term of remarkably low frequency in that literary corpus.",
  
  }

  return (
    <Block className='my-6'>
      <div className="max-width-800">
      <Block.Title className='mb-0 text-dark'>
          {article.title}
      </Block.Title>
      <Block.Subtitle className='p-3 mx-5 article-subtitle font-weight-light'>
        {article.subtitle}
      </Block.Subtitle>

       <Media 
        rounded
        ratio="16by9" 
        imageUrl={article.image} 
        className='my-3 max-width-800'    
        />

        <div className='py-4 d-flex align-items-center'>
          <Media
            circle
            ratio="1by1"
            imageUrl={article.authImage}
            className='author-image'
          />
          <div className='text-left d-flex flex-column ml-3'>
            <p className='p-1 mb-0 font-weight-bold text-dark'>
              {article.authName}
            </p>
            <p className='p-1 mb-0 font-weight-light'>
              {`${article.date}  •  ${get(article, 'timeStamp', '2')} min`}
            </p>
          </div>
        </div>

        <Block.Body className="article-body my-3 font-weight-light pb-4 text-left">
          {article.htmlContent}
        </Block.Body>

      </div>
    </Block>
  )
}

DefaultPage.defaultProps = {
}

DefaultPage.propTypes = {
}

export default DefaultPage
