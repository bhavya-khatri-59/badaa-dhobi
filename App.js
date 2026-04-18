import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Pressable, Switch, useColorScheme } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue, set } from "firebase/database";

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_API_KEY,
  databaseURL: process.env.EXPO_PUBLIC_DB_URL,
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export default function App() {

  const [count, setCount] = useState(0);
  const [systemOn, setSystemOn] = useState(false);

  const theme = useColorScheme();
  const dark = theme === "dark";

  useEffect(() => {

    const countRef = ref(db, "count");
    const systemRef = ref(db, "systemOn");

    onValue(countRef, snap => {
      if (snap.val() !== null) setCount(snap.val());
    });

    onValue(systemRef, snap => {
      if (snap.val() !== null) setSystemOn(snap.val());
    });

  }, []);

  const increment = () => set(ref(db, "count"), count + 1);
  const decrement = () => count > 0 && set(ref(db, "count"), count - 1);
  const reset = () => set(ref(db, "count"), 0);
  const toggleSystem = () => set(ref(db, "systemOn"), !systemOn);

  const colors = {
    bg: dark ? "#121212" : "#ffffff",
    text: dark ? "#ffffff" : "#000000",
    button: dark ? "#1f1f1f" : "#f2f2f2"
  };

  return (
    <View style={[styles.container,{backgroundColor:colors.bg}]}>

      <Text style={[styles.title,{color:colors.text}]}>
        Laundry Counter
      </Text>

      <Text style={[styles.count,{color:colors.text}]}>
        {count}
      </Text>

      <View style={styles.row}>

        <Pressable style={[styles.button,{backgroundColor:colors.button}]} onPress={increment}>
          <MaterialCommunityIcons name="plus" size={28} color={colors.text} />
        </Pressable>

        <Pressable style={[styles.button,{backgroundColor:colors.button}]} onPress={decrement}>
          <MaterialCommunityIcons name="minus" size={28} color={colors.text} />
        </Pressable>

        <Pressable style={[styles.button,{backgroundColor:colors.button}]} onPress={reset}>
          <MaterialCommunityIcons name="refresh" size={24} color={colors.text} />
        </Pressable>

      </View>

      <View style={styles.systemRow}>
        <MaterialCommunityIcons name="power" size={26} color={colors.text} />
        <Text style={{color:colors.text, marginHorizontal:10}}>System</Text>
        <Switch value={systemOn} onValueChange={toggleSystem}/>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({

  container:{
    flex:1,
    justifyContent:"center",
    alignItems:"center"
  },

  title:{
    fontSize:28,
    marginBottom:20
  },

  count:{
    fontSize:80,
    marginBottom:40
  },

  row:{
    flexDirection:"row",
    gap:20,
    marginBottom:40
  },

  button:{
    width:70,
    height:70,
    borderRadius:35,
    justifyContent:"center",
    alignItems:"center",
    elevation:3
  },

  systemRow:{
    flexDirection:"row",
    alignItems:"center"
  }

});