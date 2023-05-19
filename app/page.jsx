import Feed from '../components/Feed';

const Home = () => {
  return (
      <section className="w-full flex-center flex-col">
        <h1 className="head_text text-center">
          Discover & share
          <br className="max-md:hidden" />
          <span className="orange_gradient text-center"> AI-Powred  Prompts</span>
        </h1>
        <p className="desc text-center">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat veritatis nobis accusamus velit fuga modi maxime corporis enim rem laborum? Velit soluta eos culpa! Commodi dolores totam architecto pariatur unde.
        </p>

      {/* feed */}
        <Feed />
      </section>
  )
}

export default Home
