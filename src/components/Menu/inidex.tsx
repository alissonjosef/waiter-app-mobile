import { FlatList, TouchableOpacity } from "react-native";


import { AddToCartButton, Image, ProductContainer, ProductDetails, Separator } from "./styles";
import { Text } from "../Text";
import { formatCurrency } from "../../utils/formatCurrency";
import { PlusCircle } from "../Icons/PlusCircle";
import { ProductModal } from "../ProductModal";
import { useState } from "react";
import { Product } from "../../types/Product";

interface MenuPros {
    onAddToCart: (product: Product) => void;
    products: Product[];
}


export function Menu({ onAddToCart, products }: MenuPros) {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

    function handleOperModal(product: Product) {
        setIsModalVisible(true)
        setSelectedProduct(product)
    }

    return (
        <>

            <ProductModal
                visible={isModalVisible}
                onClose={() => setIsModalVisible(false)}
                product={selectedProduct}
                onAddToCart={onAddToCart}
            />

            <FlatList
                data={products}
                style={{ marginTop: 32 }}
                contentContainerStyle={{ paddingHorizontal: 24 }}
                keyExtractor={product => product._id}
                ItemSeparatorComponent={Separator}
                renderItem={({ item: product }) => (
                    <ProductContainer onPress={() => handleOperModal(product)}>
                        <Image source={{ uri: `http://192.168.0.118:3001/uploads/${product.imagePath}`, }} />

                        <ProductDetails>
                            <Text weight="600">{product.name}</Text>
                            <Text size={14} color="#6669" style={{ marginVertical: 8 }}>{product.description}</Text>
                            <Text size={14} weight="600">{formatCurrency(product.price)}</Text>
                        </ProductDetails>

                        <AddToCartButton onPress={() => onAddToCart(product)} >
                            <PlusCircle />
                        </AddToCartButton>
                    </ProductContainer>
                )}
            />
        </>
    );
}
