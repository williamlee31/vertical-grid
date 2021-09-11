import React, { Component } from 'react';
import Post from './Post';

class Blog extends Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: [],
      resizeFinished: false
    }
  }

  resizePost = (post) => {
    let grid = document.getElementsByClassName("blog")[0];
    let rowHeight = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-auto-rows'));
    let rowGap = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-row-gap'));
    let rowSpan = Math.ceil((post.querySelector('.content').getBoundingClientRect().height+rowGap)/(rowHeight+rowGap));
    post.style.gridRowEnd = "span " + rowSpan;
  }
  
  resizeAllPosts = () => {
    this.setState({ resizeFinished: false })
    let allPosts = document.getElementsByClassName("post");
    for(let i = 0; i < allPosts.length; i++){
      this.resizePost(allPosts[i]);
    }
    this.setState({ resizeFinished: true });
  }

  componentDidMount() {
    fetch('https://s0nshulo19.execute-api.us-east-1.amazonaws.com/default/code-challenge')
      .then(response => response.json())
      .then(data => {
        this.setState({ posts: data.cards }); 
      })
    window.addEventListener('resize', this.resizeAllPosts);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeAllPosts);
  }

  render() {
    let renderedPosts = this.state.posts.sort((a, b) => new Date(b.date) - new Date(a.date)).map(post => {
      return <Post key={post.title} title={post.title} img={post.image} date={post.date}/> 
    });

    return (
      <div className="container">
        <div className="blog">
          {renderedPosts}
        </div>
      </div>
    )
  }
}

export default Blog;