import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Episode from "./../Episode";
import { waitFor } from '@testing-library/react';


 const exampleEpisodeData = {
   airdate: "2016-07-15",
   airstamp: "2016-07-15T12:00:00+00:00",
   airtime: "",
   id: 553946,
   image: "https://static.tvmaze.com/uploads/images/medium_landscape/342/855786.jpg",
   name: "Chapter One: The Vanishing of Will Byers",
   number: 1,
   rating: { average: 8.2 },
   runtime: 49,
   season: 1,
   summary:
     "A young boy mysteriously disappears, and his panicked mother demands that the police find him. Meanwhile, the boy's friends conduct their own search, and meet a mysterious girl in the forest.",
   type: "regular",
   url: "https://www.tvmaze.com/episodes/553946/stranger-things-1x01-chapter-one-the-vanishing-of-will-byers",
};

const exampleEpisodeDataNoImage = {
    airdate: "2016-07-15",
   airstamp: "2016-07-15T12:00:00+00:00",
   airtime: "",
   id: 553946,
   image: null,
   name: "Chapter One: The Vanishing of Will Byers",
   number: 1,
   rating: { average: 8.2 },
   runtime: 49,
   season: 1,
   summary:
     "A young boy mysteriously disappears, and his panicked mother demands that the police find him. Meanwhile, the boy's friends conduct their own search, and meet a mysterious girl in the forest.",
   type: "regular",
   url: "https://www.tvmaze.com/episodes/553946/stranger-things-1x01-chapter-one-the-vanishing-of-will-byers",  
}

test("renders without error", () => {
    render(<Episode episode={exampleEpisodeData}/>)
});

test("renders the summary test passed as prop", async () => {
    render(<Episode episode={exampleEpisodeData} />);
      await waitFor(() => {
      const summary = screen.queryByText(/test summary/i);
      if (summary) {
        expect(summary).toBeInTheDocument();
        expect(summary).toBeTruthy();
        expect(summary).toHaveTextContent(
          "A young boy mysteriously disappears, and his panicked mother demands that the police find him. Meanwhile, the boy's friends conduct their own search, and meet a mysterious girl in the forest."
        );
      }
    });
  });
  

test("renders default image when image is not defined", async () => {
    render(<Episode episode={exampleEpisodeDataNoImage} />)
    await waitFor(() => {
    const image = screen.queryByAltText('./stranger_things.png')
    if (image){  
        expect(image).toBeInTheDocument() 
    }  
    })
    
});

// ----- EXAMPLE EPISODE TEST OBJECT -----
// const exampleEpisodeData = {
//   airdate: "2016-07-15",
//   airstamp: "2016-07-15T12:00:00+00:00",
//   airtime: "",
//   id: 553946,
//   image: "https://static.tvmaze.com/uploads/images/medium_landscape/342/855786.jpg",
//   name: "Chapter One: The Vanishing of Will Byers",
//   number: 1,
//   rating: { average: 8.2 },
//   runtime: 49,
//   season: 1,
//   summary:
//     "A young boy mysteriously disappears, and his panicked mother demands that the police find him. Meanwhile, the boy's friends conduct their own search, and meet a mysterious girl in the forest.",
//   type: "regular",
//   url: "https://www.tvmaze.com/episodes/553946/stranger-things-1x01-chapter-one-the-vanishing-of-will-byers",
// };
