import {
  Image,
  StyleSheet,
  Platform,
  Text,
  View,
  FlatList,
} from "react-native";
import { useState, useEffect } from "react";
import { TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

export default function HomeScreen() {
  const [products, setProducts] = useState<any[]>([]);
  const router = useRouter();

  const STOREFRONT_TOKEN = "ptkn_25057bc8-f67f-41c7-95a8-39d6f16d54d1";

  const fetchProducts = async () => {
    try {
      const response = await fetch(
        `https://storefront-api.fourthwall.com/v1/collections/camp-collectionnnn/products?storefront_token=${STOREFRONT_TOKEN}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      setProducts(data.results);
    } catch (error) {
      console.log("Error fetching products", error);
    }
  };

  useEffect(() => {
    fetchProducts();
    console.log("products", products);
  }, []);

  if (products.length === 0) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View>
      {products.length === 0 ? (
        <View>
          <Text>Loading...</Text>
        </View>
      ) : (
        <FlatList
          data={products}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                router.push(`/(tabs)/product/${item.slug}`);
              }}
            >
              <View style={styles.item}>
                <Text style={styles.title}>{item.name}</Text>
                <Image
                  style={{ width: 50, height: 50 }}
                  source={{ uri: item.images[0].url }}
                />
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    backgroundColor: "red",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});
