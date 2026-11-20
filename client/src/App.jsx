import { useState } from "react";
import "./App.css";

const menuItems = [
  {
    id: "burger",
    name: "Signature Beef Burger",
    category: "Mains",
    description:
      "Beef patty, mature cheddar, caramelised onions, and house sauce on a toasted bun.",
    price: 125,
    label: "House favourite",
    dietary: [],
    available: true,
    artwork: "burger",
    initials: "SB",
  },
  {
    id: "pasta",
    name: "Creamy Mushroom Pasta",
    category: "Mains",
    description:
      "Penne tossed with roasted mushrooms, garlic cream, parmesan, and fresh herbs.",
    price: 110,
    label: "",
    dietary: ["Vegetarian"],
    available: true,
    artwork: "pasta",
    initials: "MP",
  },
  {
    id: "salad",
    name: "Garden Harvest Bowl",
    category: "Sides",
    description:
      "Mixed leaves, roasted sweet potato, avocado, and chickpeas with lemon dressing.",
    price: 85,
    label: "Fresh pick",
    dietary: ["Vegan"],
    available: true,
    artwork: "salad",
    initials: "GH",
  },
  {
    id: "fries",
    name: "Rosemary Fries",
    category: "Sides",
    description:
      "Golden fries finished with rosemary salt and served with garlic aioli.",
    price: 45,
    label: "",
    dietary: ["Vegetarian"],
    available: true,
    artwork: "fries",
    initials: "RF",
  },
  {
    id: "brownie",
    name: "Warm Chocolate Brownie",
    category: "Desserts",
    description:
      "Rich chocolate brownie served with vanilla ice cream and chocolate sauce.",
    price: 65,
    label: "",
    dietary: ["Vegetarian"],
    available: false,
    artwork: "brownie",
    initials: "CB",
  },
  {
    id: "lemonade",
    name: "Homemade Lemonade",
    category: "Drinks",
    description:
      "Fresh lemon, a little sweetness, sparkling water, and a sprig of mint.",
    price: 35,
    label: "",
    dietary: ["Vegan"],
    available: true,
    artwork: "lemonade",
    initials: "HL",
  },
];

const categories = ["All", "Mains", "Sides", "Desserts", "Drinks"];

const currency = new Intl.NumberFormat("en-ZA", {
  style: "currency",
  currency: "ZAR",
  maximumFractionDigits: 0,
});

