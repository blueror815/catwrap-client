import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { selectCategory, fetchPostsIfNeeded, invalidateCategory, imageLoaded, imageError } from '../actions'
import Posts from '../components/Posts'

class AsyncApp extends Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handleRefreshClick = this.handleRefreshClick.bind(this)
    this.handleImageLoad = this.handleImageLoad.bind(this)
    this.handleImageError = this.handleImageError.bind(this)
    if(props.match.params.categoryid){
      this.handleChange(props.match.params.categoryid)
    } else {
      // No category selected, load default 'all'
      this.handleChange('')
    }
  }

  componentDidMount() {
    const { dispatch, selectedCategory } = this.props
    dispatch(fetchPostsIfNeeded(selectedCategory))
  }

  componentDidUpdate(prevProps) {
    if (this.props.selectedCategory !== prevProps.selectedCategory) {
      const { dispatch, selectedCategory } = this.props
      dispatch(fetchPostsIfNeeded(selectedCategory))
    }
  }

  handleChange(nextCategory) {
    this.props.dispatch(selectCategory(nextCategory))
    this.props.dispatch(fetchPostsIfNeeded(nextCategory))
  }

  handleRefreshClick(e) {
    e.preventDefault()

    const { dispatch, selectedCategory } = this.props
    dispatch(invalidateCategory(selectedCategory))
    dispatch(fetchPostsIfNeeded(selectedCategory))
  }

  handleImageLoad(item) {
    const { dispatch, selectedCategory } = this.props
    dispatch(imageLoaded(selectedCategory, item))
  }

  handleImageError(item) {
    const { dispatch, selectedCategory } = this.props
    dispatch(imageError(selectedCategory, item))
  }

  render() {
    const { posts, loadedPosts, isFetching, /*lastUpdated,*/ error, user } = this.props
    console.log("User Data", user.details);
    return (
      <div>
        <p>
        </p>
        {isFetching && posts.length === 0 &&
          <h2>Loading...</h2>
        }
        {!error && !isFetching && posts.length === 0 &&
          <h2>Empty.</h2>
        }
        {error && posts.length === 0 &&
          <h2>Error.</h2>
        }
        {posts.length > 0 &&
          <Posts style={{ opacity: isFetching ? 0.5 : 1 }}
            posts={posts}
            loadedPosts={loadedPosts}
            onImageLoad={this.handleImageLoad}
            onImageError={this.handleImageError} />
        }
      </div>
    )
  }
}

AsyncApp.propTypes = {
  selectedCategory: PropTypes.string.isRequired,
  posts: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  lastUpdated: PropTypes.number,
  dispatch: PropTypes.func.isRequired,
  error: PropTypes.bool
}

function mapStateToProps(state) {
  const { selectedCategory, postsByCategory, user } = state
  const {
    isFetching,
    lastUpdated,
    error,
    items: posts,
    loadedItems: loadedPosts
  } = postsByCategory[selectedCategory] || {
    isFetching: true,
    items: [],
    loadedItems: []
  }

  return {
    user,
    selectedCategory,
    posts,
    loadedPosts,
    isFetching,
    error,
    lastUpdated
  }
}

export default connect(mapStateToProps)(AsyncApp)
