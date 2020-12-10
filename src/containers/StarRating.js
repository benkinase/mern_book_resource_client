import React from "react";
import styled from "styled-components/macro";
import { FaStar } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { rateBook } from "../redux/actions/bookActions";

export default function StarRating(props) {
  const [rating, setRating] = React.useState(0);
  const [hover, setHover] = React.useState(null);

  const dispatch = useDispatch();
  rating && dispatch(rateBook(props.id, { rating }));

  React.useEffect(() => {
    rating && window.location.reload(false);
  }, [rating]);

  return (
    <Star>
      {[...Array(5)].map((_, i) => {
        const rValue = i + 1;
        return (
          <label key={i}>
            <input
              type="radio"
              name="rating"
              value={rValue}
              onChange={(e) => {
                setRating(e.target.value);
              }}
            />
            <FaStar
              size={20}
              className="star"
              color={rValue <= (hover || props.value) ? "#f20a72" : "white"}
              onMouseEnter={() => setHover(rValue)}
              onMouseLeave={() => setHover(null)}
            />
          </label>
        );
      })}
    </Star>
  );
}

const Star = styled.span`
  input[type="radio"] {
    display: none;
  }
  .star {
    cursor: pointer;
    transision: color 200ms;
    ${"" /* color: "#19f50a"; */}
  }
`;
