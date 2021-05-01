import React, { useState } from "react";
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  AsyncStorage,
} from "react-native";
import { SearchBar, ListItem } from "react-native-elements";
import useResults from "../hooks/useResults";

const SearchScreen = ({ navigation }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [apiReq, ErrorMessage, results] = useResults();

  return (
    <View>
      <SearchBar
        value={searchTerm}
        placeholder="Search Place Here"
        onChangeText={(searchTerm) => {
          setSearchTerm(searchTerm);
          apiReq(searchTerm);
        }}
        searchIcon={{ size: 25, color: "black" }}
        placeholderTextColor="#000"
        lightThemed
        containerStyle={{ backgroundColor: "#f0eeee", marginHorizontal: 5 }}
        inputContainerStyle={{ backgroundColor: "#f9f9f9", borderRadius: 10 }}
        inputStyle={{ color: "#000" }}
      />
      {ErrorMessage ? <Text>{ErrorMessage}</Text> : null}
      <FlatList
        data={results}
        keyExtractor={(result) => result.name}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={async () => {
                navigation.navigate("Home", { cityName: item.name });
                await AsyncStorage.setItem("SearchedCity", item.name);
              }}
            >
              <ListItem title={item.name} />
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default SearchScreen;
