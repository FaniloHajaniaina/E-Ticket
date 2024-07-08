import * as React from "react";
import { Text, View, StyleSheet, ScrollView, Image } from "react-native";
import { COLORS, FONTFAMILY, FONTSIZE, SPACING } from "../theme/Theme";
import { StatusBar } from "expo-status-bar";

const SearchScreen = () => {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollViewContainer}
    >
      <StatusBar hidden />
      <View>
        <Image
          source={require("../assets/image/logo.png")}
          style={styles.logo}
        />
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>À propos de notre application</Text>
        <Text style={styles.text}>
          Bienvenue dans notre application de gestion de tickets pour spectacles
          ! Cette application a été conçue pour vous offrir une expérience
          fluide et agréable lors de la recherche et de l'achat de billets pour
          vos événements préférés.
        </Text>
        <Text style={styles.text}>
          Grâce à l'intégration de Firebase, nous pouvons vous garantir un accès
          rapide et sécurisé aux informations actualisées sur les spectacles,
          concerts et autres événements. Vous pouvez facilement parcourir les
          différentes catégories, rechercher des spectacles spécifiques et
          obtenir des détails complets sur chaque événement.
        </Text>
        <Text style={styles.text}>
          Notre mission est de rendre la gestion de vos sorties culturelles
          aussi simple et agréable que possible. Nous espérons que vous
          apprécierez l'utilisation de notre application et que vous trouverez
          facilement les spectacles qui vous intéressent.
        </Text>
        <Text style={styles.text}>
          Merci d'utiliser notre application et profitez bien de vos spectacles
          !
        </Text>
      </View>
    </ScrollView>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.Black,
  },
  scrollViewContainer: {
    flexGrow: 1,
    padding: SPACING.space_36,
  },
  logo: {
    width: "100%",
    height: 100,
    marginBottom: 16,
  },
  content: {
    flex: 1,
  },
  title: {
    fontFamily: FONTFAMILY.poppins_bold,
    fontSize: FONTSIZE.size_24,
    color: COLORS.White,
    marginBottom: SPACING.space_20,
  },
  text: {
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_14,
    color: COLORS.White,
    marginBottom: SPACING.space_16,
  },
});
