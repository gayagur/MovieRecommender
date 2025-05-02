# https://gayagur.github.io/MovieRecommender/

# Movie Recommendation System

This project is a **Content-Based Movie Recommendation System** that suggests movies based on genre similarity.  
It allows users to **search movies with partial titles**, corrects typos, and returns formatted recommendations using `rich`.

---

## Features
- **Search without specifying the year** (e.g., "Avatar" will match "Avatar (2009)").
- **Partial match search** (e.g., "Toy Stroy" will be corrected to "Toy Story").
- **Interactive user interface with colors and tables** (powered by `rich`).
- **Content-Based Filtering** – recommends movies based on genre similarity.
- **Displays recommendations in a structured table**.

---
## example:
Enter your favorite movie (you can enter part of the title): Avatar
How many recommendations would you like? 5

Best match found: Avatar (2009)

Here are your movie recommendations:

**No. ---  Movie Title**

1     Avatar: The Way of Water (2022)
2     Guardians of the Galaxy (2014)
3     Star Wars: The Force Awakens (2015)
4     Interstellar (2014)
5     The Martian (2015)
---

## Installation

Make sure you have **Python 3.7+** installed.  
Install the required dependencies:
```bash
pip install pandas numpy scikit-learn rich




