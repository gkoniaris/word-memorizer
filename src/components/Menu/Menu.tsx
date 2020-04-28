//@ts-ignore
import React from 'react'
import './Menu.css'

function Menu(props: any) {
  return (
    <div className="menu">
        <a className="site-title" href="#">Word Memorizer</a>
        <a className="blog-title" href="https://gkoniaris.gr">My personal blog</a>
    </div>
  );
}

export default Menu;
