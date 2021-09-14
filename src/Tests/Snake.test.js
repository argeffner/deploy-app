import React from "react";
import { render} from "@testing-library/react";
import Snake from "../Snake/Snake";
import "jest-dom/extend-expect";

it("matches snapshot", function () {
  const { asFragment } = render(
          <Snake />
  );
  expect(asFragment()).toMatchSnapshot();
});

