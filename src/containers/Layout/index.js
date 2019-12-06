import React from 'react';
import './style.css';

export default function Layout() {
  return (
    <div id="layout">
      <section className="l1">
        <h1>等分布局</h1>
        <div className="outer">
          <div className="inner">1</div>
          <div className="inner">2</div>
          <div className="inner">3</div>
        </div>
      </section>

      <section className="l2">
        <h1>自适应宽</h1>
        <div className="outer">
          <div className="fixed">fixed</div>
          <div className="auto">auto</div>
        </div>
      </section>
    </div>
  );
}
