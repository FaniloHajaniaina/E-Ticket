//////////////////////////////////////HomeScreen/////////////////////////////////////////
import * as React from "react";
import { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  ScrollView,
  StatusBar,
  FlatList,
} from "react-native";
import { COLORS, SPACING } from "../theme/Theme";
import {
  upcomingMovies,
  popularMovies,
  nowPlayingMovies,
  baseImagePath,
} from "../api/apicalls";
import InputHeader from "../components/InputHeader";
import CategoryHeader from "../components/CategoryHeader";
import SubMovieCard from "../components/SubMovieCard";
import MovieCard from "../components/MovieCard";

const { width } = Dimensions.get("window");

const getUpcomingMoviesList = async () => {
  try {
    let response = await fetch(upcomingMovies);
    let json = await response.json();
    //console.log("Upcoming Movies Response:", JSON.stringify(json, null, 2)); // Formatted JSON for better readability
    return json;
  } catch (error) {
    console.error(
      "Il y a un problème dans getUpcomingMoviesList Fonction",
      error
    );
  }
};

const getNowPlayingMoviesList = async () => {
  try {
    let response = await fetch(nowPlayingMovies);
    let json = await response.json();
    //console.log("Now Playing Movies Response:", JSON.stringify(json, null, 2)); // Formatted JSON for better readability
    return json;
  } catch (error) {
    console.error(
      "Il y a un problème dans getNowPlayingMoviesList Fonction",
      error
    );
  }
};

const getPopularMoviesList = async () => {
  try {
    let response = await fetch(popularMovies);
    let json = await response.json();
    // console.log("Popular Movies Response:", JSON.stringify(json, null, 2)); // Formatted JSON for better readability
    return json;
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des films populaires:",
      error
    );
  }
};
const HomeScreen = ({ navigation }: any) => {
  const [nowPlayingMoviesList, setNowPlayingMoviesList] = useState<any[]>([]);
  const [upcomingMoviesList, setUpcomingMoviesList] = useState<any[]>([]);
  const [popularMoviesList, setPopularMoviesList] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      try {
        let tempNowPlaying = await getNowPlayingMoviesList();
        if (
          tempNowPlaying &&
          tempNowPlaying._embedded &&
          tempNowPlaying._embedded.events
        ) {
          setNowPlayingMoviesList([
            { id: "dummy1" },
            ...tempNowPlaying._embedded.events,
            { id: "dummy2" },
          ]);
        } else {
          console.error(
            "Structure de réponse inattendue pour Now Playing Movies"
          );
        }

        let tempUpcoming = await getUpcomingMoviesList();
        if (
          tempUpcoming &&
          tempUpcoming._embedded &&
          tempUpcoming._embedded.events
        ) {
          setUpcomingMoviesList(tempUpcoming._embedded.events);
        } else {
          console.error("Structure de réponse inattendue pour Upcoming Movies");
        }

        let tempPopular = await getPopularMoviesList();
        if (
          tempPopular &&
          tempPopular._embedded &&
          tempPopular._embedded.events
        ) {
          setPopularMoviesList(tempPopular._embedded.events);
        } else {
          console.error("Structure de réponse inattendue pour Popular Movies");
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des films:", error);
      }
    })();
  }, []);

  const searchMoviesFunction = () => {
    navigation.navigate("Search");
  };

  if (
    nowPlayingMoviesList.length === 0 &&
    upcomingMoviesList.length === 0 &&
    popularMoviesList.length === 0
  ) {
    return (
      <ScrollView
        style={styles.container}
        bounces={false}
        contentContainerStyle={styles.scrollViewContainer}
      >
        <StatusBar hidden />
        <View style={styles.InputHeaderContainer}>
          <InputHeader searchFunction={searchMoviesFunction} />
        </View>
        <View style={styles.loadingContainer}>
          <Text style={styles.text}>Impossible de charger les données.</Text>
        </View>
      </ScrollView>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      bounces={false}
      contentContainerStyle={styles.scrollViewContainer}
    >
      <StatusBar hidden />
      <View style={styles.InputHeaderContainer}>
        <InputHeader searchFunction={searchMoviesFunction} />
      </View>
      <CategoryHeader title={"Concert"} />
      <FlatList
        data={nowPlayingMoviesList}
        keyExtractor={(item: any) => item.id}
        bounces={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.containerGap36}
        horizontal
        renderItem={({ item, index }) => {
          if (!item.name) {
            return (
              <View
                style={{
                  width: (width - (width * 0.7 + SPACING.space_36 * 2)) / 2,
                }}
              ></View>
            );
          }

          const imageUrl = item.images[6].url;
          //const id=item.id;
          //console.log(id)
          //console.log("Image URL:", imageUrl);
          return (
            <MovieCard
              shouldMarginatedAtEnd={true}
              cardFunction={() => {
                navigation.push("SpectacleDetails", { movieid: item.id });
              }}
              cardWidth={width * 0.7}
              isFirst={index == 0 ? true : false}
              isLast={index == nowPlayingMoviesList?.length - 1 ? true : false}
              title={item.name}
              imagePath={imageUrl}
              genre={item.classifications.slice(1, 4)}
              vote_average={item.dates.start.localDate}
              vote_count={item.dates.start.localTime}
            />
          );
        }}
      />

      <CategoryHeader title={"Spectacle"} />
      <FlatList
        data={upcomingMoviesList}
        keyExtractor={(item: any) => item.id}
        bounces={false}
        showsVerticalScrollIndicator={false}
        snapToInterval={width * 0.7 + SPACING.space_36}
        contentContainerStyle={styles.containerGap36}
        horizontal
        renderItem={({ item, index }) => (
          <SubMovieCard
            shouldMarginatedAtEnd={true}
            cardFunction={() => {
              navigation.push("SpectacleDetails", { movieid: item.id });
            }}
            cardWidth={width / 3}
            isFirst={index == 0 ? true : false}
            isLast={index == upcomingMoviesList?.length - 1 ? true : false}
            title={item.name}
            imagePath={item.images[8].url}
          />
        )}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.Black,
  },
  scrollViewContainer: {
    flexGrow: 1,
  },
  loadingContainer: {
    flex: 1,
    alignSelf: "center",
    justifyContent: "center",
  },
  InputHeaderContainer: {
    marginHorizontal: SPACING.space_36,
    marginTop: SPACING.space_28,
  },
  contentContainer: {
    // Ajoutez ici le style pour le conteneur de contenu après le chargement
  },
  text: {
    color: COLORS.White,
  },
  containerGap36: {
    gap: SPACING.space_36,
  },
});

export default HomeScreen;
