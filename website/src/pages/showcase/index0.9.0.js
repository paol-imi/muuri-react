import React from 'react';
import Layout from '@theme/Layout'; // eslint-disable-line
import classnames from 'classnames';
import styles from './styles.module.css';

const TITLE = 'Showcase';
const DESCRIPTION = (
  <>
    See the official demos and check out what&nbsp;
    <a href="https://github.com/Paol-imi/muuri-react/issues/15">others</a> are
    creating with <strong>Muuri-react</strong>
  </>
);

function getDescription(type) {
  switch (type) {
    case 'Demo':
      return 'Demo showing Muuri-react features.';
    case 'Example':
      return 'Example showing how to implement a single Muuri-react functionality.';
    case 'Implementation':
      return 'Implementation of a functionality with an external library.';
    default:
      return '';
  }
}

const demos = [
  // Please add in alphabetical order of title.
  {
    type: 'Demo',
    name: 'Grid',
    id: '1czo5',
  },
  {
    type: 'Demo',
    name: 'Kanban',
    id: 'zmypd',
  },
  {
    type: 'Demo',
    name: 'Dashboard',
    id: 'penbe',
  },
  {
    type: 'Demo',
    name: 'Pokedex',
    id: 'swtf9',
  },
  {
    type: 'Example',
    name: 'Drag',
    id: 'xlix7',
  },
  {
    type: 'Example',
    name: 'Scroll',
    id: '91ck8',
  },
  {
    type: 'Example',
    name: 'Sort',
    id: '959o8',
  },
  {
    type: 'Example',
    name: 'Refresh',
    id: 'mz4di',
  },
  {
    type: 'Implementation',
    name: 'Resize',
    id: 'ycldc',
  },
  {
    type: 'Implementation',
    name: 'Media-query',
    id: 'q6sy6',
  },
].map((demo) => ({
  type: demo.type,
  title: `${demo.type} - ${demo.name}`,
  description: getDescription(demo.type),
  preview: `https://screenshots.codesandbox.io/${demo.id.toLowerCase()}.png`,
  website: `https://${demo.id}.csb.app/`,
  source: `https://codesandbox.io/s/muuri-react-${demo.name.toLowerCase()}-${
    demo.id
  }`,
  fbOpenSource: false,
  pinned: false,
}));

function Showcase() {
  return (
    <Layout title={TITLE} description={DESCRIPTION}>
      <div className="container margin-vert--lg">
        <div className="text--center margin-bottom--xl">
          <h1 style={{fontSize: '46px'}}>{TITLE}</h1>
          <p style={{fontSize: '25px'}}>{DESCRIPTION}</p>
        </div>
        <div className="row">
          {demos.map((demo) => (
            <div key={demo.title} className="col col--4 margin-bottom--lg">
              <div className={classnames('card', styles.showcaseCard)}>
                <div className="card__image">
                  <img src={demo.preview} alt={demo.title} />
                </div>
                <div className="card__body">
                  <div className="avatar">
                    <div className="avatar__intro margin-left--none">
                      <h4 className="avatar__name">{demo.title}</h4>
                      <small className="avatar__subtitle">
                        {demo.description}
                      </small>
                    </div>
                  </div>
                </div>
                {(demo.website || demo.source) && (
                  <div className="card__footer">
                    <div className="button-group button-group--block">
                      {demo.website && (
                        <a
                          className="button button--small button--secondary button--block"
                          href={demo.website}
                          target="_blank"
                          rel="noreferrer noopener">
                          Website
                        </a>
                      )}
                      {demo.source && (
                        <a
                          className="button button--small button--secondary button--block"
                          href={demo.source}
                          target="_blank"
                          rel="noreferrer noopener">
                          Source
                        </a>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}

export default Showcase;
