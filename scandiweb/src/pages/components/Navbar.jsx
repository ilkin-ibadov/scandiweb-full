import React from "react";
import { filterProducts } from "../Products";
import { useProducts } from "../../hooks/useProducts";
import { addActiveCategory } from "../../redux/activeCategorySlice";
import { useDispatch } from "react-redux";
import { addActiveCurrency } from "../../redux/activeCurrencySlice";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const { error, loading, data } = useProducts();
  const dispatch = useDispatch();

  if (!loading) {
    let categories = [];
    let unique = [];
    data.category.products.map((product, index) => {
      categories.push(product.category);
      unique = [...new Set(categories)];
    });
    let symbol;
    let label;

    return (
      <div className="Navbar">
        <div className="container">
        <div className="Categories">
          <a
            href="#"
            onClick={() => {
              dispatch(addActiveCategory("all"));
              navigate("/");
            }}
          >
            all
          </a>
          {unique.map((category) => {
            return (
              <a
                href="#"
                onClick={() => {
                  dispatch(addActiveCategory(category));
                  navigate("/");
                }}
              >
                {category}
              </a>
            );
          })}
        </div>
        <div className="HomeIcon" onClick={() => {
          navigate("/");
        }}>
          
        </div>
        <div className="Controls">
          <div className="currency">
            <select name="currency" id="currency">
              {data.category.products[0].prices.map((price) => {
                 symbol = price.currency.symbol
                return (
                  <option onClick={() => {
                    dispatch(addActiveCurrency(price.currency.symbol))
                  }}>
                    {symbol} {price.currency.label}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="cartIcon" onClick={() => {
                  navigate("/cart");
                }}>
          <i class="fa-solid fa-cart-shopping"></i>
          </div>
        </div>
        </div>
      </div>
    );
  }
}

export default Navbar;
