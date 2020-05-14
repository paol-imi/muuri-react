import React from 'react';
import classnames from 'classnames';
import Layout from '@theme/Layout'; // eslint-disable-line
import Link from '@docusaurus/Link'; // eslint-disable-line
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'; // eslint-disable-line
import useBaseUrl from '@docusaurus/useBaseUrl'; // eslint-disable-line
import styles from './styles.module.css';

const features = [
  {
    title: <>Easy to Use</>,
    imageUrl: 'gifs/kanban.gif',
    description: (
      <>
        Muuri-react has been <code>designed</code> to work out of the box with
        most of its features, while still guaranteeing a vast possibility of
        configurations.
      </>
    ),
  },
  {
    title: <>Fully customizable</>,
    imageUrl: 'gifs/grid.gif',
    description: (
      <>
        At it&apos;s very core Muuri is a layout engine which is limited only by
        your <code>imagination</code>. You can build any kind of layout,
        asynchronously in web workers if you wish.
      </>
    ),
  },
  {
    title: <>Focus on What Matters</>,
    imageUrl: 'gifs/dashboard.gif',
    description: (
      <>
        The long-term goal of Muuri is to provide a <code>simple</code> API for
        building amazing layouts with unmatched <code>performance</code> and
        most of the complexity abstracted away.
      </>
    ),
  },
];

function Feature({imageUrl, title, description}) {
  const imgUrl = useBaseUrl(imageUrl);
  return (
    <div className={classnames('col col--4', styles.feature)}>
      {imgUrl && (
        <div className="text--center">
          <img className={styles.featureImage} src={imgUrl} alt={title} />
        </div>
      )}
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

function Home() {
  const context = useDocusaurusContext();
  const {siteConfig = {}} = context;
  return (
    <Layout title="Home" description="The layout engine for React <head />">
      <header className={classnames('hero', styles.heroBanner)}>
        <div className="container">
          <div className="row">
            <div className={classnames('col col--5 col--offset-1')}>
              <h1 className="hero__title">{siteConfig.title}</h1>
              <p className="hero__subtitle">{siteConfig.tagline}</p>
              <div className={styles.buttons}>
                <Link
                  className={classnames(
                    'button button--outline button--secondary button--lg',
                    styles.getStarted
                  )}
                  to={useBaseUrl('docs/main-concepts/components')}>
                  Get Started
                </Link>
              </div>
            </div>
            <div className={classnames('col col--5')}>
              <img
                alt="logo"
                className={styles.heroImg}
                src={useBaseUrl('logo/logo.png')}
              />
            </div>
          </div>
        </div>
      </header>
      <main>
        {features && features.length && (
          <section className={styles.features}>
            <div className="container">
              <div className="row">
                {features.map((props, idx) => (
                  // eslint-disable-next-line
                  <Feature key={idx} {...props} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </Layout>
  );
}

export default Home;
