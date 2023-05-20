import Feed from '../components/Feed';

const Home = () => {
  return (
      <section className="w-full flex-center flex-col">
        <h1 className="head_text text-center">
          Discover & share
          <br className="max-md:hidden" />
          <span className="orange_gradient text-center"> 
          Simple life motivational quotes
          </span>
        </h1>
        <p className="desc text-center">               
            Promquote will be developed with open source AI driving tools for the modern world to discover, create, and share creative leads
        </p>

      {/* feed */}
        <Feed />
      </section>
  )
}

export default Home
