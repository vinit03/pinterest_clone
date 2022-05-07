import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Masonry from 'react-masonry-css';
import GridItem from '../components/GridItem';
import Loader from '../components/Loader';

const breakpointColumnsObj = {
  default: 10,
  2560: 10,
  2300: 9,
  2050: 8,
  1800: 7,
  1550: 6,
  1300: 5,
  1050: 4,
  800: 3,
  550: 2,
};

const Home = () => {
  const [query, setQuery] = useState('');
  const [data, setData] = useState([]);
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleScroll = () => {
    if (
      window.innerHeight + window.scrollY >=
      document.body.offsetHeight - window.innerHeight
    ) {
      setLoadingData(true);
    }
  };

  useEffect(() => {
    console.log('loadingData', loadingData);
    if (loadingData) {
      console.log('calling Fetch');
      fetchData();
    }
  }, [loadingData]);

  const fetchData = async () => {
    const response = await fetch(
      `https://xoosha.com/ws/1/test.php?offset=${data.length}`,
    );
    const result = await response.json();
    setData([...data, ...result]);
    setLoadingData(false);
  };

  const handleQueryChange = (e) => {
    setQuery(e.target.value);
  };

  return (
    <>
      <div>
        <Head>
          <title>Pinterest Clone</title>
          <meta charSet="utf-8" />
          <meta
            name="viewport"
            id="viewport"
            content="width=device-width, initial-scale=1"
          />
          <meta name="description" content="Created by vinit.maniyar" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className={'p-8'}>
          {!data.length && loadingData ? (
            <Loader />
          ) : (
            <section>
              <div className="container mb-8">
                <label className="block">
                  <input
                    type="text"
                    value={query}
                    onChange={handleQueryChange}
                    name="query"
                    className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                    placeholder="Search Here"
                  />
                </label>
              </div>
              <Masonry
                breakpointCols={breakpointColumnsObj}
                className="my-masonry-grid"
                columnClassName="my-masonry-grid_column"
              >
                {data
                  .filter(({ tags, name }) =>
                    query
                      ? name.toLowerCase().indexOf(query.toLowerCase()) !==
                          -1 ||
                        !!tags
                          .split(',')
                          .filter(
                            (tag) =>
                              tag
                                .trim()
                                .toLowerCase()
                                .indexOf(query.toLowerCase()) !== -1,
                          ).length
                      : true,
                  )
                  .map((item) => (
                    <GridItem key={item.page_id} item={item} />
                  ))}
              </Masonry>
              {loadingData && <Loader />}
            </section>
          )}
        </main>
      </div>
    </>
  );
};

export default Home;
