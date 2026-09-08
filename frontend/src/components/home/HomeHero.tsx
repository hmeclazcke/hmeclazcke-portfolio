import styles from "./HomeHero.module.css";

function HomeHero() {
  return (
    <section className={styles.hero} id="home">
      <p className={styles.greeting}>HELLO, I'M HERNÁN.</p>
      <h1 className={styles.title}>Senior Backend Java Developer</h1>
      <p className={styles.technologyLine}>
        Java · Spring Boot · Microservices · Oracle &amp; PL/SQL · REST APIs
      </p>
      <p className={styles.summary}>
        Computers and programming have been part of my life since I was a kid.
        Today I focus on backend development, while still enjoying exploring
        different technologies and understanding how the pieces of a system fit
        together.
      </p>
      <div className={styles.actions}>
        <a className={styles.actionLink} href="#about">
          Explore My Story
        </a>
        <a className={styles.actionLink} href="#technology-graph">
          Explore Technology Graph
        </a>
      </div>
    </section>
  );
}

export default HomeHero;
