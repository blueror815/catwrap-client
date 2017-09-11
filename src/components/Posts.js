import React, { PropTypes, Component } from 'react'
import { PostsSection, PostItem, PostTitle, PostImage, PostVotes } from './styledComponents'
import LoadingItem from './LoadingItem'

export default class Posts extends Component {
  render() {
    const { posts, loadedPosts, onImageLoad, onImageError } = this.props
    return (
      <PostsSection>
        {loadedPosts.map((post) =>
          <PostItem key={post.uuid}>
            <PostTitle>
              {post.title}
            </PostTitle>
            <PostImage src={post.url} alt={post.title} />
            <PostVotes>
              {post.totalVote} points
              <br />
              <img alt='Vote up' src='/image/arrow-up.png' />
              <img alt='Vote down' src='/image/arrow-down.png' />
            </PostVotes>
          </PostItem>
        )}
        {posts.length > loadedPosts.length &&
          <LoadingItem />
        }
        <div style={{display:'none'}}>
          {posts.map((item, i) =>
            <img src={item.url} alt={i} onError={e => onImageError(item)} onLoad={e => onImageLoad(item)} key={i} />
          )}
        </div>
      </PostsSection>
    )
  }
}

Posts.propTypes = {
  posts: PropTypes.array.isRequired,
  loadedPosts: PropTypes.array.isRequired,
  onImageLoad: PropTypes.func.isRequired,
  onImageError: PropTypes.func.isRequired
}
