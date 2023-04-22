import { useState } from "react";
import { Button } from "../components/Button";
import { Categories } from "../components/Categories/inidex";
import { Header } from "../components/Header";
import { Menu } from "../components/Menu/inidex";
import { TableModal } from "../components/TableModal";
import { Container, CategoriesContainer, MenuContainer, Footer, FooterContainer, CenturedContainer,EmptyContainer } from "./styles";
import { Cart } from "../components/Cart";
import { CartItem } from "../types/CartItem";
import { Product } from "../types/Product";
import { ActivityIndicator } from "react-native";

import { products as mockProducts } from "../mocks/products";
import { Empty } from "../components/Icons/Empty";
import { Text } from "../components/Text";

export function Main() {

    const [isTableModalVisible, setIsTableModalVisible] = useState(false)
    const [selectedTable, setSelectedTable] = useState('')
    const [isLoanding, setIsLoanding] = useState(false)
    const [products, setProducts] = useState<Product[]>(mockProducts)
    const [cartItem, setCartItem] = useState<CartItem[]>([

    ])

    function handleSabeTalbe(table: string) {
        setSelectedTable(table)
        setIsTableModalVisible(false)
    }

    function handleCancelOrder() {
        setSelectedTable('')
        setCartItem([])
    }

    function handleAddToCart(product: Product) {
        if (!selectedTable) {
            setIsTableModalVisible(true)
        }

        setCartItem((prevState) => {
            const itemIdex = prevState.findIndex(cartItem => cartItem.product._id === product._id);
            if (itemIdex < 0) {
                return prevState.concat({
                    quantity: 1,
                    product,
                })
            }

            const newCartItems = [...prevState];
            const item = newCartItems[itemIdex]

            newCartItems[itemIdex] = {
                ...item,
                quantity: item.quantity + 1
            }

            return newCartItems;
        })
    }

    function handlDecremetCarItem(product: Product) {
        setCartItem((prevState) => {
            const itemIdex = prevState.findIndex(cartItem => cartItem.product._id === product._id);
            const item = prevState[itemIdex];

            const newCartItems = [...prevState];
            if (item.quantity === 1) {
                newCartItems.splice(itemIdex, 1);

                return newCartItems;
            }

            newCartItems[itemIdex] = {
                ...item,
                quantity: item.quantity - 1
            }

            return newCartItems;
        })
    }

    function handlConfirmOrder() {
        setSelectedTable('')
        setCartItem([])
    }

    return (
        <>
            <Container>
                <Header
                    selectedTable={selectedTable}
                    onCancelOrder={handleCancelOrder}
                />

                {isLoanding && (
                    <CenturedContainer>
                        <ActivityIndicator color="#D73035" size='large' />
                    </CenturedContainer>
                )}

                {!isLoanding && (
                    <>
                        <CategoriesContainer>
                            <Categories></Categories>
                        </CategoriesContainer>

                        {products.length > 0 ? (
                            <MenuContainer>
                                <Menu products={products} onAddToCart={handleAddToCart} />
                            </MenuContainer>
                        ) : <EmptyContainer>
                            <>
                                <Empty />
                                <Text style={{marginTop: 24}} color="#666">Nenhum produto foi  encontrado!</Text>
                            </>
                        </EmptyContainer>}
                    </>
                )}


            </Container>
            <Footer>
                {!selectedTable && (

                    <FooterContainer>
                        <Button disabled={isLoanding} onPress={() => setIsTableModalVisible(true)} label="Novo Pedido" />
                    </FooterContainer>
                )}
                {selectedTable && (
                    <Cart
                        onAdd={handleAddToCart}
                        onDecremetCart={handlDecremetCarItem}
                        cartItem={cartItem}
                        onConfirmOrder={handlConfirmOrder}
                    />
                )}
            </Footer>


            <TableModal
                visable={isTableModalVisible}
                onClose={() => setIsTableModalVisible(false)}
                onSave={handleSabeTalbe}
            />
        </>
    );
}
