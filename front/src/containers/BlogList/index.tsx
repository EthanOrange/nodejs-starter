import React from 'react';

export default () => {
  return (
    <div className="demo-blog mdl-layout mdl-js-layout has-drawer is-upgraded">
      <main className="mdl-layout__content">
        <div className="demo-blog__posts mdl-grid">
          <div className="mdl-card coffee-pic mdl-cell mdl-cell--8-col">
            <div className="mdl-card__media mdl-color-text--grey-50">
              <h3><a href="entry.html">Coffee Pic</a></h3>
            </div>
            <div className="mdl-card__supporting-text meta mdl-color-text--grey-600">
              <div className="minilogo"></div>
              <div>
                <strong>The Newist</strong>
                <span>2 days ago</span>
              </div>
            </div>
          </div>
          <div className="mdl-card something-else mdl-cell mdl-cell--8-col mdl-cell--4-col-desktop">
            <button className="mdl-button mdl-js-ripple-effect mdl-js-button mdl-button--fab mdl-color--accent">
              <i className="material-icons mdl-color-text--white" role="presentation">add</i>
              <span className="visuallyhidden">add</span>
            </button>
            <div className="mdl-card__media mdl-color--white mdl-color-text--grey-600">
              <img alt="logo" src="images/logo.png" />
              +1,337
            </div>
            <div className="mdl-card__supporting-text meta meta--fill mdl-color-text--grey-600">
              <div>
                <strong>The Newist</strong>
              </div>
              <ul className="mdl-menu mdl-js-menu mdl-menu--bottom-right mdl-js-ripple-effect">
                <li className="mdl-menu__item">About</li>
                <li className="mdl-menu__item">Message</li>
                <li className="mdl-menu__item">Favorite</li>
                <li className="mdl-menu__item">Search</li>
              </ul>
              <button id="menubtn" className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--icon">
                <i className="material-icons" role="presentation">more_vert</i>
                <span className="visuallyhidden">show menu</span>
              </button>
            </div>
          </div>
          <div className="mdl-card on-the-road-again mdl-cell mdl-cell--12-col">
            <div className="mdl-card__media mdl-color-text--grey-50">
              <h3><a href="entry.html">On the road again</a></h3>
            </div>
            <div className="mdl-color-text--grey-600 mdl-card__supporting-text">
              Enim labore aliqua consequat ut quis ad occaecat aliquip incididunt. Sunt nulla eu enim irure enim nostrud aliqua consectetur ad consectetur sunt ullamco officia. Ex officia laborum et consequat duis.
            </div>
            <div className="mdl-card__supporting-text meta mdl-color-text--grey-600">
              <div className="minilogo"></div>
              <div>
                <strong>The Newist</strong>
                <span>2 days ago</span>
              </div>
            </div>
          </div>
          <div className="mdl-card amazing mdl-cell mdl-cell--12-col">
            <div className="mdl-card__title mdl-color-text--grey-50">
              <h3 className="quote"><a href="entry.html">I couldn’t take any pictures but this was an amazing thing…</a></h3>
            </div>
            <div className="mdl-card__supporting-text mdl-color-text--grey-600">
              Enim labore aliqua consequat ut quis ad occaecat aliquip incididunt. Sunt nulla eu enim irure enim nostrud aliqua consectetur ad consectetur sunt ullamco officia. Ex officia laborum et consequat duis.
            </div>
            <div className="mdl-card__supporting-text meta mdl-color-text--grey-600">
              <div className="minilogo"></div>
              <div>
                <strong>The Newist</strong>
                <span>2 days ago</span>
              </div>
            </div>
          </div>
          <div className="mdl-card shopping mdl-cell mdl-cell--12-col">
            <div className="mdl-card__media mdl-color-text--grey-50">
              <h3><a href="entry.html">Shopping</a></h3>
            </div>
            <div className="mdl-card__supporting-text mdl-color-text--grey-600">
              Enim labore aliqua consequat ut quis ad occaecat aliquip incididunt. Sunt nulla eu enim irure enim nostrud aliqua consectetur ad consectetur sunt ullamco officia. Ex officia laborum et consequat duis.
            </div>
            <div className="mdl-card__supporting-text meta mdl-color-text--grey-600">
              <div className="minilogo"></div>
              <div>
                <strong>The Newist</strong>
                <span>2 days ago</span>
              </div>
            </div>
          </div>
          <nav className="demo-nav mdl-cell mdl-cell--12-col">
            <div className="section-spacer"></div>
            <a href="entry.html" className="demo-nav__button" title="show more">
              More
              <button className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--icon">
                <i className="material-icons" role="presentation">arrow_forward</i>
              </button>
            </a>
          </nav>
        </div>
        <footer className="mdl-mini-footer">
          <div className="mdl-mini-footer--left-section">
            <button className="mdl-mini-footer--social-btn social-btn social-btn__twitter">
              <span className="visuallyhidden">Twitter</span>
            </button>
            <button className="mdl-mini-footer--social-btn social-btn social-btn__blogger">
              <span className="visuallyhidden">Facebook</span>
            </button>
            <button className="mdl-mini-footer--social-btn social-btn social-btn__gplus">
              <span className="visuallyhidden">Google Plus</span>
            </button>
          </div>
          <div className="mdl-mini-footer--right-section">
            <button className="mdl-mini-footer--social-btn social-btn__share">
              <i className="material-icons" role="presentation">share</i>
              <span className="visuallyhidden">share</span>
            </button>
          </div>
        </footer>
      </main>
      <div className="mdl-layout__obfuscator"></div>
    </div>
  )
}