export default function App() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");

  const query = search.trim().toLowerCase();

  const filteredItems = menuItems.filter((item) => {
    const matchesCategory =
      activeCategory === "All" || item.category === activeCategory;

    const searchableText =
      `${item.name} ${item.description} ${item.category} ${item.dietary.join(" ")}`
        .toLowerCase();

    return matchesCategory && searchableText.includes(query);
  });

  function resetFilters() {
    setSearch("");
    setActiveCategory("All");
  }

  return (
    <>
      <a className="skip-link" href="#menu">
        Skip to menu
      </a>

      <header className="site-header">
        <div className="container header-inner">
          <a className="brand" href="#" aria-label="The Olive Table home">
            <span className="brand-symbol" aria-hidden="true">
              ot.
            </span>

            <span className="brand-copy">
              <strong>The Olive Table</strong>
              <span>Good food. Shared moments.</span>
            </span>
          </a>

          <a className="header-link" href="#menu">
            Explore menu <span aria-hidden="true">↗</span>
          </a>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="container hero-grid">
            <div className="hero-copy">
              <p className="eyebrow">FRESHLY MADE · THOUGHTFULLY SERVED</p>

              <h1>
                Something good
                <br />
                is on the <em>menu.</em>
              </h1>

              <p className="hero-description">
                Comforting favourites, fresh ingredients, and a little
                something for every appetite. Find your next favourite below.
              </p>

              <a className="primary-link" href="#menu">
                Find your favourite <span aria-hidden="true">↓</span>
              </a>

              <div className="hero-details">
                <span>Made to order</span>
                <span>Vegetarian options</span>
                <span>Prices in ZAR</span>
              </div>
            </div>

            <div className="hero-art" aria-hidden="true">
              <span className="art-caption">A LITTLE FRESHNESS, EVERY DAY</span>

              <div className="plate">
                <div className="plate-inner">
                  <span className="ingredient leaf leaf-one" />
                  <span className="ingredient leaf leaf-two" />
                  <span className="ingredient leaf leaf-three" />
                  <span className="ingredient tomato tomato-one" />
                  <span className="ingredient tomato tomato-two" />
                  <span className="ingredient lemon" />
                  <span className="ingredient toast toast-one" />
                  <span className="ingredient toast toast-two" />
                </div>
              </div>

              <div className="art-note">
                Simple ingredients.
                <br />
                Proper good food.
              </div>
            </div>
          </div>
        </section>

        <section className="menu-section container" id="menu">
          <div className="section-heading">
            <div>
              <p className="eyebrow">TAKE YOUR PICK</p>
              <h2>Our menu</h2>
            </div>

            <p>Browse a little. Find something you love.</p>
          </div>

          <div className="menu-toolbar">
            <div className="category-list" role="group" aria-label="Menu category">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  className={
                    activeCategory === category
                      ? "category-button active"
                      : "category-button"
                  }
                  aria-pressed={activeCategory === category}
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>

            <div className="search-field">
              <label className="sr-only" htmlFor="menu-search">
                Search the menu
              </label>

              <span aria-hidden="true">⌕</span>

              <input
                id="menu-search"
                type="search"
                placeholder="Search dishes or ingredients"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
            </div>
          </div>

          <p className="results-count" role="status">
            {filteredItems.length}{" "}
            {filteredItems.length === 1 ? "item" : "items"}
            {activeCategory !== "All" ? ` in ${activeCategory}` : " to explore"}
          </p>

          {filteredItems.length > 0 ? (
            <div className="menu-grid">
              {filteredItems.map((item) => (
                <article
                  key={item.id}
                  className={`menu-card ${!item.available ? "unavailable" : ""}`}
                >
                  <div className={`dish-art ${item.artwork}`}>
                    <span className="dish-category">{item.category}</span>

                    <span className="dish-initials" aria-hidden="true">
                      {item.initials}
                    </span>

                    {!item.available ? (
                      <span className="item-badge sold-out">Sold out today</span>
                    ) : item.label ? (
                      <span className="item-badge">{item.label}</span>
                    ) : null}
                  </div>

                  <div className="card-content">
                    <div className="card-title-row">
                      <h3>{item.name}</h3>
                      <span className="price">
                        {currency.format(item.price)}
                      </span>
                    </div>

                    <p className="dish-description">{item.description}</p>

                    <div className="card-bottom">
                      <div className="dietary-list">
                        {item.dietary.map((tag) => (
                          <span className="dietary-tag" key={tag}>
                            {tag}
                          </span>
                        ))}
                      </div>

                      <span
                        className={
                          item.available
                            ? "availability"
                            : "availability sold"
                        }
                      >
                        <span aria-hidden="true" />
                        {item.available ? "Available" : "Unavailable"}
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <h3>No dishes found</h3>
              <p>Try another search or explore a different category.</p>
              <button
                className="reset-button"
                type="button"
                onClick={resetFilters}
              >
                Show the full menu
              </button>
            </div>
          )}

          <aside className="allergy-note">
            <strong>A little note before you order</strong>
            <p>
              Please speak to a team member about allergies or dietary
              requirements. This website displays the menu only; place your
              order with the restaurant team.
            </p>
          </aside>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-inner">
          <div>
            <strong>The Olive Table</strong>
            <p>A fictional restaurant. A real development project.</p>
          </div>

          <span>
            Powered by <strong>MenuPilot</strong>
          </span>
        </div>
      </footer>
    </>
  );
}