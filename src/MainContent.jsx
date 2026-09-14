function Main() {
  const specials = [
    { name: 'Greek salad', price: '$12.99', description: 'The famous Greek salad of crispy lettuce, peppers, olives and our Chicago-style feta cheese.' },
    { name: 'Bruschetta', price: '$5.99', description: 'Our bruschetta is made from grilled bread rubbed with garlic and topped with fresh tomatoes.' },
    { name: 'Lemon dessert', price: '$5.00', description: 'This dessert comes straight from grandma’s recipe book and has an authentic lemon flavor.' },
  ]
  const testimonials = ['Maria', 'James', 'Aisha', 'Daniel']

  return (
    <main>
      <section className="hero-section">
        <div className="page-width hero-section__layout">
          <div className="hero-section__copy">
            <h1>Little Lemon</h1>
            <p className="location">Chicago</p>
            <p>We are a family-owned Mediterranean restaurant, focused on traditional recipes served with a modern twist.</p>
            <a className="button" href="/reservations">Reserve a Table</a>
          </div>
          <div className="image-placeholder image-placeholder--hero" role="img" aria-label="Restaurant food presentation placeholder" />
        </div>
      </section>

      <section className="specials page-width" aria-labelledby="specials-title">
        <div className="section-heading">
          <h2 id="specials-title">Specials</h2>
          <a className="button" href="/menu">Online Menu</a>
        </div>
        <div className="card-grid">
          {specials.map((special) => (
            <article className="special-card" key={special.name}>
              <div className="image-placeholder special-card__image" role="img" aria-label={`${special.name} placeholder`} />
              <div className="special-card__content">
                <div className="special-card__heading"><h3>{special.name}</h3><span>{special.price}</span></div>
                <p>{special.description}</p>
                <a href="/order-online">Order a delivery <span aria-hidden="true">🛵</span></a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="testimonials" aria-labelledby="testimonials-title">
        <div className="page-width">
          <h2 id="testimonials-title">Testimonials</h2>
          <div className="testimonial-grid">
            {testimonials.map((name) => (
              <article className="testimonial-card" key={name}>
                <p aria-label="5 out of 5 stars">★★★★★</p>
                <div className="testimonial-card__person"><div className="avatar-placeholder" aria-hidden="true" /><strong>{name}</strong></div>
                <p>“Amazing food and warm service!”</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="about-section page-width" aria-labelledby="about-title">
        <div className="about-section__copy">
          <h2 id="about-title">Little Lemon</h2>
          <p className="location">Chicago</p>
          <p>Little Lemon is a charming neighborhood bistro that serves simple food and classic cocktails in a lively but casual environment. The restaurant features a locally sourced menu with Mediterranean influences.</p>
        </div>
        <div className="about-section__images" aria-label="Little Lemon restaurant photos">
          <div className="image-placeholder about-image about-image--back" />
          <div className="image-placeholder about-image about-image--front" />
        </div>
      </section>
    </main>
  )
}

export default Main
