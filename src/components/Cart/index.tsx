import { FlatList, TouchableOpacity } from "react-native";
import { CartItem } from "../../types/CartItem";
import { Item, ProductContainer, Action, Image, QuantityContainer, ProductDetails, Summary, TotalContainer } from "./styles";
import { Text } from "../Text";
import { formatCurrency } from "../../utils/formatCurrency";
import { PlusCircle } from "../Icons/PlusCircle";
import { MinusCircle } from "../Icons/MinusCircle";
import { Button } from "../Button";
import { Product } from "../../types/Product";

interface CartProps {
    cartItem: CartItem[];
    onAdd: (product: Product) => void;
    onDecremetCart: (product: Product) => void;
}

export function Cart({ cartItem, onAdd,onDecremetCart }: CartProps) {

    const total = cartItem.reduce((acc, cartItem) => {
        return acc + cartItem.quantity * cartItem.product.price
    }, 0)
    return (
        <>
            {cartItem.length > 0 && (
                <FlatList
                    style={{ marginBottom: 20, maxHeight: 150 }}
                    data={cartItem}
                    keyExtractor={cartItem => cartItem.product._id}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item: cartItem }) => (
                        <Item>
                            <ProductContainer>
                                <Image
                                    source={{
                                        uri: `http://192.168.0.118:3001/uploads/${cartItem.product.imagePath}`,
                                    }}
                                />
                                <QuantityContainer>
                                    <Text size={14} color="#666">{cartItem.quantity}x</Text>
                                </QuantityContainer>

                                <ProductDetails>
                                    <Text size={14} weight="600">{cartItem.product.name}</Text>
                                    <Text size={14} color="#666" style={{ marginTop: 4 }}>{formatCurrency(cartItem.product.price)}</Text>
                                </ProductDetails>
                            </ProductContainer>
                            <Action>
                                <TouchableOpacity style={{ marginRight: 24 }} onPress={(() => onAdd(cartItem.product))}>
                                    <PlusCircle />
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => onDecremetCart(cartItem.product)}>
                                    <MinusCircle />
                                </TouchableOpacity>
                            </Action>
                        </Item>
                    )}
                />
            )}

            <Summary>

                <TotalContainer>
                    {cartItem.length > 0 ? (
                        <>
                            <Text color="#666">Preço</Text>
                            <Text size={20} weight="600">{formatCurrency(total)}</Text>
                        </>
                    ) :

                        <>
                            <Text color="#999">Seu carrinho esta vazio</Text>
                        </>}
                </TotalContainer>

                <Button onPress={() => alert('Confirmar pedido')} label='Confirmar pedido' disabled={cartItem.length === 0} />

            </Summary>
        </>
    );
}
