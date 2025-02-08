import { useEffect, useState } from "react";
import { View, Text, ScrollView, Image } from "react-native";
import { useLocalSearchParams } from "expo-router";

export default function ProductDetail() {
  const [product, setProduct] = useState<any>([]);

  const { id } = useLocalSearchParams();

  console.log("id", id);

  const STOREFRONT_TOKEN = "ptkn_25057bc8-f67f-41c7-95a8-39d6f16d54d1";

  const fetchProduct = async () => {
    try {
      const response = await fetch(
        `https://storefront-api.fourthwall.com/v1/products/${id}?storefront_token=${STOREFRONT_TOKEN}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      console.log("data", data);

      setProduct(data);
    } catch (error) {
      console.log("Error with fetchProduct", error);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  if (product.length === 0) {
    return (
      <View>
        <Text
          style={{
            fontSize: 24,
            fontWeight: "bold",
            textAlign: "center",
            marginTop: 100,
            color: "red",
          }}
        >
          Loading...
        </Text>
      </View>
    );
  }

  return (
    <View>
      <ScrollView>
        <Image
          source={{
            uri: product.images[0].url,
          }}
          style={{
            width: "100%",
            aspectRatio: 1,
            borderRadius: 12,
          }}
        />
        <Text
          style={{
            fontSize: 24,
            fontWeight: "bold",
            textAlign: "center",
            marginTop: 12,
            color: "white",
          }}
        >
          {product.name}
        </Text>
      </ScrollView>
    </View>
  );
}
