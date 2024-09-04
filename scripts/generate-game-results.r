library(tidyverse)
library(jsonlite)

data <-
  read_csv(
    "https://docs.google.com/spreadsheets/d/1YN0b73i4e7tmmlfs1OL0FLYKsuNPN2_cfV8eWxqarTQ/pub?gid=1205121774&single=true&output=csv"
  )

data_tidy <- data %>%
  rename(crossword_margin = "crossword_win_margin") %>%
  pivot_longer(
    cols = ends_with("won_by"),
    names_to = "game",
    names_pattern = "(.*)_won_by",
    values_to = "winner"
  ) %>%
  pivot_longer(
    cols = ends_with("margin"),
    names_to = "game_margin",
    names_pattern = "(.*)_margin",
    values_to = "margin"
  ) %>%
  filter(game == game_margin) %>%
  mutate(game = ifelse(is.na(game), game_margin, game),
         game = str_to_title(game)) %>%
  select(-game_margin) %>%
  mutate(margin = as.numeric(margin)) %>%
  mutate(date = as.Date(date))  %>%
  mutate(
    margin = if_else(game == "Crossword", margin * 100, margin),
    margin = abs(margin)
  )   %>%   filter(!(game == "Connections" & margin > 3))


# save to src/data/game-results.json
write_json(data_tidy, "src/data/game-results.json")