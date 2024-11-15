import React from 'react';
import './header.css';
export default function Header() {
    return <div className="header">
  <a href="/" className="logo">Makers</a>
  <div className="header-right">
    <a className="active" href="/">ChatBot</a>
    <a href="/inventory">Inventarios</a>
  </div>
</div>

}